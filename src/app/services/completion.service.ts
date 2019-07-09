import { Injectable } from '@angular/core';
import { MessageListener, MessageListenersManager } from 'zeppelin-core';
import { CompletionItem, OP, CompletionReceived } from 'zeppelin-sdk';
import { MessageService } from './message.service';
import { Subject } from 'rxjs';
import { filter, take, map, tap } from 'rxjs/operators';

export interface CompletionEvent {
  pid?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompletionService extends MessageListenersManager {
  private completionLanguages = ['python', 'scala'];
  private completionItem$ = new Subject<CompletionReceived>();
  private receivers = new WeakMap<monaco.editor.ITextModel, string>();
  private bound = false;

  constructor(messageService: MessageService) {
    super(messageService);
  }

  @MessageListener(OP.COMPLETION_LIST)
  onCompletion(data?: CompletionReceived): void {
    console.log('on receive!', data.id);
    this.completionItem$.next(data);
  }

  registerAsCompletionReceiver(model: monaco.editor.ITextModel, pid: string): void {
    if (this.receivers.has(model)) {
      return;
    }

    if (!this.bound) {
      this.bindMonacoCompletion();
      this.bound = true;
    }

    this.receivers.set(model, pid);
  }

  unregister(model: monaco.editor.ITextModel): void {
    this.receivers.delete(model);
  }

  private bindMonacoCompletion(): void {
    const that = this;

    this.completionLanguages.forEach(l => {
      monaco.languages.registerCompletionItemProvider(l, {
        provideCompletionItems(model: monaco.editor.ITextModel, position: monaco.Position) {
          const pid = that.getIdForModel(model);

          if (!pid) {
            return { suggestions: null };
          }

          that.messageService.completion(pid, model.getValue(), model.getOffsetAt(position));

          return that.completionItem$
            .pipe(
              filter(d => d.id === pid),
              take(1),
              map(d => {
                return {
                  suggestions: d.completions.map(i => ({
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    label: i.name,
                    insertText: i.name,
                    range: undefined
                  }))
                };
              }),
              tap(d => console.log(d))
            )
            .toPromise();
        }
      });
    });
  }

  private getIdForModel(model?: monaco.editor.ITextModel): string | null {
    return this.receivers.get(model);
  }
}

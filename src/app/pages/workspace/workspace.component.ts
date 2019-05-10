import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { MessageService } from 'zeppelin-services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'zeppelin-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkspaceComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject();
  websocketConnected = false;

  constructor(public messageService: MessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.messageService.connectedStatus$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.websocketConnected = data;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import {
  Component,
  OnChanges,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Renderer2,
  SimpleChanges
} from '@angular/core';

@Component({
  selector: 'zeppelin-elastic-input',
  templateUrl: './elastic-input.component.html',
  styleUrls: ['./elastic-input.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElasticInputComponent implements OnChanges {
  @Input() value: string;
  @Output() valueUpdate = new EventEmitter<string>();
  @ViewChild('inputElement', { read: ElementRef }) inputElement: ElementRef;
  @ViewChild('pElement', { read: ElementRef }) pElement: ElementRef;
  @ViewChild('elasticElement', { read: ElementRef }) elasticElement: ElementRef;
  showEditor = false;
  editValue: string;

  updateValue(value: string) {
    const trimmedNewName = value.trim();
    if (trimmedNewName.length > 0 && this.value !== trimmedNewName) {
      this.editValue = trimmedNewName;
    }
  }

  setEditorState(showEditor: boolean) {
    this.showEditor = showEditor;
    if (!this.showEditor) {
      this.valueUpdate.emit(this.editValue);
    } else {
      const width = this.pElement.nativeElement.getBoundingClientRect().width;
      this.renderer.setStyle(this.elasticElement.nativeElement, 'width', `${width}px`);
      setTimeout(() => {
        this.inputElement.nativeElement.focus();
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${width}px`);
      });
    }
  }

  updateInputWidth() {
    const width = this.inputElement.nativeElement.scrollWidth;
    if (width > this.inputElement.nativeElement.getBoundingClientRect().width) {
      this.renderer.removeStyle(this.elasticElement.nativeElement, 'width');
      this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${width}px`);
    }
  }

  constructor(private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value) {
      this.showEditor = false;
      this.editValue = this.value;
      this.renderer.removeStyle(this.elasticElement.nativeElement, 'width');
    }
  }
}

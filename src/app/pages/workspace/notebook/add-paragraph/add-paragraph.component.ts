import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'zeppelin-notebook-add-paragraph',
  templateUrl: './add-paragraph.component.html',
  styleUrls: ['./add-paragraph.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookAddParagraphComponent implements OnInit {
  @Output() addParagraph = new EventEmitter();
  @Input() disabled = false;

  clickAdd() {
    if (!this.disabled) {
      this.addParagraph.emit();
    }
  }

  constructor() {}

  ngOnInit() {}
}

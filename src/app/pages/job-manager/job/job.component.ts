import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter
} from '@angular/core';
import { JobsItem, JobStatus } from 'zeppelin-sdk';
import * as distanceInWords from 'date-fns/distance_in_words';
@Component({
  selector: 'zeppelin-job-manager-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobManagerJobComponent implements OnInit, OnChanges {
  @Input() note: JobsItem;
  @Output() start = new EventEmitter<string>();
  @Output() stop = new EventEmitter<string>();
  icon = 'file';
  relativeTime = '';
  progress = 0;

  setIcon(): void {
    const noteType = this.note.noteType;
    if (noteType === 'normal') {
      this.icon = 'file';
    } else if (noteType === 'cron') {
      this.icon = 'close-circle';
    } else {
      this.icon = 'file-unknown';
    }
  }

  setRelativeTime(): void {
    this.relativeTime = distanceInWords(new Date(), new Date(this.note.unixTimeLastRun));
  }

  setProgress(): void {
    const runningCount = this.note.paragraphs.filter(
      paragraph => [JobStatus.FINISHED, JobStatus.RUNNING].indexOf(paragraph.status) !== -1
    ).length;
    this.progress = runningCount / this.note.paragraphs.length;
  }

  onStartClick(): void {
    this.start.emit(this.note.noteId);
  }

  onStopClick(): void {
    this.stop.emit(this.note.noteId);
  }

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.setIcon();
    this.setRelativeTime();
    this.setProgress();
  }
}

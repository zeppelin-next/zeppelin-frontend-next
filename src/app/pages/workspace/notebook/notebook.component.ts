import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'zeppelin-notebook',
  templateUrl: './notebook.component.html',
  styleUrls: ['./notebook.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotebookComponent implements OnInit {
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      console.log(data);
    });
  }
}

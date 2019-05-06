import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'zeppelin-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}

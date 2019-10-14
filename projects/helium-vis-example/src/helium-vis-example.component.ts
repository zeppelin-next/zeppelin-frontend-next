import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-helium-vis-example',
  template: `
    <p>
      helium-vis-example works!
    </p>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeliumVisExampleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

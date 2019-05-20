import { GraphConfig } from 'zeppelin-sdk';

export interface Setting {
  // tslint:disable-next-line:no-any
  template: any;
  // tslint:disable-next-line:no-any
  scope: any;
}

export abstract class Transformation {
  constructor(private config: GraphConfig) {}

  abstract getSetting(): Setting;
  // tslint:disable-next-line:no-any
  abstract transform(tableData): any;

  renderSetting(target): void {
    // TODO
  }

  setConfig(config) {
    this.config = config;
  }

  getConfig() {
    return this.config;
  }
}

import { ComponentRef } from '@angular/core';
import { Subject } from 'rxjs';
import { GraphConfig } from 'zeppelin-sdk';
import { Setting, Transformation } from './transformation';

// tslint:disable-next-line
export abstract class Visualization<T = any> {
  // tslint:disable-next-line
  transformed: any;
  componentRef: ComponentRef<T>;
  configChange$ = new Subject<GraphConfig>();
  private active = false;
  private dirty = false;
  constructor(private config: GraphConfig) {}

  abstract getTransformation(): Transformation;
  abstract render(tableData): void;
  abstract refresh(): void;
  abstract destroy(): void;
  abstract getSetting(): Setting;

  configChanged() {
    return this.configChange$.asObservable();
  }

  activate() {
    if (!this.active || this.dirty) {
      this.refresh();
      this.dirty = false;
    } else {
      this.active = true;
    }
  }

  deactivate() {
    this.active = false;
    this.configChange$.complete();
  }

  isActive() {
    return this.active;
  }

  resize() {
    if (this.isActive()) {
      this.refresh();
    } else {
      this.dirty = true;
    }
  }

  setConfig(config: GraphConfig) {
    this.config = config;
    if (this.isActive()) {
      this.refresh();
    } else {
      this.dirty = true;
    }
  }

  getConfig() {
    return this.config;
  }

  renderSetting(target): void {
    // TODO
  }
}

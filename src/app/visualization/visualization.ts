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

  configChanged() {
    return this.configChange$.asObservable();
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
}

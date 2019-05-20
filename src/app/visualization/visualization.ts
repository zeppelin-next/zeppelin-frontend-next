import { GraphConfig } from 'zeppelin-sdk';
import { Setting, Transformation } from './transformation';

export abstract class Visualization {
  private active = false;
  private dirty = false;
  constructor(private config: GraphConfig) {}

  abstract getTransformation(): Transformation;
  abstract render(tableData): void;
  abstract refresh(): void;
  abstract destroy(): void;
  abstract getSetting(): Setting;

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

  setConfig(config) {
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

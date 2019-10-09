import { CdkPortalOutlet, ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { InjectionToken, ViewContainerRef } from '@angular/core';

import { Visualization } from './visualization';

export const VISUALIZATION = new InjectionToken<Visualization>('Visualization');

export class VisualizationComponentPortal<T extends Visualization, C> {
  constructor(
    private visualization: T,
    private component: ComponentType<C>,
    private portalOutlet: CdkPortalOutlet,
    private viewContainerRef: ViewContainerRef
  ) {}

  createInjector() {
    const userInjector = this.viewContainerRef && this.viewContainerRef.injector;
    // tslint:disable-next-line
    const injectionTokens = new WeakMap<any, any>([[VISUALIZATION, this.visualization]]);
    return new PortalInjector(userInjector, injectionTokens);
  }

  getComponentPortal() {
    const injector = this.createInjector();
    return new ComponentPortal(this.component, undefined, injector);
  }

  attachComponentPortal() {
    const componentRef = this.portalOutlet.attachComponentPortal(this.getComponentPortal());
    componentRef.changeDetectorRef.markForCheck();
    return componentRef;
  }
}

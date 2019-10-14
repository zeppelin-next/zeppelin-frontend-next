/*
 * Public API Surface of helium-vis-example
 */

import { createHeliumPackage, HeliumPackageType } from 'zeppelin-helium';
import { HeliumVisExampleComponent } from './helium-vis-example.component';
import { HeliumVisExampleModule } from './helium-vis-example.module';

export default createHeliumPackage({
  name: 'helium-vis-example',
  id: 'heliumVisExample',
  icon: 'appstore',
  type: HeliumPackageType.Visualization,
  module: HeliumVisExampleModule,
  component: HeliumVisExampleComponent
});

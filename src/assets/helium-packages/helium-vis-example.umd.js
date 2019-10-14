(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('zeppelin-helium'), require('@angular/core')))
    : typeof define === 'function' && define.amd
    ? define('helium-vis-example', ['zeppelin-helium', '@angular/core'], factory)
    : ((global = global || self), (global['helium-vis-example'] = factory(global.zeppelinHelium, global.ng.core)));
})(this, function(zeppelinHelium, core) {
  'use strict';

  /**
   * @fileoverview added by tsickle
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */
  var HeliumVisExampleComponent = /** @class */ (function() {
    function HeliumVisExampleComponent() {}
    /**
     * @return {?}
     */
    HeliumVisExampleComponent.prototype.ngOnInit
    /**
     * @return {?}
     */ = function() {};
    HeliumVisExampleComponent.decorators = [
      {
        type: core.Component,
        args: [
          {
            selector: 'lib-helium-vis-example',
            template: '\n    <p>\n      helium-vis-example works!\n    </p>\n  ',
            changeDetection: core.ChangeDetectionStrategy.OnPush
          }
        ]
      }
    ];
    /** @nocollapse */
    HeliumVisExampleComponent.ctorParameters = function() {
      return [];
    };
    return HeliumVisExampleComponent;
  })();

  /**
   * @fileoverview added by tsickle
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */
  var HeliumVisExampleModule = /** @class */ (function() {
    function HeliumVisExampleModule() {}
    HeliumVisExampleModule.decorators = [
      {
        type: core.NgModule,
        args: [
          {
            declarations: [HeliumVisExampleComponent],
            imports: [],
            exports: [HeliumVisExampleComponent]
          }
        ]
      }
    ];
    return HeliumVisExampleModule;
  })();

  /**
   * @fileoverview added by tsickle
   * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
   */
  var publicApi = zeppelinHelium.createHeliumPackage({
    name: 'helium-vis-example',
    type: zeppelinHelium.HeliumPackageType.Visualization,
    module: HeliumVisExampleModule,
    component: HeliumVisExampleComponent
  });

  return publicApi;
});
//# sourceMappingURL=helium-vis-example.umd.js.map

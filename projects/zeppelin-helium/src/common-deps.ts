import * as common from '@angular/common';
import * as core from '@angular/core';
import * as forms from '@angular/forms';
import * as router from '@angular/router';
import * as rxjs from 'rxjs';

import * as NgZorro from 'ng-zorro-antd';
import * as tslib from 'tslib';
import * as ZeppelinHelium from './public-api';

export const COMMON_DEPS = {
  '@angular/core': core,
  '@angular/common': common,
  '@angular/forms': forms,
  '@angular/router': router,
  'ng-zorro-antd': NgZorro,
  'zeppelin-helium': ZeppelinHelium,
  rxjs,
  tslib
};

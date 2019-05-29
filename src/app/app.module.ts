import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US, NzNotificationService } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { TicketService } from 'zeppelin-services';
import { AppHttpInterceptor } from './app-http.interceptor';
import { ShareModule } from 'zeppelin-share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { MESSAGE_INTERCEPTOR, TRASH_FOLDER_ID_TOKEN } from 'zeppelin-interfaces';
import { Router, RouterModule } from '@angular/router';
import { AppMessageInterceptor } from './app-message.interceptor';
import { DebuggerComponent } from './sdk/debugger.component';
import { RUNTIME_COMPILER_PROVIDERS } from './app-runtime-compiler.providers';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, DebuggerComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ShareModule,
    AppRoutingModule,
    RouterModule
  ],
  providers: [
    ...RUNTIME_COMPILER_PROVIDERS,
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
      deps: [TicketService]
    },
    {
      provide: MESSAGE_INTERCEPTOR,
      useClass: AppMessageInterceptor,
      deps: [Router, NzNotificationService]
    },
    {
      provide: TRASH_FOLDER_ID_TOKEN,
      useValue: '~Trash'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

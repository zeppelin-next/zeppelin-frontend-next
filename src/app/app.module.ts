import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N, en_US } from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { MessageService, TicketService } from 'zeppelin-services';
import { AppInterceptor } from './app.interceptor';
import { AppInitializer } from './app.initializer';
import { ShareModule } from 'zeppelin-share/share.module';
import { AppRoutingModule } from './app-routing.module';
import { TRASH_FOLDER_ID_TOKEN } from 'zeppelin-interfaces';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule, ShareModule, AppRoutingModule],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true,
      deps: [TicketService]
    },
    {
      provide: APP_INITIALIZER,
      useFactory: AppInitializer,
      deps: [HttpClient, TicketService, MessageService],
      multi: true
    },
    {
      provide: TRASH_FOLDER_ID_TOKEN,
      useValue: '~Trash'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

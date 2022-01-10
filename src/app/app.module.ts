import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Downloader } from '@ionic-native/downloader/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LocalNotifications, ELocalNotificationTriggerUnit } from '@ionic-native/local-notifications/ngx';
import { SuperTabsModule } from '@ionic-super-tabs/angular';

import { Storage, IonicStorageModule } from '@ionic/storage';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HTTP } from '@ionic-native/http/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';
import { InfoComponent } from './pages/info/info.component';

import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Chooser } from '@ionic-native/chooser/ngx';

import { HttpModule, JsonpModule } from '@angular/http';
import { IonicSwipeAllModule } from 'ionic-swipe-all';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


export function jwtOptionsFactory(storage) {
  return {
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['http://192.168.1.36:8080']
  }
}

@NgModule({
  declarations: [AppComponent, InfoComponent],
  entryComponents: [InfoComponent],
  imports: [
    IonicSwipeAllModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    SuperTabsModule.forRoot(),
    IonicModule.forRoot(),
    AppRoutingModule,
    IonicStorageModule.forRoot(),
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })


  ],
  providers: [
    StatusBar,
    SplashScreen,
    FormBuilder,
    HTTP,
    Downloader,
    FCM,
    Camera,
    DatePicker,
    Base64,
    FileChooser,
    File,
    LocalNotifications,
    FilePath,
    Chooser,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy, },
    { provide: LOCALE_ID, useValue: "en-US" },
  ],
  bootstrap: [AppComponent],

})
export class AppModule {


}

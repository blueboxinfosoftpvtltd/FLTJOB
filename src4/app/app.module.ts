import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ComponentsModule } from '../components/components.module';
import { AuthproviderProvider } from '../providers/authprovider/authprovider';
import { HttpClientModule } from '@angular/common/http';
import { SharedserviceProvider } from '../providers/sharedservice/sharedservice';
import { IonicStorageModule } from '@ionic/storage';
import { FormsModule } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { Camera } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { TextMaskModule } from 'angular2-text-mask';
//import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { LocalNotifications } from '@ionic-native/local-notifications';
import * as $ from 'jquery';
//import { NgCalendarModule } from 'ionic2-calendar';
// import { CalendarModule } from 'ion2-calendar';
//import { DatePickerModule } from 'ionic-calendar-date-picker';
import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { Diagnostic } from '@ionic-native/diagnostic';
import { CallNumber } from '@ionic-native/call-number';
import {Keyboard} from '@ionic-native/keyboard';
const config: SocketIoConfig = { url: 'http://54.172.51.230:3001', options: {} };
@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ComponentsModule,
    HttpClientModule,
    TextMaskModule,
    //NgCalendarModule,
    // CalendarModule,
    SocketIoModule.forRoot(config),
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      // platforms:{
      //   ios:{
      //     scrollPadding: false,
      //     scrollAssist: true,
      //     autoFocusAssist: true
      //   }
      // },
      tabsPlacement: 'Top',
      backButtonText: '',
      preloadModules: true,

    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WheelSelector,
    GooglePlus,
     //BackgroundGeolocation,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthproviderProvider,
    SharedserviceProvider,
    File,
    Camera,
    FilePath,
    Transfer,
    Geolocation,
    Firebase,
    LocalNotifications,
    Diagnostic,
    CallNumber,
    Keyboard
  ]
})
export class AppModule { }

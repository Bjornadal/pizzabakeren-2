import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { OrderPage } from '../pages/order/order';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SelectPizzaPage } from '../pages/order/select-pizza/select-pizza';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { SelectSodaPage } from '../pages/order/select-soda/select-soda';
import { OrderConfirmationPage } from '../pages/order/order-confirmation/order-confirmation';
import { SettingsPage } from '../pages/settings/settings';
import { IonicStorageModule } from '@ionic/storage';
import { HistoryPage } from '../pages/history/history';
import { SettingsProvider } from '../providers/settings/settings.provider';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthProvider } from '../providers/auth/auth.provider';
import { TrackingPage } from '../pages/tracking/tracking';
import { Geolocation } from '@ionic-native/geolocation';
import { firebaseConfig } from './firebase.config';

@NgModule({
  declarations: [
    MyApp,
    OrderPage,
    SelectPizzaPage,
    SelectSodaPage,
    OrderConfirmationPage,
    SettingsPage,
    HistoryPage,
    TrackingPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FlexLayoutModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OrderPage,
    SelectPizzaPage,
    SelectSodaPage,
    OrderConfirmationPage,
    SettingsPage,
    HistoryPage,
    TrackingPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SettingsProvider,
    AuthProvider,
    Geolocation,
  ]
})
export class AppModule {}

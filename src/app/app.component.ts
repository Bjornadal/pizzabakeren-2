import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OrderPage } from '../pages/order/order';
import { SettingsPage } from '../pages/settings/settings';
import { HistoryPage } from '../pages/history/history';
import { SettingsProvider } from '../providers/settings/settings.provider';
import { Settings } from '../pages/settings/shared/settings.model';
import { AuthProvider } from '../providers/auth/auth.provider';
import { TrackingPage } from '../pages/tracking/tracking';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = OrderPage;
  pages: Array<{icon: string, title: string, component: any}>;

  public settings: Settings;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private settingsProivder: SettingsProvider,
              private authProvider: AuthProvider) {
    this.statusBar.styleBlackOpaque();
    this.initializeApp();

    this.settingsProivder.getSettings().subscribe(settings => {
      this.settings = settings;

      if (!this.settings.photoURL) {
        this.settings.photoURL = "assets/imgs/profile-img.jpg";
      }
    });

    // used for an example of ngFor and navigation
    this.pages = [
      { icon: 'pizza', title: 'Bestilling', component: OrderPage },
      { icon: 'clipboard', title: 'Dagens bestillinger', component: HistoryPage },
      { icon: 'settings', title: 'Innstillinger', component: SettingsPage },
      { icon: 'map', title: 'Sporing', component: TrackingPage }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  public login() {
    this.authProvider.login().then(() => {
      this.authProvider.loadUser();
    });
  }

  public logout() {
    this.authProvider.logout().then(() => {
      this.authProvider.unloadUser();
    });
  }
}

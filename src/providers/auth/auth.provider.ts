import { Injectable } from '@angular/core';
import { SettingsProvider } from '../settings/settings.provider';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private user: Observable<firebase.User>;

  constructor(private settingsProvider: SettingsProvider,
              private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
  }

  public login() {
    let provider = new firebase.auth.TwitterAuthProvider();
    return this.firebaseAuth.auth.signInWithPopup(provider);
  }

  public logout() {
    return this.firebaseAuth.auth.signOut();
  }

  public unloadUser() {
    this.settingsProvider.saveSettings('displayName', null);
    this.settingsProvider.saveSettings('photoURL', null);
  }

  public loadUser() {
    this.user.subscribe(user => {
      this.settingsProvider.saveSettings('displayName', user.providerData[0].displayName);
      this.settingsProvider.saveSettings('photoURL', user.providerData[0].photoURL.replace("_normal", ""));
    })
  }
}

import { Injectable } from '@angular/core';
import { Settings } from '../../pages/settings/shared/settings.model';
import { Storage } from '@ionic/storage';
import 'rxjs/add/observable/fromPromise';
import { Subject } from 'rxjs/Subject';

/*
  Generated class for the SettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SettingsProvider {

  private settingsSource = new Subject<Settings>();
  private settingsAnnounced$ = this.settingsSource.asObservable();

  constructor(private storage: Storage) {
  }

  public getSettings() {
    this.getPromises().then(data => {
      this.settingsSource.next(data);
    });

    return this.settingsAnnounced$;
  }

  public saveSettings(key: string, value: string) {
    this.storage.set(key, value).then( () => {
      this.getPromises().then(data => {
        this.settingsSource.next(data);
      });
    });
  }

  private async getPromises() {
    let displayName = await this.storage.get('displayName');
    let group = await this.storage.get('group');
    let photoURL = await this.storage.get('photoURL');
    let settings = new Settings(displayName, group, photoURL);
    return settings;
  }
}

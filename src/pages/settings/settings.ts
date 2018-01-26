import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings.provider';
import { Settings } from './shared/settings.model';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public personName: string;
  public group: string;
  public settings: Settings;

  private settingsSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private settingsProvider: SettingsProvider) {
    this.settingsSubscription = settingsProvider.getSettings().subscribe(settings => {
      this.settings = settings;
      this.settingsSubscription.unsubscribe();
    });
  }

  public personNameChanged(event: any): void {
    if (event != null) {
      this.settingsProvider.saveSettings('displayName', event.value.trim());
    }
  }

  public groupChanged(event: any): void {
    if (event != null) {
      this.settingsProvider.saveSettings('group', event.value.toLowerCase().trim());

    }
  }

}

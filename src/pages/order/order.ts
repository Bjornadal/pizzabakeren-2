import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SelectPizzaPage } from './select-pizza/select-pizza';
import { SettingsProvider } from '../../providers/settings/settings.provider';
import { Settings } from '../settings/shared/settings.model';

@Component({
  selector: 'page-order',
  templateUrl: 'order.html'
})
export class OrderPage {

  public settings: Settings;

  constructor(public navCtrl: NavController,
              private settingsProivder: SettingsProvider) {
    this.settingsProivder.getSettings().subscribe(settings => {
      this.settings = settings;
    });
  }

  public startOrder() {
    this.navCtrl.push(SelectPizzaPage);
  }

}

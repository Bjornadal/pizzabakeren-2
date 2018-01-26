import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { SettingsProvider } from '../../providers/settings/settings.provider';
import * as moment from 'moment';
import { Settings } from '../settings/shared/settings.model';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  public orders: Observable<any[]>;
  public summary: any;

  public personName: string;
  public group: string;
  public settings: Settings;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase,
              private settingsProvider: SettingsProvider,
              private storage: Storage) {

    this.orders = Observable.of([]);
    this.settingsProvider.getSettings().subscribe(settings => {
      console.log('settings', settings);
      this.settings = settings;
      const today = moment().format("YYYY-MM-DD");
      this.orders = db.list(`orders/${settings.group}/${today}`).valueChanges();

      this.orders.subscribe(orders => {
        this.calculateSummary(orders);
      })
    });
  }

  private calculateSummary(orders: any) {
    var summary = {
      pizza: [],
      soda: []
    };

    var pizzaSummaryTmp = [];
    var sodaSummaryTmp = [];

    for (let value of orders) {
      pizzaSummaryTmp[value.pizzaNr] = (pizzaSummaryTmp[value.pizzaNr] == null) ? 1 : pizzaSummaryTmp[value.pizzaNr] + 1;
      sodaSummaryTmp[value.soda] = (sodaSummaryTmp[value.soda] == null) ? 1 : sodaSummaryTmp[value.soda] + 1;
    }

    for (let key in pizzaSummaryTmp) {
      summary.pizza.push({
        "nr": parseInt(key),
        "count": pizzaSummaryTmp[key]
      });
    }

    for (let key in sodaSummaryTmp) {
      summary.soda.push({
        "name": key,
        "count": sodaSummaryTmp[key]
      });
    }

    this.summary = summary;
  }
}

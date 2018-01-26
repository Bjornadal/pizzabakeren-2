import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { SettingsProvider } from '../../../providers/settings/settings.provider';
import * as moment from 'moment';
import { AngularFireList } from 'angularfire2/database/interfaces';
import { OrderPage } from '../order';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-order-confirmation',
  templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

  public order: any = {
    user: null,
    group: null,
    pizzaName: null,
    pizzaNr: null,
    price: null,
    soda: null,
    datetime: null,
  };
  public orderExists: boolean;

  public orders: AngularFireList<any>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private settingsProvider: SettingsProvider,
              private db: AngularFireDatabase,
              private toastCtrl: ToastController) {

    this.settingsProvider.getSettings().subscribe(settings => {
      this.order.user = settings.displayName;
      this.order.group = settings.group;

      const today = moment().format("YYYY-MM-DD");
      this.orders = db.list(`orders/${settings.group}/${today}`);

      this.orders.valueChanges().subscribe(values => {
        this.orderExists = values.find(value => value.user == settings.displayName) != null;
      })
    });

    const pizza = navParams.get('pizza');
    const soda = navParams.get('soda');

    this.order.pizzaName = pizza.name;
    this.order.pizzaNr = pizza.nr;
    this.order.price = pizza.price;
    this.order.soda = soda.name;
    this.order.datetime = (new Date).toJSON();

    console.log(this.order);
  }

  public saveOrder(): void {
    this.orders.push(this.order);
    this.navCtrl.setRoot(OrderPage);
    this.presentToast();
  }

  private presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Bestillingen ble sendt!',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
}

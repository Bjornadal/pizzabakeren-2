import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';

/**
 * Generated class for the SelectSodaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-select-soda',
  templateUrl: 'select-soda.html',
})
export class SelectSodaPage {

  sodaList: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase) {
    this.sodaList = db.list('sodaList').valueChanges()
  }

  public selectSoda(soda: any) {
    const pizza = this.navParams.get('pizza');
    this.navCtrl.push(OrderConfirmationPage, {
      pizza: pizza,
      soda: soda
    })
  }
}

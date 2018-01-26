import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { SelectSodaPage } from '../select-soda/select-soda';

@Component({
  selector: 'page-select-pizza',
  templateUrl: 'select-pizza.html',
})
export class SelectPizzaPage {

  pizzaList: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private db: AngularFireDatabase) {
    this.pizzaList = db.list('pizzaList').valueChanges()
  }

  public selectPizza(pizza: any) {
    this.navCtrl.push(SelectSodaPage, {
      pizza: pizza
    });
  }
}

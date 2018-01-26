import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

/**
 * Generated class for the TrackingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
})
export class TrackingPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  marker: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {
    let latLng = new google.maps.LatLng(66.3016321, 14.121699);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map,
      title: 'Pizza'
    });
  }

  startTracking() {
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      console.log('response', resp);
    }).catch((error) => {
      console.log('Error getting location', error);
    });


    let watchOptions = {
      maximumAge: 5000,
      timeout: 60000,
      enableHighAccuracy: true
    };

    let watch = this.geolocation.watchPosition(watchOptions);
    watch
      .filter((p) => p.coords !== undefined)
      .subscribe((data) => {
        console.log(data.coords.longitude + ' ' + data.coords.latitude);
        if (data.coords) {
          let pos = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
          this.map.setCenter(pos);
          this.marker.setPosition(pos);
        }

      });
  }
}

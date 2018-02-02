import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import { GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent, ILatLng, LatLng, Marker } from '@ionic-native/google-maps';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Track } from './models/track.model';
import { Observable } from 'rxjs/Observable';
import { SettingsProvider } from '../../providers/settings/settings.provider';
import { Settings } from '../settings/shared/settings.model';
import { Subscription } from 'rxjs/Subscription';

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

  public marker: Marker;
  public map: GoogleMap;
  public settings: Settings;
  public liveTrack: Observable<Track>;

  private trackRef: AngularFireObject<Track>;
  private watchSubscription: Subscription;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private googleMaps: GoogleMaps,
              private geolocation: Geolocation,
              private db: AngularFireDatabase,
              private settingsProvider: SettingsProvider) {
    this.settingsProvider.getSettings().subscribe(data => this.updateSettings(data));
  }

  ionViewDidLoad() {
    this.loadMap();
  }

  public startTracking() {
    this.trackRef.update({
      live: true,
      user: this.settings.displayName || ''
    });

    let watchOptions = {
      maximumAge: 3000,
      timeout: 60000,
      enableHighAccuracy: true
    };

    let watch = this.geolocation.watchPosition(watchOptions);
    this.watchSubscription = watch
      .filter((p) => p.coords !== undefined)
      .subscribe((data: Geoposition) => {
        if (data.coords) {
          const pos: ILatLng = new LatLng(data.coords.latitude, data.coords.longitude);
          this.marker.setPosition(pos);
          this.map.setCameraTarget(pos);
          this.trackRef.update({
            position: {
              altitude: 0,
              latitude: pos.lat,
              longitude: pos.lng,
              speed: data.coords.speed,
              timestamp: data.timestamp
            }
          });
        }
      });
  }

  public stopTracking() {
    if (this.watchSubscription) {
      this.watchSubscription.unsubscribe();
    }
    this.trackRef.update({
      live: false,
      user: ''
    });
  }

  private loadMap() {
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 66.3016321,
          lng: 14.12169
        },
        zoom: 16,
        tilt: 45
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        this.map.addMarker({
          title: 'Pizza',
          icon: 'red',
          animation: 'DROP',
          position: {
            lat: 66.3016321,
            lng: 14.12169
          }
        })
          .then(marker => {
            this.marker = marker;
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                console.log('clicked');
              });
          });
      });
  }

  private updateSettings(settings: Settings) {
    this.settings = settings;

    this.trackRef = this.db.object('track/' + settings.group);
    this.liveTrack = this.trackRef.valueChanges();
  }
}

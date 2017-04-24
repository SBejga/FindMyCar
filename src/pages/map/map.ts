import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import "leaflet";
import 'leaflet-routing-machine';
import 'lrm-graphhopper';

import { Config } from '../home/configVars';

declare var L: any;

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {
  map: L.Map;
  center: L.PointTuple;

  public savedLocation: boolean;
  carLatitude = 0.0;
  carLongitude = 0.0;

  carMarker: L.Marker;
  routingMarker: L.Control;

  lat = 48.775556;
  lon = 9.182778;

  parkplatz = {
    nummer: ''
  };

  plznummer = this.parkplatz.nummer;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
    this.savedLocation = false;
    //set map center
    //this.center = [48.137154, 11.576124]; //Munich
    this.getLocation();
    this.center = [this.lat, this.lon]; //Stuttgart

    //setup leaflet map
    this.initMap();
  }

  initMap() {
    this.map = L.map('map', {
      center: this.center,
      zoom: 13
    });

    //Add OSM Layer
    L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
  }

  //used for init map center
  getLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('My latitude : ', resp.coords.latitude);
      console.log('My longitude: ', resp.coords.longitude);
      this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude));
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  saveLocation() {
    if (this.carMarker) {
      this.map.removeLayer(this.carMarker); // deletes old marker
    }
    if (this.routingMarker) {
      this.map.removeControl(this.routingMarker); // deletes old marker
    }
    var myIcon = L.icon({
      iconUrl: 'http://pngimg.com/uploads/audi/audi_PNG1741.png',
      iconSize: [40, 65],
      popupAnchor: [-3, -76],
    });

    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('My latitude : ', resp.coords.latitude);
      console.log('My longitude: ', resp.coords.longitude);
      this.carMarker = new L.marker([resp.coords.latitude, resp.coords.longitude], { icon: myIcon });
      this.map.addLayer(this.carMarker);
      this.map.panTo(new L.LatLng(resp.coords.latitude, resp.coords.longitude));
      this.carLatitude = resp.coords.latitude;
      this.carLongitude = resp.coords.longitude;
      this.savedLocation = true;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  routing() {
    if (this.routingMarker) {
      this.map.removeControl(this.routingMarker); // deletes old marker
    }
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log('My latitude : ', resp.coords.latitude);
      console.log('My longitude: ', resp.coords.longitude);
      this.routingMarker = new L.Routing.control({
        waypoints: [
          L.latLng(resp.coords.latitude, resp.coords.longitude + 0.010),
          L.latLng(this.carLatitude, this.carLongitude)
        ],
        router: L.Routing.graphHopper(Config.GRAPH_HOPPER_ID, {
          urlParameters: {
              vehicle: 'foot'
          }
        })
      });

      this.map.addControl(this.routingMarker);

      if (this.parkplatz.nummer) {
        var popup = L.popup()
          .setContent(this.parkplatz.nummer);
        this.carMarker.bindPopup(popup).openPopup();
      }

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

}

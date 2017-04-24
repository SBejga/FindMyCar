
//Nicht mehr benötigt
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import {TabsPage} from '../tabs/tabs';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
/*  url: String;
  
  user = {
    username: '',
    password: ''
  };
*/
  constructor(public navCtrl: NavController, public http: Http) {
    //this.url = "https://sbejga.eu.auth0.com";
  }


/*

  test() {
    var username = this.user.username;
    var password = this.user.password;

    console.log(username);
    console.log(password);

    let seq = this.login(username, password);
    seq.subscribe(res => {
      // see response.json
      console.log(res);      
      var foo = new TabsPage();
      foo.loggedIn =true;
      
    //  let bla = this.getProfile(res.access_token);
    //   console.log(bla); 

     // this.navCtrl.setRoot(foo.tabRootMap)

    
      

    });

    /*
    var ausgabe = this.login(username, password);
    console.log(ausgabe);*//*
  }

  login(user: String, pass: String) {
    let endpoint = "/oauth/ro";
    let body = {
      "client_id": "mAk3Qe8Lg7cO45DNyF2JsLP62v15HMQQ",
      "username": user,
      "password": pass,
      "connection": "Username-Password-Authentication",
      "grant_type": "password"
    };
    //loggedIn = true;
    return this.http.post(this.url + endpoint, body).map(res => res.json());

  }
  getProfile(token: String) {
    let endpoint = "/userinfo";
    let query = "?access_token=" + token;
    return this.http.get(this.url + endpoint + query).map(res => res.json());
  }
*/
}

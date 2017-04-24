import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MapPage } from '../map/map';

import { NavController } from 'ionic-angular';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Config } from '../home/configVars';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  url: String;
  user = {
    username: '',
    password: ''
  };
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tabRootMap: any = MapPage;
  public loggedIn: boolean;
  
  constructor(public http: Http) {
    this.url = Config.AUTH0_DOMAIN;
    this.loggedIn = (localStorage.getItem("status") == 'true');
    //this.loggedIn = true;
  }

  auth() {
    var username = this.user.username;
    var password = this.user.password;

    console.log(username);
    console.log(password);

    let seq = this.login(username, password);
    seq.subscribe(res => {
      // see response.json
      console.log(res);      
      this.loggedIn = true;
      localStorage.setItem("status", "true");
      console.log(localStorage.getItem("status"));
    });
  }

  login(user: String, pass: String) {
    let endpoint = "/oauth/ro";
    let body = {
      "client_id": Config.AUTH0_CLIENTID,
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

}

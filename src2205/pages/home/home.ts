import { Component } from '@angular/core';
import { NavController, NavParams, Events, App } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //chatRoot: any;
  //home = HomePage;
  homecontainer: any;
  cbuttonColor: any;
  fbuttonColor: any;
  hbuttonColor: any;
  pbuttonColor: any;
  ctxtcolor: any;
  ftxtcolor: any;
  htxtcolor: any;
  ptxtcolor: any;
  userdata: any;
  type: any;
  allmasterdata: any;
  totalcount: any;
  languagedata: any;
  hide: any;
  pendingcount: any;
  currentcount: any;
  historycount: any;
  futurecount: any;
  constructor(public navCtrl: NavController, public provider: AuthproviderProvider, public navparams: NavParams, public events: Events, public app: App, public storage: Storage) {

    this.events.subscribe('pendingcount', res => {
      this.pendingcount = res;
      console.log(this.pendingcount);
    })
    this.events.subscribe('currentcount', res => {
      this.currentcount = res;
      console.log(this.currentcount);
    })
    this.events.subscribe('historycount', res => {
      this.historycount = res;
      console.log(this.historycount);
    })
    this.events.subscribe('futurecount', res => {
      this.futurecount = res;
      console.log(this.futurecount);
    })
  }

  ionViewDidEnter() {
    console.log('page open');
    this.homecontainer = "";
    this.storage.get('usertype').then(res => {
      console.log(res);
      this.type = res;
      this.cbuttonColor = '#000';
      this.fbuttonColor = '#2068D7';
      this.hbuttonColor = '#2068D7';
      this.pbuttonColor = '#2068D7';
      this.ctxtcolor = '#fff';
      this.ftxtcolor = '#fff';
      this.htxtcolor = '#fff';
      this.ptxtcolor = '#fff';
      this.homecontainer = 'currentbtn';
    })

    this.provider.getAirportCode('5').subscribe(res => {
      this.totalcount = res;
      this.totalcount = this.totalcount.TotalCount;
      console.log(this.totalcount);
    })
  }

  current() {
    this.homecontainer = 'currentbtn';
    this.cbuttonColor = '#000';
    this.fbuttonColor = '#2068D7';
    this.hbuttonColor = '#2068D7';
    this.pbuttonColor = '#2068D7';
    this.ctxtcolor = '#fff';
    this.ftxtcolor = '#fff';
    this.htxtcolor = '#fff';
    this.ptxtcolor = '#fff';
  }

  future() {
    this.homecontainer = 'futurebtn';
    this.cbuttonColor = '#2068D7';
    this.fbuttonColor = '#000';
    this.hbuttonColor = '#2068D7';
    this.pbuttonColor = '#2068D7';
    this.ctxtcolor = '#fff';
    this.ftxtcolor = '#fff';
    this.htxtcolor = '#fff';
    this.ptxtcolor = '#fff';
  }

  history() {
    this.homecontainer = 'historybtn';
    this.cbuttonColor = '#2068D7';
    this.fbuttonColor = '#2068D7';
    this.hbuttonColor = '#000';
    this.pbuttonColor = '#2068D7';
    this.ctxtcolor = '#fff';
    this.ftxtcolor = '#fff';
    this.htxtcolor = '#fff';
    this.ptxtcolor = '#fff';

  }

  pending() {
    this.homecontainer = 'pendingbtn';
    this.cbuttonColor = '#2068D7';
    this.fbuttonColor = '#2068D7';
    this.hbuttonColor = '#2068D7';
    this.pbuttonColor = '#000';
    this.ctxtcolor = '#fff';
    this.ftxtcolor = '#fff';
    this.htxtcolor = '#fff';
    this.ptxtcolor = '#fff';
  }

  createtrip() {
    this.provider.stdata("");
    this.provider.setpdata("");
    this.provider.setsdata("");
    this.provider.setidata("");
    this.provider.setfdata("");
    this.app.getRootNav().push('SelectprofilePage').then(() => {
      this.events.publish('ctripaircraft', this.totalcount);
    });
  }
}

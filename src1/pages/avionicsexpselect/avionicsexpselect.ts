import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the AvionicsexpselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-avionicsexpselect',
  templateUrl: 'avionicsexpselect.html',
})
export class AvionicsexpselectPage {

  @ViewChild('navbar') navBar: Navbar;
  avionicsdata: any;
  listavionicsdata: any;
  name: any;

  public date: string = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events, public provider: AuthproviderProvider) {

    this.provider.setloading();

  }
  ionViewDidEnter() {
    var avionicsdata = this.provider.getmasterdata();
    this.avionicsdata = avionicsdata.data.AvionicsExperience;
    this.provider.dismissloading();
    //this.avionicsdata = this.navParams.get('avionicsdata');
    console.log(this.avionicsdata);
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop();
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectaircraftPage');
  }
  listselect(avionicsname, id) {
    this.name = avionicsname;
    this.event.publish('avionicsselecteddata', [this.name, id]);
    this.navCtrl.pop();
    console.log('back done');
  }

}

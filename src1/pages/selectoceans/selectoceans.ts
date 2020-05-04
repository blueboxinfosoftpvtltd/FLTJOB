import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
/**
 * Generated class for the SelectoceansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-selectoceans',
  templateUrl: 'selectoceans.html',
})
export class SelectoceansPage {
  @ViewChild('navbar') navBar: Navbar;
  oceansdata: any;
  listoceansdata: any;
  name: any;
  isclass: any;
  classdata: any;
  title: any;
  public date: string = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events) {

    this.oceansdata = this.navParams.get('oceansdata');
    if (this.oceansdata != undefined) {
      this.title = "Select Ocean"
    }
    this.classdata = this.navParams.get('classdata');
    if (this.classdata != undefined) {
      this.title = "Select Class"
    }
    this.isclass = this.navParams.get('class');
    console.log(this.classdata);
    console.log(this.isclass);

  }
  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop();
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectaircraftPage');
  }
  listselect(oceansname) {
    console.log(oceansname);
    this.name = oceansname;
    this.event.publish('oceansdata', this.name);
    this.navCtrl.pop();
    console.log('back done');
  }

  listselectclass(classname, classid) {
    this.name = classname;
    this.event.publish('classdata', [this.name, classid]);
    this.navCtrl.pop();
    console.log('back done');
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
/**
 * Generated class for the SelectcontinentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-selectcontinent',
  templateUrl: 'selectcontinent.html',
})
export class SelectcontinentPage {
  @ViewChild('navbar') navBar: Navbar;
  continents: any;
  continentname: any;
  listcontinent: any;
  selectedcontinent: string[] = [];
  selectedcontientname: string[] = [];
  continentsnameret: any;
  isociense: any;
  ociense: any;
  ociensename: any;
  listociense: any;
  selectedociense: string[] = [];
  selectedociensename: string[] = [];
  ociensenameret: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events) {
    this.continents = this.navParams.get('continetdata');
    console.log(this.continents);
    this.continentname = this.navParams.get('selectedcontinent');
    this.isociense = this.navParams.get('isociense');
    this.ociense = this.navParams.get('oceansdata');
    this.ociensename = this.navParams.get('selectedocens');
  }

  ionViewDidLoad() {

  }

  ionViewDidEnter() {
    // this.listcontinent = "";
    // this.listociense = "";
    this.navBar.backButtonClick = () => {
      this.selectedcontientname = [];
      this.selectedociensename = [];
      console.log(this.listcontinent);
      if (this.listcontinent !== undefined && this.isociense == undefined) {
        for (let i = 0; i < this.continents.length; i++) {
          if (this.listcontinent[i].checked == true) {
            //this.selectedcontinent.push(this.listcontinent[i].pkAircraftId);
            this.selectedcontientname.push(this.continents[i].name);
            this.selectedcontientname = this.selectedcontientname.sort();
            this.continentsnameret = this.selectedcontientname.join();

          }
          else {
            console.log(this.listcontinent);
            //this.continentsnameret = "";
          }
        }
        if (this.selectedcontientname.length > 0) {
          this.event.publish('continentdata', this.continentsnameret);
        }
        else {
          this.event.publish('continentdata', "");
        }

      }
      else if (this.listcontinent === undefined && this.isociense == undefined) {
        this.continentsnameret = "";
        console.log('none selected');
        //this.event.publish('continentdata', this.continentsnameret);

      }
      else if (this.listociense != undefined && this.isociense == true) {
        for (let i = 0; i < this.ociense.length; i++) {
          if (this.listociense[i].checked == true) {
            //this.selectedcontinent.push(this.listcontinent[i].pkAircraftId);
            this.selectedociensename.push(this.ociense[i].name);
            this.selectedociensename = this.selectedociensename.sort();
            this.ociensenameret = this.selectedociensename.join();
          }
        }
        if (this.selectedociensename.length > 0) {
          this.event.publish('oceansdata', this.ociensenameret);
        }
        else {
          this.event.publish('oceansdata', "");
        }

      }
      this.navCtrl.pop();
      console.log('back done');
    };

  }
  checkboxselectcontinents() {
    this.listcontinent = <Array<any>>(<Object>this.continents);

  }
  checkboxselectociens() {
    this.listociense = <Array<any>>(<Object>this.ociense);
  }
}

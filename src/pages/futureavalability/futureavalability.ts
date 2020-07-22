import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the FutureavalabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-futureavalability',
  templateUrl: 'futureavalability.html',
})
export class FutureavalabilityPage {
  id: any;
  date: any;
  availabilitydata: any;
  res: any;
  usertype: any;
  ActiveSegment: any;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public authprovider: AuthproviderProvider, public storage: Storage) {
    this.authprovider.setloading();

    this.ActiveSegment = "future";

    // get user type
    this.storage.get('usertype').then(val => {
      this.usertype = val;
    })

    // get current user login id
    this.storage.get('id').then(res => {
      this.id = res;

      // get availabilty
      this.authprovider.getavailability(this.id, this.date).subscribe(res => {
        console.log(res);
        this.res = res;
        if (this.res.data.Pilot != 0) {
          this.authprovider.dismissloading();
          this.availabilitydata = res;
          this.availabilitydata = this.availabilitydata.data.Pilot[0].Availability;
          this.authprovider.dismissloading();
          console.log(this.availabilitydata);
        }
        else if (this.res.data.Pilot == 0) {
          this.authprovider.dismissloading();
        }


      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  // when add availabilty is clicked
  addavailability() {
    this.navCtrl.push('AddavailabilityPage');
  }

  // when current tab is pressed
  IsCurrent() {
    this.app.getRootNav().push('AvailabilityPage');
  }
}

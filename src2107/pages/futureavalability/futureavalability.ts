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
    this.storage.get('usertype').then(val => {
      this.usertype = val;
    })
    this.storage.get('id').then(res => {
      this.id = res;
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

  addavailability() {
    this.navCtrl.push('AddavailabilityPage');
  }

  IsCurrent() {
    this.app.getRootNav().push('AvailabilityPage');
  }
}

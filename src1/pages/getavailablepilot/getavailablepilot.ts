import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

/**
 * Generated class for the GetavailablepilotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getavailablepilot',
  templateUrl: 'getavailablepilot.html',
})
export class GetavailablepilotPage {
  id: any;
  res: any;
  pilotdata: any;
  startdate: any;
  enddate: any;
  arr: string[] = [];
  datearray: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: AuthproviderProvider, public storage: Storage, public events: Events) {
    this.provider.setloading();
    this.storage.get('id').then(val => {
      this.id = val;
      this.provider.getallavailable(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.pilotdata = this.res.data.Pilot;
            this.provider.dismissloading();
          }
          else {
            this.provider.dismissloading();
          }
        }
        else {
          this.provider.dismissloading();
        }
      })
    })

  }

  showdates(availability) {
    console.log(availability);
    this.arr = [];
    for (let i = 0; i < availability.length; i++) {

      this.startdate = availability[i].FromDate;
      this.enddate = availability[i].ToDate;
      this.startdate = new Date(moment(this.startdate).format('YYYY-MM-DD'));
      this.enddate = new Date(moment(this.enddate).format('YYYY-MM-DD'));
      var dt = new Date(this.startdate);
      var newarr = "";
      while (dt <= this.enddate) {
        this.arr.push(moment(new Date(dt)).format('YYYY-MM-DD'));
        dt.setDate(dt.getDate() + 1);
      }
      newarr = this.arr.join();
      this.datearray = newarr;
    }

    this.navCtrl.push('GetavailablePage').then(() => {
      this.events.publish('datearr', this.datearray);
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GetavailablepilotPage');
  }

}

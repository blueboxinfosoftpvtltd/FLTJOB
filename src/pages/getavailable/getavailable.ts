import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import { CalendarComponentOptions } from 'ion2-calendar';
import { CalendarModalOptions } from 'ion2-calendar';
import * as $ from "jquery";
/**
 * Generated class for the GetavailablePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-getavailable',
  templateUrl: 'getavailable.html',
})
export class GetavailablePage {
  type: 'string';
  eventSource;
  viewTitle;
  selecteddate: any;
  isToday: boolean;
  id: any;
  dateArr: any;
  arraydate: any;
  dateRange: any;
  isaddavailability: any;
  currentdate: any;
  _daysConfig: any[] = []
  res: any;
  datearray: any;
  _dayconfig: any[] = [];
  splitdate: any;
  date: any;
  year: any;
  month: any;
  fromdate: any;
  todate: any;
  pastdates: any;
  featuredates: any;
  userdate: any;

  optionsRange: CalendarComponentOptions;
  calendaroption: CalendarModalOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: AuthproviderProvider, public storage: Storage, public events: Events, public alertCtrl: AlertController) {
    this.currentdate = new Date().toISOString();
    this.currentdate = moment(this.currentdate).format('YYYY-MM-DD');

    // get dates from availability page to mark as selected
    this.events.subscribe('datearr', res => {
      if (res != undefined) {
        this.datearray = res;
        console.log(res.split(','));
        this.res = res.split(',');
        this.res.splice(0, 0, this.currentdate);
        console.log(this.res);
        this.dateRange = this.res;
        for (let i = 0; i < this.datearray.length; i++) {
          if (this.currentdate <= this.datearray[i]) {
            this._daysConfig.push({
              disable: true,
              date: this.datearray[i]
            })
          }

        }

        $(".back").prop("disabled", false);
      }

    })



    this.isaddavailability = this.navParams.get('isaddavailability');
    this.fromdate = this.navParams.get('fromdate');
    this.todate = this.navParams.get('todate');
    console.log(this.isaddavailability);

    // when availability is not available
    if (this.isaddavailability == undefined) {
      this.optionsRange = {
        pickMode: 'multi',
        from: new Date(1),
        to: null,
        daysConfig: [{
          date: new Date(2000, 3, 24),
          disable: false
        },]
      };
    }

    // when availability dates is available
    else if (this.isaddavailability == true) {
      this.splitdate = this.currentdate.split('-');
      console.log(this.splitdate);
      this.year = this.splitdate[0];
      this.month = this.splitdate[1];//.split('-');
      // var month = splitmonth[0];
      this.date = this.splitdate[2];
      console.log(this.year);
      console.log(this.month);
      console.log(this.date);
      this.optionsRange = {
        // showToggleButtons: false,
        pickMode: 'multi',
        //from: new Date(2019, 2, 18),
        // to: null,
        daysConfig: this._daysConfig
      }

    }

    // get login id to get available dates
    this.storage.get('id').then(val => {
      this.id = val;
      this.provider.getallavailable(this.id).subscribe(res => {
        console.log(res);
        console.log(this.dateArr);

      })
    })


  }

  monthChange(event) {
    console.log(event);
  }

  // after view init set dates in calender
  ngAfterViewInit() {
    this._daysConfig.push({
      disable: false,
      date: this.currentdate
    })
  }

  ionViewDidLoad() {
    $(".back,.today").prop("disabled", false);
    console.log('ionViewDidLoad GetavailablePage');
  }

  // display alert dialog
  showAlert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  // this method is called after date selected
  onChange($event) {
    var finaldate;
    var temp = this.res;
    console.log(this.res);
    this.userdate = $event;
    console.log('selected date', this.userdate);

    if (this.res != undefined) {
      finaldate = this.res.filter(function (v) {
        return !$event.includes(v);
      });
      finaldate = finaldate.join();

      console.log(this.res);
      console.log(finaldate.length);
      if (finaldate.length === 0) {
        finaldate = $event.filter(function (v) {
          return !temp.includes(v);
        });
        finaldate = finaldate.join();

      }
      if (finaldate.length === 0) {
        finaldate = this.res[0];
        finaldate = finaldate.join();

      }
    }
    else {
      this.userdate = this.userdate.join();
      finaldate = moment(this.userdate).format('MM/DD/YYYY');
    }

    // method is called when fromdate true
    if (this.fromdate == true) {
      this.navCtrl.pop().then(() => {
        this.events.publish('fromdate', finaldate);
      })

    }
    // call when todate is true
    else if (this.todate == true) {
      this.navCtrl.pop().then(() => {
        this.events.publish('todate', finaldate);
      })

    }

  }

}

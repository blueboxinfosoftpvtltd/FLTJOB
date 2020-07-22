import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, Alert } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector/ngx';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
/**
 * Generated class for the AddratingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addrating',
  templateUrl: 'addrating.html',
})
export class AddratingPage {

  dummyJson = {
    certificate: [
      { description: 'Commercial' },
      { description: 'ATP' }
    ],
    category: [
      { description: 'Airplane' },
      { description: 'Helicopter' }
    ],
  }
  pic: any;
  sic: any;
  certificate: any;
  category: any;
  class: any;
  aircraft: any;
  hours: any;
  picrate: any;
  minrate: any;
  classdata: any;
  aircraftdata: any;
  editdata: any;
  aircraftid: any;
  classid: any;
  certificateid: any;
  categoryid: any;
  currentin: string[] = [];
  current: any;
  id: any;
  res: any;
  editcurrentintype: any;
  isedit: any;
  mydate: string = new Date().toISOString();
  cdate: any;
  certiid: any;
  btnname: any;
  mstrainingyes : any;
  mstrainingno : any;
  simulatortraining:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public events: Events, public provider: AuthproviderProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.certificate = this.dummyJson.certificate[0].description;
    this.category = this.dummyJson.category[0].description;
    this.isedit = this.navParams.get('isedit');

    if (this.isedit) {
      this.btnname = "Update";
    }
    else {
      this.btnname = "Add";
    }
    this.events.subscribe('classdata', res => {
      this.class = res[0];
      this.classid = res[1];
    })
    this.events.subscribe('aircraftname', res => {
      this.aircraft = res[0];
      this.aircraftid = res[1];
    })
    this.classdata = this.navParams.get('classdata');
    this.aircraftdata = this.navParams.get('aircraftdata');
    this.editdata = this.navParams.get('editdata');
    console.log(this.aircraftdata);
    if (this.editdata != undefined) {
      this.certiid = this.editdata.pkRatingCertiId;
      this.certificate = this.editdata.RatingCertification;
      this.category = this.editdata.CetogoryType;
      this.class = this.editdata.ClassType;
      this.aircraft = this.editdata.AirCraftType;
      this.hours = this.editdata.Hours;
      this.picrate = this.editdata.PIC;
      this.minrate = this.editdata.MinimumRate;
      this.classid = this.editdata.fkClassId;
      this.editcurrentintype = this.editdata.CurrentInType;
      if(this.editdata.IsReqPrev12MonthTraining == true){
        this.mstrainingyes = true;
        this.mstrainingno = false;
      }
     else if(this.editdata.IsReqPrev12MonthTraining == false){
        this.mstrainingyes = false;
        this.mstrainingno = true;
      }
      if (this.editcurrentintype.includes(",")) {
        this.pic = true;
        this.sic = true;
      }
      else {
        if (this.editcurrentintype == 'SIC') {
          this.sic = true;
        }
        else {
          this.pic = true;
        }
      }
    }
  }

  ionViewWillEnter() {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddratingPage');
  }

  openpicker(op) {

    if (op == 'cer') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.certificate
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.certificate[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.certificate = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (op == 'cat') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.category
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.category[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.category = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
  }

  selectclass() {
    this.navCtrl.push('SelectoceansPage', { 'classdata': this.classdata, 'class': true })
  }

  selectaircraft() {
    this.navCtrl.push('SelectaircraftPage', { 'aircraftdata': this.aircraftdata, 'selectedaircraft': "", 'type': 'singleaircraft' });
  }

  add() {
    this.provider.setloading();
    this.cdate = moment(this.mydate.toString()).format('DD/MM/YYYY');
    this.currentin = [];
    console.log('m call');
    if (this.certificate == 'Commercial') {
      this.certificateid = "2";
      console.log(this.certificateid);
    }
    else if (this.certificate == 'ATP') {
      this.certificateid = "1";
      console.log(this.certificateid);
    }
    if (this.category == 'Airplane') {
      this.categoryid = "1";
      console.log(this.categoryid);
    }
    else if (this.category == 'Helicopter') {
      this.categoryid = "3";
      console.log(this.categoryid);
    }
    if (this.sic == true) {
      console.log('sic');
      this.currentin.push('SIC');
    }
    else if (this.sic == false) {

    }
    if (this.pic == true) {
      this.currentin.push('PIC');
    }
    else if (this.pic == false) {

    }
    if (this.currentin.length > 1) {
      this.current = this.currentin.join();
      console.log(this.current);
    }
    else {
      this.current = this.currentin.join();
      console.log(this.current);
    }
    this.storage.get('id').then(val => {
      this.id = val;

      if (this.isedit == undefined) {
        if (this.mstrainingno == true) {
          this.simulatortraining = false;
        }
        else if (this.mstrainingyes == true) {
          this.simulatortraining = true;
        }
        this.provider.insertratingcerti(this.certificate, this.id, this.categoryid, this.classid, this.aircraft, this.hours, this.picrate, this.minrate, this.current, this.cdate,this.simulatortraining).subscribe(res => {

          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.events.publish('ratingcerti', this.res);
              this.provider.dismissloading();
              this.showalert('Pilot', 'Certificate data added successfully');
              //this.navCtrl.pop();
            }
            else if (this.res.data == null) {
              this.provider.dismissloading();
              this.showalert('Pilot', this.res.msg);
            }

          }
          else {
            this.provider.dismissloading();
          }
        })
      }
      else if (this.isedit == true) {
        if (this.mstrainingno == true) {
          this.simulatortraining = false;
        }
        else if (this.mstrainingyes == true) {
          this.simulatortraining = true;
        }
        this.provider.updateratingcerti(this.certiid, this.certificate, this.id, this.categoryid, this.classid, this.aircraft, this.hours, this.picrate, this.minrate, this.current, this.cdate,this.simulatortraining).subscribe(res => {

          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.events.publish('ratingcerti', this.res);
              this.provider.dismissloading();
              this.showalert('Pilot', 'Certificate data updated successfully');
              //this.navCtrl.pop();
            }
            else if (this.res.data == null) {
              this.provider.dismissloading();
              this.showalert('Pilot', this.res.msg);
            }

          }
          else {
            this.provider.dismissloading();
          }
        })
      }
    })


  }

  showalert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  cheboxcheck(op, event) {
   if (op == 'msy') {
    if (event.checked == true) {
      this.mstrainingno = false;
      this.mstrainingyes = true;
    }
    else {
      this.mstrainingno = true;
      this.mstrainingyes = false;
    }
  }
  else if (op == 'msn') {
    if (event.checked == true) {
      this.mstrainingno = true;
      this.mstrainingyes = false;
    } else {
      this.mstrainingno = false;
      this.mstrainingyes = true;
    }
  }
}

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Events, AlertController, Platform } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as parser from "xml2js";
//import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
@IonicPage()
@Component({
  selector: 'page-dologin',
  templateUrl: 'dologin.html',
})
export class DologinPage {

  email: any;
  password: any;
  isremember: boolean = false;
  loginform: FormGroup;
  res: any;
  message: any;
  devicetype: any;
  pendingtrip: any;
  currenttrip: any;
  historytrip: any;
  futuretrip: any;
  pcount: number = 0;
  ccount: number = 0;
  fcount: number = 0;
  hcount: number = 0;
  userarray: any[] = [];
  intro: any;
  pending: any;
  pencount: number = 0;
  messages: any;
  mcount: number = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public provider: AuthproviderProvider, public storage: Storage, public events: Events, public alertCtrl: AlertController, public platform: Platform) {
    // login form validation
    this.loginform = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      isremember: new FormControl()
    })

    // get storage value and set to page if rember me true
    this.storage.get('email').then((val) => {
      this.email = val;
    });
    this.storage.get('password').then((val) => {
      this.password = val;
      if (this.password != null) {
        this.isremember = true;
      }
      else {
        this.isremember = false;
      }

    });
    this.events.subscribe('logout', res => {
      this.storage.get('email').then((val) => {
        this.email = val;
      });

    })

  }

  ionViewDidEnter() {


  }

  ionViewDidLoad() {
    // set backbutton text to blank
    this.viewCtrl.setBackButtonText('');
    console.log('ionViewDidLoad DologinPage');
  }

  back() {
    this.navCtrl.pop();
  }

  // get login user data
  // device type for sending notification 1 for android 2 for ios
  login() {
    this.provider.setloading();
    if (this.platform.is('ios')) {
      this.devicetype = '2';
    }
    else {
      this.devicetype = '1';
    }
    console.log(this.email, this.password, this.devicetype);
    this.provider.doLogin(this.email, this.password, this.devicetype).subscribe(res => {
      console.log(res);
      this.res = res;
      if (this.res.data != null) {
        let udata = {
          "email": this.email,
          "password": this.password,
          "id": this.res.data.Pilot.pkPilotId,
          "usertype": this.res.data.Pilot.MemberShipType,
          "userprofilepic": this.res.data.Pilot.PhotoPath,
          "userfullname": this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname,
          "devicetype": this.devicetype,
          'isgooglelogin': false,
          'fname': this.res.data.Pilot.PilotFname,
          'lname': this.res.data.Pilot.PilotLname
        }

        // userarray is used for multiuser login
        this.userarray.push(udata);
        this.storage.get('uarray').then(data => {
          console.log(data);
          if (data != null) {
            for (let i = 0; i < data.length; i++) {
              if (data[i].email != this.email) {
                this.userarray.push(data[i]);
              }
            }

          }

          this.storage.set('uarray', this.userarray);
          this.storage.set('Auth', 1);
          this.storage.set('email', this.email);
          this.storage.set('password', this.password);
          this.storage.set('id', this.res.data.Pilot.pkPilotId);
          this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
          this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
          this.storage.set('logout', false);
          this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
          this.storage.set('fname', this.res.data.Pilot.PilotFname);
          this.storage.set('lname', this.res.data.Pilot.PilotLname);
          this.storage.get('introslidelogin1').then(val => {
            this.intro = val;

            // get trips details
            if (this.intro == null || this.intro == undefined || this.intro == "") {
              this.provider.getPendingtrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.pendingtrip = res;
                if (this.pendingtrip.data.Trip != null) {
                  this.pcount = 0;
                  for (let i = 0; i < this.pendingtrip.data.Trip.length; i++) {
                    if (this.pendingtrip.data.Trip[i].IsRecent == true) {
                      this.pcount += 1;
                    }

                  }
                  this.events.publish('pendingcount', this.pcount);
                  console.log(this.pcount);
                }
              })
              this.provider.getCurrenttrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.currenttrip = res;
                if (this.currenttrip.data.Trip != null) {
                  this.ccount = 0;
                  for (let i = 0; i < this.currenttrip.data.Trip.length; i++) {
                    if (this.currenttrip.data.Trip[i].IsRecent == true) {
                      this.ccount += 1;
                    }

                  }
                  this.events.publish('currentcount', this.ccount);
                  console.log(this.ccount);
                }
              })
              this.provider.getHistorytrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.historytrip = res;
                if (this.historytrip.data.Trip != null) {
                  this.hcount = 0;
                  for (let i = 0; i < this.historytrip.data.Trip.length; i++) {
                    if (this.historytrip.data.Trip[i].IsRecent == true) {
                      this.hcount += 1;
                    }

                  }
                  this.events.publish('historycount', this.hcount);
                  console.log(this.hcount);
                }
              })
              this.provider.getFuturetrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.futuretrip = res;
                if (this.futuretrip.data.Trip != null) {
                  this.fcount = 0;
                  for (let i = 0; i < this.futuretrip.data.Trip.length; i++) {
                    if (this.futuretrip.data.Trip[i].IsRecent == true) {
                      this.fcount += 1;
                    }

                  }
                  this.events.publish('futurecount', this.fcount);
                  console.log(this.fcount);
                }
              })
              this.provider.getAllRequest(this.res.data.Pilot.pkPilotId).subscribe(res => {

                this.pending = res;

                if (this.pending.data.Requests != null) {
                  this.pencount = 0;
                  for (let i = 0; i < this.pending.data.Requests.length; i++) {
                    if (this.pending.data.Requests[i].IsRecent == 0) {
                      this.pencount += 1;
                    }

                  }
                  this.events.publish('pencount', this.pencount);
                  console.log(this.pencount);
                }
              })
              this.provider.getRecentMsgList(this.res.data.Pilot.pkPilotId).subscribe(res => {
                this.messages = res;

                if (this.messages.data.Messages != null) {
                  this.mcount = 0;
                  for (let i = 0; i < this.messages.data.Messages.length; i++) {
                    if (this.messages.data.Messages[i].IsReceive == true && this.messages.data.Messages[i].IsRecent == 0) {
                      this.mcount += 1;
                    }

                  }
                  this.events.publish('mcount', this.mcount);
                  console.log(this.mcount);
                }

              })
              this.provider.dismissloading();
              console.log('login');
              this.provider.savecurrentuserdata(this.res);
              this.navCtrl.push("TabpagePage", { "data": this.res, 'usertype': this.res.data.Pilot.MemberShipType }, { animate: false }).then(() => {
                this.events.publish('available', this.res.data.Pilot.Availability);
              });
            }
            else {
              SplashScreen.show({
                showDuration: 2000,
                autoHide: true
              });
              setTimeout(() => {
                location.reload();
              }, 2000);
              this.provider.getPendingtrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.pendingtrip = res;
                if (this.pendingtrip.data.Trip != null) {
                  this.pcount = 0;
                  for (let i = 0; i < this.pendingtrip.data.Trip.length; i++) {
                    if (this.pendingtrip.data.Trip[i].IsRecent == true) {
                      this.pcount += 1;
                    }

                  }
                  this.events.publish('pendingcount', this.pcount);
                  console.log(this.pcount);
                }
              })
              this.provider.getCurrenttrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.currenttrip = res;
                if (this.currenttrip.data.Trip != null) {
                  this.ccount = 0;
                  for (let i = 0; i < this.currenttrip.data.Trip.length; i++) {
                    if (this.currenttrip.data.Trip[i].IsRecent == true) {
                      this.ccount += 1;
                    }

                  }
                  this.events.publish('currentcount', this.ccount);
                  console.log(this.ccount);
                }
              })
              this.provider.getHistorytrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.historytrip = res;
                if (this.historytrip.data.Trip != null) {
                  this.hcount = 0;
                  for (let i = 0; i < this.historytrip.data.Trip.length; i++) {
                    if (this.historytrip.data.Trip[i].IsRecent == true) {
                      this.hcount += 1;
                    }

                  }
                  this.events.publish('historycount', this.hcount);
                  console.log(this.hcount);
                }
              })
              this.provider.getFuturetrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                console.log(res);
                this.futuretrip = res;
                if (this.futuretrip.data.Trip != null) {
                  this.fcount = 0;
                  for (let i = 0; i < this.futuretrip.data.Trip.length; i++) {
                    if (this.futuretrip.data.Trip[i].IsRecent == true) {
                      this.fcount += 1;
                    }

                  }
                  this.events.publish('futurecount', this.fcount);
                  console.log(this.fcount);
                }
              })
              this.provider.getAllRequest(this.res.data.Pilot.pkPilotId).subscribe(res => {

                this.pending = res;

                if (this.pending.data.Requests != null) {
                  this.pencount = 0;
                  for (let i = 0; i < this.pending.data.Requests.length; i++) {
                    if (this.pending.data.Requests[i].IsRecent == 0) {
                      this.pencount += 1;
                    }

                  }
                  this.events.publish('pencount', this.pencount);
                  console.log(this.pencount);
                }
              })
              this.provider.getRecentMsgList(this.res.data.Pilot.pkPilotId).subscribe(res => {
                this.messages = res;

                if (this.messages.data.Messages != null) {
                  this.mcount = 0;
                  for (let i = 0; i < this.messages.data.Messages.length; i++) {
                    if (this.messages.data.Messages[i].IsReceive == true && this.messages.data.Messages[i].IsRecent == 0) {
                      this.mcount += 1;
                    }

                  }
                  this.events.publish('mcount', this.mcount);
                  console.log(this.mcount);
                }

              })
              this.provider.dismissloading();
              console.log('login');
              this.provider.savecurrentuserdata(this.res);
              this.navCtrl.push("TabpagePage", { "data": this.res, 'usertype': this.res.data.Pilot.MemberShipType }, { animate: false }).then(() => {
                this.events.publish('available', this.res.data.Pilot.Availability);
              });

            }
          })

          if (this.userarray.length > 1) {


          }

        })
      }
      else {
        this.provider.dismissloading();
        this.message = this.res.msg;
        this.showAlert();
      }

    });
  }

  // redirect to forgot password page
  GoToForgotPassword() {
    this.navCtrl.push('ForgotpasswordPage');
  }

  // remeber me check box function
  rememberme(event) {
    console.log(event);
    if (event.checked == true) {
      console.log('enter in');
      this.storage.set('email', this.email);
      this.storage.set('password', this.password);
    }
    else {
      this.storage.remove('email').then(res => {
        console.log(res);
      });
      this.storage.remove('password').then(res => {
        console.log(res);
      });
    }
  }

  // check if form is valid then login button visible
  isLogin() {
    if (this.loginform.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  // display loading dialog
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.message,
      buttons: ['OK']
    });
    alert.present();
  }


}

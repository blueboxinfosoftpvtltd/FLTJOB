import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController, AlertController, App, Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { identifierModuleUrl } from '@angular/compiler';

import { Plugins } from '@capacitor/core';
const { SplashScreen } = Plugins;
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;
  EmailId: any;
  PilotFname: any;
  PilotLname: any;
  PhotoPath: any;
  res: any;
  message: any;
  devicetype: any;
  intro: any;
  userarray: any[] = [];
  pendingtrip: any;
  currenttrip: any;
  historytrip: any;
  futuretrip: any;
  pcount: number = 0;
  ccount: number = 0;
  fcount: number = 0;
  hcount: number = 0;
  isback: boolean;
  pending: any;
  pencount: number = 0;
  messages: any;
  mcount: number = 0;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus, public provider: AuthproviderProvider, public storage: Storage, public events: Events, public alertCtrl: AlertController, public platform: Platform, public modalCtrl: ModalController) {

    // if user go to login page from multiuser login page then remove email and password of existing user from storage
    this.isback = this.provider.getback();
    if (this.isback) {
      this.storage.remove('password').then(() => {
        this.storage.remove('email').then(() => {

        })
      })

    }

    // method is used to display slides 
    storage.get('introslidelogin').then(val => {
      this.intro = val;
      if (this.intro == null || this.intro == undefined || this.intro == "") {
        this.storage.set("introslidelogin", true);
        let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login" });
        profileModal.present();
      }
      else {

      }
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // user going to login page
  dologin() {
    this.navCtrl.push("DologinPage")
  }

  // going to join page
  join() {
    this.navCtrl.push("JoinPage")
  }


  // google login method
  GoogleLogin() {
    if (this.platform.is('ios')) {
      this.devicetype = '1';
    }
    else {
      this.devicetype = '2';
    }
    // this.googlePlus.logout().then(() => {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.EmailId = res.email;
        this.PilotFname = res.givenName;
        this.PilotLname = res.familyName;
        this.PhotoPath = res.imageUrl;
        this.provider.setloading();
        this.provider.doGoogleLogin(this.EmailId, this.PilotFname, this.PilotLname, this.PhotoPath, this.devicetype).subscribe(res => {

          console.log(res);
          this.res = res;

          if (this.res.data != null) {
            let udata = {
              "email": this.EmailId,
              "password": null,
              "id": this.res.data.Pilot.pkPilotId,
              "usertype": this.res.data.Pilot.MemberShipType,
              "userprofilepic": this.res.data.Pilot.PhotoPath,
              "userfullname": this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname,
              "devicetype": this.devicetype,
              'isgooglelogin': true,
              'fname': this.res.data.Pilot.PilotFname,
              'lname': this.res.data.Pilot.PilotLname
            }
            this.userarray.push(udata);
            this.storage.get('uarray').then(data => {
              console.log(data);
              if (data != null) {
                for (let i = 0; i < data.length; i++) {
                  if (data[i].email != this.EmailId) {
                    this.userarray.push(data[i]);
                  }

                }

              }
              this.storage.set('uarray', this.userarray);
              this.storage.set('Auth', 1);
              this.storage.set('email', this.EmailId);
              this.storage.set('password', null);
              this.storage.set('id', this.res.data.Pilot.pkPilotId);
              this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
              this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
              this.storage.set('logout', false);
              this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
              this.storage.set('isgooglelogin', true);
              this.storage.set('fname', this.res.data.Pilot.PilotFname);
              this.storage.set('lname', this.res.data.Pilot.PilotLname);
              this.provider.dismissloading();
              this.provider.savecurrentuserdata(this.res);
              this.storage.get('introslidelogin1').then(val => {
                this.intro = val;
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
                  if (this.res.data.Pilot.MemberShipType == "" || this.res.data.Pilot.MemberShipType == 0) {
                    this.navCtrl.push("TabpagePage", { tabIndex: 1, 'istab': 'google' }, { animate: false }).then(() => {
                      this.events.publish('userdata', this.res);
                    })
                  }
                  else {
                    this.navCtrl.push("TabpagePage", { tabIndex: 0, 'istab': 'google' }, { animate: false }).then(() => {
                      this.events.publish('userdata', this.res);
                    })
                  }


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
                  if (this.res.data.Pilot.MemberShipType == "" || this.res.data.Pilot.MemberShipType == 0) {
                    this.navCtrl.push("TabpagePage", { tabIndex: 1, 'istab': 'google' }, { animate: false }).then(() => {
                      this.events.publish('userdata', this.res);
                    })
                  }
                  else {
                    this.navCtrl.push("TabpagePage", { tabIndex: 0, 'istab': 'google' }, { animate: false }).then(() => {
                      this.events.publish('userdata', this.res);
                    })
                  }



                }
              })

              if (this.userarray.length > 1) {


              }
              else {

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
                if (this.res.data.Pilot.MemberShipType == "" || this.res.data.Pilot.MemberShipType == 0) {
                  this.navCtrl.push("TabpagePage", { tabIndex: 1, 'istab': 'google' }, { animate: false }).then(() => {
                    this.events.publish('userdata', this.res);
                  })
                }
                else {
                  this.navCtrl.push("TabpagePage", { tabIndex: 0, 'istab': 'google' }, { animate: false }).then(() => {
                    this.events.publish('userdata', this.res);
                  })
                }

              }


              console.log('login');

            })
          }
          else {
            this.message = this.res.msg;
            this.showAlert();
          }
        });


      })

      .catch(err => console.error(err));
  }

  // back press from page
  back() {
    this.navCtrl.pop();
  }

  // logout from google login

  Googlelogout() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";
      })
      .catch(err => console.error(err));
  }
  // display dialog message

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.message,
      buttons: ['OK']
    });
    alert.present();
  }

}



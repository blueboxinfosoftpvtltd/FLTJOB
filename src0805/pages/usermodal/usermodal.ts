import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, AlertController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { GooglePlus } from '@ionic-native/google-plus';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThrowStmt } from '@angular/compiler';
/**
 * Generated class for the UsermodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usermodal',
  templateUrl: 'usermodal.html',
})
export class UsermodalPage {
  users: any;
  ures: any;
  rvalue: any;
  clogin: any;
  islogin: boolean = false;
  udetail: any;
  res: any;
  pendingtrip: any;
  currenttrip: any;
  historytrip: any;
  futuretrip: any;
  pcount: number = 0;
  ccount: number = 0;
  fcount: number = 0;
  hcount: number = 0;
  message: any;
  username: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, private app: App, public googlePlus: GooglePlus,public splash : SplashScreen) {

    this.storage.get('userfullname').then(val => {
      this.username = val;
      this.storage.get('uarray').then(val => {
        if (val != null) {
          this.users = val;
          this.users.forEach((element, index) => {
            if (element.userfullname == this.username) {
              this.rvalue = element.userfullname;
              this.clogin = element.userfullname;
            }
            else {
              // element.checked = false;
            }
          });
        }
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsermodalPage');
  }

  close() {
    this.navCtrl.pop();
  }
  radioclick(e, val) {
    if (e != this.clogin) {
      this.islogin = true;
      this.udetail = val;
    }
    else {
      this.islogin = false;
    }
  }

  addac() {
    //this.splash.show();
    //location.reload();
    this.navCtrl.push('DologinPage');
  }

  showAlert() {
    const prompt = this.alertCtrl.create({
      title: "FLTJOB",
      message: "Are you sure you want to logout ?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.googlePlus.logout().then(() => {
            })
            this.app.getRootNav().getActiveChildNav().select(0);
            this.navCtrl.push('LoginPage', { animate: false }).then(() => {
              this.storage.remove('uarray').then(val => {
                console.log(val);
                this.storage.remove('email').then(val => {
                  console.log(val);
                  this.storage.remove('password').then(val => {
                    console.log(val);
                  })
                })
              })
            });
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  logout() {
    this.showAlert();
  }
  login() {
    this.provider.setloading();
    if (this.udetail.isgooglelogin) {
      this.provider.doGoogleLogin('andypatel877@gmail.com', 'andy', 'patel', 'https://lh5.googleusercontent.com/-1xFFJGoqpTE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcHwtzsk_fTcAzVjDIZ5BaglZKm2Q/s120/photo.jpg', '1').subscribe(res => {
        console.log(res);
        this.res = res;

        if (this.res.data != null) {
          // this.storage.set('Auth', 1);
          // //this.storage.set('email', this.res.data.Pilot.pkPilotId);
          // this.storage.set('id', this.res.data.Pilot.pkPilotId);
          // this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
          // this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
          // this.storage.set('isgooglelogin', true);

          this.storage.set('Auth', 1);
          this.storage.set('email', this.udetail.email);
          // this.storage.set('password', this.password);
          this.storage.set('id', this.res.data.Pilot.pkPilotId);
          this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
          this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
          this.storage.set('logout', false);
          this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
          this.storage.set('isgooglelogin', true);
          this.provider.dismissloading();
          this.provider.savecurrentuserdata(this.res);
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

          // this.navCtrl.push("TabpagePage",{tabIndex: 1});

          console.log('login');


        }
        else {
          // this.message = this.res.msg;
          // this.showAlert();
        }
      });
    } else {
      this.provider.doLogin(this.udetail.email, this.udetail.password, this.udetail.devicetype).subscribe(res => {
        console.log(res);

        this.res = res;
        //this.storage.set('AvabilityData', this.res.data.Pilot.Availability);
        if (this.res.data != null) {

          this.storage.set('Auth', 1);
          this.storage.set('email', this.udetail.email);
          this.storage.set('password', this.udetail.password);
          this.storage.set('id', this.res.data.Pilot.pkPilotId);
          this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
          this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
          this.storage.set('logout', false);
          this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
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
          this.provider.dismissloading();
          console.log('login');
          this.provider.savecurrentuserdata(this.res);
          this.navCtrl.push("TabpagePage", { "data": this.res, 'usertype': this.res.data.Pilot.MemberShipType }, { animate: false }).then(() => {
            this.events.publish('available', this.res.data.Pilot.Availability);
          });
        }
        else {
          // this.provider.dismissloading();
          // this.message = this.res.msg;
          // this.showAlert();
        }

      });
    }

  }


}

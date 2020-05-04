import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,ModalController, AlertController, App,Platform } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { identifierModuleUrl } from '@angular/compiler';


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
  devicetype:any;
  intro:any;
  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public googlePlus: GooglePlus, public provider: AuthproviderProvider, public storage: Storage, public events: Events, public alertCtrl: AlertController,public platform: Platform,public modalCtrl: ModalController) {

    storage.get('introslidelogin').then(val => {
      this.intro = val;
      if(this.intro == null || this.intro == undefined || this.intro == ""){
        this.storage.set("introslidelogin",true);
        let profileModal = this.modalCtrl.create("IntroductionPage",{ slidename: "login" });
        profileModal.present();
      }
      else{

      }
  })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  dologin() {
    this.navCtrl.push("DologinPage")
  }

  join() {
    this.navCtrl.push("JoinPage")
  }

  GoogleLogin() {
    if (this.platform.is('ios')) {
      this.devicetype = '1';
    }
    else {
      this.devicetype = '2';
    }
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.EmailId = res.email;
        this.PilotFname = res.givenName;
        this.PilotLname = res.familyName;
        this.PhotoPath = res.imageUrl;
           this.provider.setloading();
        this.provider.doGoogleLogin(this.EmailId,this.PilotFname, this.PilotLname,this.PhotoPath,this.devicetype).subscribe(res => {
        // this.provider.doGoogleLogin('andypatel877@gmail.com','andy', 'patel', 'https://lh5.googleusercontent.com/-1xFFJGoqpTE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcHwtzsk_fTcAzVjDIZ5BaglZKm2Q/s120/photo.jpg','1').subscribe(res => {
          console.log(res);
          this.res = res;
      
          if (this.res.data != null) {
            this.storage.set('Auth', 1);
            //this.storage.set('email', this.res.data.Pilot.pkPilotId);
            this.storage.set('id', this.res.data.Pilot.pkPilotId);
            this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
            this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
            this.storage.set('isgooglelogin', true);
            this.provider.dismissloading();
            this.provider.savecurrentuserdata(this.res);
            if(this.res.data.Pilot.MemberShipType == "" || this.res.data.Pilot.MemberShipType == 0){
              this.navCtrl.push("TabpagePage", { tabIndex: 1,'istab':'google' }, { animate: false }).then(() => {
                this.events.publish('userdata', this.res);
              })
            }
            else{
              this.navCtrl.push("TabpagePage", { tabIndex: 0,'istab':'google' }, { animate: false }).then(() => {
                this.events.publish('userdata', this.res);
              })
            }
             
            // this.navCtrl.push("TabpagePage",{tabIndex: 1});
            
            console.log('login');


          }
          else {
            this.message = this.res.msg;
            this.showAlert();
          }
        });


      })
      .catch(err => console.error(err));
  }

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

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.message,
      buttons: ['OK']
    });
    alert.present();
  }

}



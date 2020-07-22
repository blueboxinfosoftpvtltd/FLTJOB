import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the SelectprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-selectprofile',
  templateUrl: 'selectprofile.html',
})
export class SelectprofilePage {

  aircraftdata: any;
  captain: any;
  fatt: any;
  scommand: any;
  fins: any;
  totalcount: any;
  languagedata: any;
  gdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public view: ViewController, public alertCtrl: AlertController, public storage: Storage, public auth: AuthproviderProvider) {
    this.view.setBackButtonText('');
    this.events.subscribe('ctripaircraft', res => {
      console.log(res);
      this.totalcount = res;
    })
    this.captain = false;
    this.scommand = false;
    this.fatt == false;
    this.fins == false;

    this.gdata = auth.gtdata();

    console.log(this.gdata);

    if (this.gdata != "") {
      this.captain = this.gdata.Captain;
      this.scommand = this.gdata.SecondInCommand;
      this.fatt = this.gdata.FlightAttendant;
      this.fins = this.gdata.FlightInstructor;
    }



    // localStorage.removeItem("enrouteairportcodelist");
    // localStorage.removeItem("enrouteairportcodelist1");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectprofilePage');
  }


  next() {

    console.log(this.captain);
    if (this.captain == true || this.scommand == true || this.fatt == true || this.fins == true) {
      this.navCtrl.push('CreatetripPage', { 'captain': this.captain, 'scommand': this.scommand, 'fatt': this.fatt, 'fins': this.fins }).then(() => {
        this.events.publish('airdata', this.totalcount);
      });
    }
    else {
      this.showAlert();
    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Select profile first !',
      buttons: ['OK']
    });
    alert.present();
  }
}

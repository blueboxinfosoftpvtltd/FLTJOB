import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the DispcurrentratingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dispcurrentrating',
  templateUrl: 'dispcurrentrating.html',
})
export class DispcurrentratingPage {
  classdata: any;
  aircraftdata: any;
  id: any;
  res: any;
  certidata: any;
  deleteres: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public authprovider: AuthproviderProvider, public alertCtrl: AlertController, public events: Events) {
  }

  ionViewDidEnter() {
    console.log('ionViewDidLoad DispcurrentratingPage');
    this.authprovider.setloading();
    this.storage.get('id').then(val => {
      this.id = val;
      this.classdata = this.navParams.get('classdata');
      this.aircraftdata = this.navParams.get('aircraftdata');
      this.authprovider.getratingcerti(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.certidata = this.res.data.RatingCertificates;
            console.log(this.certidata);
            this.authprovider.dismissloading();
          }
        }
        else if (this.res.Code == 400) {
          this.authprovider.dismissloading();
        }
      })
    })
  }

  ionViewDidLoad() {

  }

  addrating() {
    this.navCtrl.push('AddratingPage', { 'classdata': this.classdata, 'aircraftdata': this.aircraftdata });
  }

  edit(data) {
    this.navCtrl.push('AddratingPage', { 'editdata': data, 'classdata': this.classdata, 'aircraftdata': this.aircraftdata, 'isedit': true });
  }

  delete(data) {
    this.presentConfirm(data);

  }

  successalert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.ionViewDidEnter();
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(data) {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Do you want to delete certificate?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(data);
            this.authprovider.setloading();
            this.authprovider.deletecertificate(data.pkRatingCertiId).subscribe(res => {

              this.deleteres = res;
              if (this.deleteres.Code == 200) {
                this.events.publish('ratingcerti', this.deleteres);
                this.authprovider.dismissloading();
                this.successalert('Pilot', 'Certificate deleted successfully');
              }
              else {
                this.authprovider.dismissloading();
              }
            })

          }
        }
      ]
    });
    alert.present();
  }
}

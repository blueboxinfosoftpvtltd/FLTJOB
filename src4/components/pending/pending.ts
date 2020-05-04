import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Events, LoadingController, NavController, App, AlertController } from 'ionic-angular';
/**
 * Generated class for the PendingComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pending',
  templateUrl: 'pending.html'
})
export class PendingComponent {

  text: string;
  id: any;
  pendingtripdata: any;
  loading: any;
  res: any;
  cancelres: any;
  usertype:any;
  pcres:any;
  ptripdata:any;
  message:any;
  constructor(public provider: AuthproviderProvider, public events: Events, public storage: Storage, public loadingCtrl: LoadingController, public navCtrl: NavController, public app: App, public alertCtrl: AlertController) {
  this.storage.get('usertype').then(val =>{
   this.usertype = val;
  })
  }

  ngOnInit() {
    console.log('Hello PendingComponent Component');
    this.text = 'Hello World';
    this.events.subscribe('pending', val => {
      this.pendingtripdata = val;
    })
    this.events.subscribe('componentspending', val => {
      this.provider.setloading();
      this.storage.get('id').then((val) => {
        this.id = val;
        this.provider.getPendingtrip(this.id).subscribe(res => {
          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.provider.dismissloading();
              this.pendingtripdata = res;
              this.pendingtripdata = this.pendingtripdata.data.Trip;
            }
            else {
              this.provider.dismissloading();
            }
          }
          else {
            this.provider.dismissloading();
          }
        })
      });
    })
    this.storage.get('id').then((val) => {
      this.provider.setloading();
      this.id = val;
      this.provider.getPendingtrip(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.provider.dismissloading();
            this.pendingtripdata = res;
            this.pendingtripdata = this.pendingtripdata.data.Trip;
          }
          else {
            this.provider.dismissloading();
          }
        }
        else {
          this.provider.dismissloading();
        }
      })
    });
  }

  opentrip(data, tripname, tripid, aircraft, rate, enroutecode, depcode, descode, tsdate, tedate, isrecent, cancel) {
    this.app.getRootNav().push('OpenpendingnotificationPage', { 'tripname': tripname, 'tripid': tripid, 'aircraft': aircraft, 'rate': rate, 'enroutecode': enroutecode, 'depcode': depcode, 'descode': descode, 'tsdate': tsdate, 'tedate': tedate, 'isPending': isrecent, 'iscancel': cancel });
  }
  canceltrip(id) {
    //this.presentConfirm(id);
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to cancel trip ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.provider.setloading();

            this.provider.canceltripowner(id, "").subscribe(res => {
              this.pcres = res;
              if (this.pcres.Code == 200) {
                this.provider.getPendingtrip(this.id).subscribe(res => {
                  this.ptripdata = res;
                  this.ptripdata = this.ptripdata.data.Trip;
                  this.events.publish('pending', this.ptripdata);
                })
                this.provider.dismissloading();
                this.message = "Trip canceled successfully";
                this.successalert1();
              }
              else {
                this.provider.dismissloading();
                this.erroralert();
              }

            })

          }
        }
      ]
    });
    prompt.present();
  }

  erroralert() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Error ocuured!',
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
  successalert1() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: this.message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  successalert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.ngOnInit();
          }
        }
      ]
    });
    alert.present();
  }

  presentConfirm(id) {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Do you want to delete trip?',
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
            this.provider.setloading();
            this.provider.canceltrip(id).subscribe(res => {
              this.cancelres = res;
              if (this.cancelres.Code == 200) {
                this.loading.dismiss();
                this.successalert('Pilot', 'Trip deleted successfully');
              }
              else {
                this.provider.dismissloading();
              }
            })


          }
        }
      ]
    });
    alert.present();
  }
}

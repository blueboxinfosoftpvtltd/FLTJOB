import { Component } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Events, LoadingController, App, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CurrentComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'current',
  templateUrl: 'current.html'
})
export class CurrentComponent {

  text: string;
  id: any;
  currenttripdata: any;
  loading: any;
  res: any;
  cancelres: any;
  constructor(public provider: AuthproviderProvider, public events: Events, public storage: Storage, public loadingCtrl: LoadingController, public app: App, public alertCtrl: AlertController) {



  }

  ngOnInit() {
    console.log('Hello CurrentComponent Component');
    this.events.subscribe('componentscurrent', val => {
      this.storage.get('id').then((val) => {
        this.provider.setloading();
        this.id = val;
        this.provider.getCurrenttrip(this.id).subscribe(res => {
          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.provider.dismissloading();
              this.currenttripdata = res;
              this.currenttripdata = this.currenttripdata.data.Trip;
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
    this.text = 'Hello World';
    this.storage.get('id').then((val) => {
      this.provider.setloading();
      this.id = val;
      this.provider.getCurrenttrip(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.provider.dismissloading();
            this.currenttripdata = res;
            this.currenttripdata = this.currenttripdata.data.Trip;
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


  canceltrip(id) {
    this.presentConfirm(id);
  }

  opentrip(tripname, tripid, aircraft, rate, enroutecode, depcode, descode, tsdate, tedate, isrecent) {
    this.app.getRootNav().push('OpenpendingnotificationPage', { 'tripname': tripname, 'tripid': tripid, 'aircraft': aircraft, 'rate': rate, 'enroutecode': enroutecode, 'depcode': depcode, 'descode': descode, 'tsdate': tsdate, 'tedate': tedate, 'isCurrent': isrecent });

    //this.app.getRootNav().push('UserrattingPage');
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
                this.provider.dismissloading();
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

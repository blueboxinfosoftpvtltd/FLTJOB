import { Component } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Events, LoadingController, App, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the HistoryComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'history',
  templateUrl: 'history.html'
})
export class HistoryComponent {

  text: string;
  id: any;
  historytripdata: any;
  loading: any;
  res: any;
  cancelres: any;
  tripres: any;
  usertype: any;
  constructor(public provider: AuthproviderProvider, public events: Events, public storage: Storage, public loadingCtrl: LoadingController, public app: App, public alertCtrl: AlertController) {
    this.storage.get('usertype').then(val => {
      this.usertype = val;
    })
  }

  ngOnInit() {

    console.log('Hello CurrentComponent Component');
    this.events.subscribe('componentshistory', val => {
      this.storage.get('id').then((val) => {
        this.provider.setloading();
        this.id = val;
        this.provider.getHistorytrip(this.id).subscribe(res => {
          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.provider.dismissloading();
              this.historytripdata = res;
              this.historytripdata = this.historytripdata.data.Trip;
              console.log(this.historytripdata);
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
      this.provider.getHistorytrip(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.provider.dismissloading();
            this.historytripdata = res;
            this.historytripdata = this.historytripdata.data.Trip;
            console.log(this.historytripdata);
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

  opentrip(tripname, tripid, aircraft, rate, enroutecode, depcode, descode, tsdate, tedate, isrecent) {
    this.app.getRootNav().push('OpenpendingnotificationPage', { 'tripname': tripname, 'tripid': tripid, 'aircraft': aircraft, 'rate': rate, 'enroutecode': enroutecode, 'depcode': depcode, 'descode': descode, 'tsdate': tsdate, 'tedate': tedate, 'isHistory': isrecent });
  }
  canceltrip(id) {
    this.presentConfirm(id);
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
  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  showAlert2(message) {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  gototrip(tid) {
    this.provider.setloading();
    this.provider.gettrip(tid, this.id).subscribe(res => {

      this.tripres = res;
      this.tripres = this.tripres.data.Trip;
      if (this.tripres == null) {
        this.showAlert2("No trip data available");
        this.provider.dismissloading();
      }
      // console.log(tid);
      else {
        this.tripres = this.tripres[0];
        this.provider.stdata(this.tripres);
        this.app.getRootNav().push("SelectprofilePage");
        this.provider.dismissloading();
      }


    })

  }
}

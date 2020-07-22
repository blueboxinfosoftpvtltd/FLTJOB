import { Component } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Events, LoadingController, AlertController, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FutureComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'future',
  templateUrl: 'future.html'
})
export class FutureComponent {

  text: string;
  id: any;
  futuretripdata: any;
  loading: any;
  res: any;
  cancelres: any;
  constructor(public provider: AuthproviderProvider, public events: Events, public storage: Storage, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public app: App) {

  }


  // get future trip when component init

  ngOnInit() {
    console.log('Hello CurrentComponent Component');
    this.text = 'Hello World';
    this.storage.get('id').then((val) => {
      this.provider.setloading();
      this.id = val;
      this.provider.getFuturetrip(this.id).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data != null) {
            this.provider.dismissloading();
            this.futuretripdata = res;
            this.futuretripdata = this.futuretripdata.data.Trip;
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

  // canceltrip(id) {
  //   this.presentConfirm(id);
  // }

  // successalert(title, msg) {
  //   let alert = this.alertCtrl.create({
  //     title: title,
  //     message: msg,
  //     buttons: [
  //       {
  //         text: 'Ok',
  //         handler: () => {
  //           this.ngOnInit();
  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // presentConfirm(id) {
  //   let alert = this.alertCtrl.create({
  //     title: 'Pilot',
  //     message: 'Do you want to delete trip?',
  //     buttons: [
  //       {
  //         text: 'No',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Yes',
  //         handler: () => {
  //           this.provider.setloading();
  //           this.provider.canceltrip(id).subscribe(res => {
  //             this.cancelres = res;
  //             if (this.cancelres.Code == 200) {
  //               this.loading.dismiss();
  //               this.successalert('Pilot', 'Trip deleted successfully');
  //             }
  //             else {
  //               this.provider.dismissloading();
  //             }
  //           })


  //         }
  //       }
  //     ]
  //   });
  //   alert.present();
  // }

  // click to open trip
  opentrip(tripname, tripid, aircraft, rate, enroutecode, depcode, descode, tsdate, tedate, isrecent) {
    this.app.getRootNav().push('OpenpendingnotificationPage', { 'tripname': tripname, 'tripid': tripid, 'aircraft': aircraft, 'rate': rate, 'enroutecode': enroutecode, 'depcode': depcode, 'descode': descode, 'tsdate': tsdate, 'tedate': tedate, 'isCurrent': isrecent });

    //this.app.getRootNav().push('UserrattingPage');
  }
  // showAlert(message) {
  //   const alert = this.alertCtrl.create({
  //     title: 'Pilot',
  //     subTitle: message,
  //     buttons: ['OK']
  //   });
  //   alert.present();
  // }

}

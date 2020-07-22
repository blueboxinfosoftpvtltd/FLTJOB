import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  pkpilotid: any;
  req: any;
  reqList: any;
  length: any;
  checkLength: any;
  reqres: any;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: AuthproviderProvider,
    public alertCtrl: AlertController,
    public events: Events) {

  }

  // get all request when page load
  ionViewDidEnter() {
    this.checkLength = false;
    this.storage.get('id').then((val) => {
      this.pkpilotid = val;
      console.log(this.pkpilotid);
      this.getAllRequest(this.pkpilotid);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PendingPage');

  }

  getAllRequest(pkpilotid) {
    this.reqList = [];
    this.provider.setloading();
    this.provider.getAllRequest(pkpilotid).subscribe(res => {
      console.log(res);
      this.req = res;
      console.log(this.req.msg);
      if (this.req.msg == null) {
        this.req = this.req.msg;
        this.provider.dismissloading();
        this.presentAlert("Pilot", "No requests found");
      }
      else {
        this.length = this.req.data.Requests.length;
        console.log(this.length);
        this.reqList = this.req.data.Requests;
        this.checkLength = true;
        console.log(this.reqList);
        this.provider.setrequestread(pkpilotid).subscribe(res => {
          this.events.publish('pencount', "");
          this.provider.dismissloading();
        })
      }

    })
  }

  // open alert when someone accept or decline 
  successalert(title, msg, type) {
    if (type == 'decline') {
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
    else if (type == 'accept') {
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
  }

  // method is called when declined is click
  DeclineRequest(pkRequestId) {
    this.provider.setloading();
    this.provider.requestreject(pkRequestId).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.successalert('Pilot', 'Request decline successfully', 'decline');
    })
  }


  // method is called when accept is click
  AcceptRequest(pkRequestId) {
    this.provider.setloading();
    this.provider.acceptreject(pkRequestId).subscribe(res => {
      console.log(res);
      this.reqres = res;
      if (this.reqres.Code == 200) {
        this.provider.search('', this.pkpilotid).subscribe(res => {
          this.events.publish('refreshsearchdata', res);
        })
        this.provider.dismissloading();
        this.successalert('Pilot', 'Request accepted successfully', 'accept');
      }
      else {
        this.provider.dismissloading();
      }

      //this.presentAlert("Pilot", this.req.msg);

    })
  }

  // display alert messasge
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }


}

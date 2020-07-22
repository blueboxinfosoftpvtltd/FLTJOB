import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the RequestpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-requestpage',
  templateUrl: 'requestpage.html',
})
export class RequestpagePage {

  data: any;
  res: any;
  requeststatus: any;
  id: any;
  oppositeid: any;
  profiledata: any;
  isfavorite: any;
  favres: any;
  issearch: any;
  photo: any;
  reqstatus: any;
  newoppositeid: any;
  reqid: any;
  reqres: any;
  searchdata: any;
  constructor(private callNumber: CallNumber, public navCtrl: NavController, public navParams: NavParams, public authprovider: AuthproviderProvider, public storage: Storage, public alertCtrl: AlertController, public events: Events, public socket: Socket) {
    this.data = this.navParams.get('data');
    this.newoppositeid = this.navParams.get('oppositeid');
    this.reqid = this.navParams.get('reqid');
    // this.photo = this.data.PhotoPath;
    console.log(this.photo);
    this.issearch = this.navParams.get('issearch');
    if (this.issearch == true) {
      this.oppositeid = this.data.pkPilotId;
    }
    else if (this.issearch == false) {
      this.oppositeid = this.data.oppositePilotId;
    }
    console.log(this.data);
    //this.requeststatus = this.data.requestStatus;
    console.log(this.data);
    this.storage.get('id').then(val => {
      this.authprovider.setloading();
      this.id = val;
      if (this.oppositeid == undefined) {
        this.oppositeid = this.newoppositeid;
        this.issearch = true;
      }

      this.authprovider.viewprofile(this.id, this.oppositeid).subscribe(res => {
        this.res = res;
        console.log("Requestdata", this.res.data.Pilot);
        this.profiledata = this.res.data.Pilot;
        this.reqstatus = this.profiledata.requestStatus;
        this.isfavorite = this.profiledata.isFavrouite;
        console.log(this.isfavorite);
        console.log(this.profiledata);
        this.authprovider.dismissloading();
      })
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestpagePage');
  }

  request() {
    this.authprovider.setloading();
    this.authprovider.requestsend(this.oppositeid, this.id).subscribe(res => {
      this.res = res;

      if (this.res.Code == 200) {
        this.authprovider.dismissloading();
        this.successalert('Pilot', 'Request sent successfully');
      }
      else if (this.res.Code == 400) {
        this.authprovider.dismissloading();
      }
    })
  }
  chat() {
    this.socket.connect();
    this.authprovider.setoppositeid(this.data.pkPilotId);
    //this.chatroomid = this.id  + '' + this.data.pkPilotId;
    this.socket.emit('set-nickname', 'pilot');
    this.navCtrl.push('ChatpagePage', { 'data': this.data, 'ismessage': false, animate: false });
  }

  back() {
    if (this.issearch == true) {
      this.navCtrl.pop();
    }
    else {
      this.navCtrl.pop().then(() => {
        this.events.publish('poprequest', 'done');
      });
    }
  }

  addasfav() {
    if (this.isfavorite == false) {
      this.authprovider.setloading();
      this.isfavorite = true;
      this.authprovider.updatefavorite(this.id, this.oppositeid, this.isfavorite).subscribe(res => {
        this.favres = res;
        if (this.favres.Code == 200) {
          this.authprovider.dismissloading();
          this.showAlert('Added to favorite List');
        }
        else {
          this.authprovider.dismissloading();
        }
      })
    }
    else {
      this.authprovider.setloading();
      this.isfavorite = false;
      this.authprovider.updatefavorite(this.id, this.oppositeid, this.isfavorite).subscribe(res => {
        this.favres = res;
        if (this.favres.Code == 200) {
          this.authprovider.dismissloading();
          this.showAlert('Remove from favorite list');
        }
        else {
          this.authprovider.dismissloading();
        }
      })
    }
  }

  showAlert(message) {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: message,
      buttons: ['OK']
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
            this.navCtrl.pop().then(() => {

            });
          }
        }
      ]
    });
    alert.present();
  }
  requestaccept() {
    this.authprovider.setloading();
    this.authprovider.acceptreject(this.reqid).subscribe(res => {
      this.reqres = res;
      if (this.reqres.Code == 200) {
        this.authprovider.search('', this.id).subscribe(res => {
          this.events.publish('refreshsearchdata', res);
        })
        this.authprovider.dismissloading();
        this.successalert('Pilot', this.reqres.msg);
      }
      else {
        this.authprovider.dismissloading();
      }
    })
  }

  call(phonenumber) {
    if (phonenumber != undefined || phonenumber != null || phonenumber != '') {
      this.callNumber.callNumber(phonenumber, true)
        .then(res => console.log('Launched dialer!', res))
        .catch(err => console.log('Error launching dialer', err));
    }
  }
}

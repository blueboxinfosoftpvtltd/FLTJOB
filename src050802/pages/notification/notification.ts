import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, Events, ModalController, Modal } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  fkPilotId: any;
  notification: any;
  notificationList: any;

  constructor(public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: AuthproviderProvider,
    public alertCtrl: AlertController,
    public app: App,
    public events: Events, public modalCtrl: ModalController) {

    this.events.subscribe('poprequest', res => {
      this.ionViewDidEnter();
    })

  }

  ionViewDidEnter() {
    this.storage.get('id').then((val) => {
      this.fkPilotId = val;
      console.log(this.fkPilotId);
      this.getNotication(this.fkPilotId);
    });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

  getNotication(fkPilotId) {
    this.provider.setloading();
    this.provider.getNotification(fkPilotId).subscribe(res => {
      console.log(res);
      this.notification = res;
      if (this.notification.data == null) {
        this.provider.dismissloading();
        this.presentAlert("Pilot", "No notifications found");
      } else {
        this.provider.dismissloading();
        this.notificationList = this.notification.data.Notification;
        console.log(this.notificationList);

      }
    })
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  requestpage(data) {
    console.log(data);
    this.app.getRootNav().push('RequestpagePage', { 'data': data, 'issearch': false, 'reqid': data.fkRequestId });
  }

  removeItem(nid) {

    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to delete ?",
      buttons: [
        {
          text: 'Cancle',
          handler: data => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.provider.setloading();
            this.provider.removenotification(this.fkPilotId, nid).subscribe(res => {
              console.log(res);
              this.notificationList = [];
              this.notification = res;
              if (this.notification.data == null) {
                this.provider.dismissloading();
                this.presentAlert("Pilot", "No notifications found");
              } else {
                this.provider.dismissloading();
                this.notificationList = this.notification.data.Notification;
                console.log(this.notificationList);

              }
            },
              err => this.provider.dismissloading())
          }
        }
      ]
    });
    prompt.present();

    console.log('delete call');
  }

  openprofile(data) {
    // e.stopPropagation();
    console.log(data);
    this.provider.setloading();
    this.provider.viewprofile(this.fkPilotId, data.oppositePilotId).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.modalCtrl.create("ProfilePage", { 'isedit': false }).present().then(() => {
        this.events.publish('userdata', res);
      });
    })
  }

}

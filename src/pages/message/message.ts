import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  msg: any;
  msgList: any;
  fkPilotId: any;
  chatroomid: any;
  constructor(public storage: Storage,
    public navCtrl: NavController,
    public navParams: NavParams,
    public provider: AuthproviderProvider,
    public alertCtrl: AlertController,
    public app: App,
    public socket: Socket,
    public events: Events) {


  }

  // get message list when page is load
  ionViewDidEnter() {
    this.storage.get('id').then((val) => {
      this.fkPilotId = val;
      console.log(this.fkPilotId);
      this.getRecentMsgList(this.fkPilotId);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
  }


  getRecentMsgList(fkPilotId) {
    this.provider.setloading();
    this.provider.getRecentMsgList(fkPilotId).subscribe(res => {
      console.log(res);
      this.msg = res;
      if (this.msg.data == null) {
        this.msgList = null;
        this.provider.dismissloading();
        this.presentAlert("Pilot", "No messages found");
      } else {
        this.msgList = this.msg.data.Messages;
        console.log(this.msgList);
        this.provider.setmsgread(fkPilotId).subscribe(res => {
          this.events.publish('mcount', "");
          this.provider.dismissloading();

        })
      }
    })
  }

  // display alert dialog
  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: "",
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

  // go to chat page to send text message or attachment
  chat(photo, id, name) {
    this.socket.connect();
    this.provider.setoppositeid(id);
    //this.chatroomid = this.fkPilotId + '' + id;
    this.socket.emit('set-nickname', 'pilot');
    this.app.getRootNav().push('ChatpagePage', { 'pkPilotId': id, 'PhotoPath': photo, 'PilotFname': name, 'ismessage': true, animate: false });
  }

  // method is call when remove message from message list
  removeItem(oid) {
    this.provider.setloading();
    console.log('delete call');
    this.provider.deletemessage(this.fkPilotId, oid).subscribe(res => {
      this.provider.dismissloading();
      this.successalert('Pilot', 'Conversation deleted successfully');
    })
  }

  // display alert dialog
  successalert(title, msg) {
    let alert = this.alertCtrl.create({
      title: "",
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
  ionViewWillLeave() {

  }
}

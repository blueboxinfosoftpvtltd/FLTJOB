import { Component, ViewChild, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController, Platform, Navbar, App } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Events, Content } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { File } from '@ionic-native/file';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
//import { Camera } from '@ionic-native/camera';
import { Modal, ModalController, ModalOptions } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Keyboard } from '@ionic-native/keyboard';
import * as moment from 'moment';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  CameraResultType
} from '@capacitor/core';

const { PushNotifications, LocalNotifications, Camera } = Plugins;
@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-chatpage',
  templateUrl: 'chatpage.html',
})
export class ChatpagePage {
  @ViewChild(Content) content: Content;
  @ViewChild(Navbar) navbar: Navbar;
  pkPilotId: any;
  msgList: any[] = [];
  msg: any;
  PilotLname: any;
  PilotFname: any;
  PhotoPath: any;
  oppositepilotid: any;
  loggedinpilotid: any;
  SendMessage: any;
  id: any;
  ismessage: any;
  data: any;
  pilotname: any;
  socketid: any;
  socketres: any;
  cdate: any;
  issend: boolean = false;
  entrydate: any;
  newoppositeid: any;
  pres: any;
  msgtype: boolean = false;
  oppositeid: any;
  mydate: string = new Date().toISOString();
  private ionapp: Element;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, public provider: AuthproviderProvider, public storage: Storage, private keyboard: Keyboard,
    private transfer: Transfer, public events: Events, private modal: ModalController, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, public socket: Socket, public app: App) {
    platform.ready().then(() => {

      // get current user login id
      this.storage.get('id').then(val => {
        this.id = val;
      })

      this.newoppositeid = this.navParams.get('oppositeid');
      this.oppositeid = this.provider.getoppositeid();
      if (this.oppositeid == undefined || this.oppositeid == null || this.oppositeid == "") {
        this.oppositeid = this.newoppositeid;
      }
      console.log(this.navParams.get('oppositeid'));
      this.provider.setoppositeid(this.oppositeid);
      this.socket.connect();
      this.socket.emit('set-nickname', 'pilot');
      // get live message through observble using socket.io
      this.getSendMessage().subscribe(message => {
        console.log(message);
        this.socketres = message;
        if (this.socketres.userid == this.id) {
          if (this.socketres.MessageType) {
            this.msgList.push({
              Message: this.socketres.Message.Message,
              EntryDate: this.socketres.EntryDate,
              IsDelete: false,
              IsReceive: false,
              IsSend: true,
              MessageType: this.socketres.MessageType,
            })
            console.log(this.msgList);
            this.scrollToBottom();
          }
          else {
            this.msgList.push({
              Message: this.socketres.Message,
              EntryDate: this.socketres.EntryDate,
              IsDelete: false,
              IsReceive: false,
              IsSend: true,
              MessageType: this.socketres.MessageType,
            })
            console.log(this.msgList);
            this.scrollToBottom();
          }
        }
        else if (this.socketres.touserid == this.id && this.socketres.userid == this.oppositeid) {
          if (this.socketres.MessageType) {
            this.msgList.push({
              Message: this.socketres.Message.Message,
              EntryDate: this.socketres.EntryDate,
              IsDelete: false,
              IsReceive: true,
              IsSend: false,
              MessageType: this.socketres.MessageType,
            })
            console.log(this.msgList);
            this.scrollToBottom();
          }
          else {
            this.msgList.push({
              Message: this.socketres.Message,
              EntryDate: this.socketres.EntryDate,
              IsDelete: false,
              IsReceive: true,
              IsSend: false,
              MessageType: this.socketres.MessageType,
            })
            console.log(this.msgList);
            this.scrollToBottom();
          }
        }
      })
      //this.keyboard.disableScroll(true);
      this.provider.setloading();
      this.data = this.navParams.get('data');
      console.log(this.data);
      this.ismessage = this.navParams.get('ismessage');
      console.log(this.ismessage);

      if (this.ismessage == true) {
        this.pkPilotId = this.navParams.get("pkPilotId");
        this.PhotoPath = this.navParams.get("PhotoPath");
        this.PilotFname = this.navParams.get("PilotFname");
        this.PilotLname = this.navParams.get("PilotLname");
        this.ismessage = this.navParams.get('ismessage');
        this.storage.get('id').then(val => {
          this.id = val;
          if (this.pkPilotId != undefined) {
            this.provider.getusermsgs(this.id, this.pkPilotId).subscribe(res => {
              console.log(res);
              this.msg = res;
              if (this.msg.data != null) {
                this.msgList = this.msg.data.Messages;
                this.provider.dismissloading();
                console.log(this.msgList);
                this.scrollToBottom();
              }
              else {
                this.provider.dismissloading();
              }

            })
          }

        })
      }
      else if (this.ismessage == false) {
        this.storage.get('id').then(val => {
          this.id = val;
          this.PilotFname = this.data.PilotFname;
          this.PilotLname = this.data.PilotLname;
          if (this.PilotFname == undefined && this.PilotLname == undefined) {
            this.PilotFname = this.data.oppositePilotName;
          }
          this.pkPilotId = this.id;
          this.PhotoPath = this.data.PhotoPath;
          if (this.PhotoPath == undefined) {
            this.PhotoPath = this.data.photoPath;
          }
          this.oppositepilotid = this.data.pkPilotId;
          if (this.oppositepilotid == undefined) {
            this.oppositepilotid = this.data.oppositePilotId;
          }
          this.ismessage = this.navParams.get('ismessage');

          if (this.pkPilotId != undefined) {
            this.provider.getusermsgs(this.pkPilotId, this.oppositepilotid).subscribe(res => {
              console.log(res);
              this.msg = res;
              if (this.msg.data != null) {
                this.msgList = this.msg.data.Messages;
                this.provider.dismissloading();
                console.log(this.msgList);
                this.scrollToBottom();
              }
              else {
                this.provider.dismissloading();
              }

            })
          }
        })
      }
      else if (this.newoppositeid != undefined) {
        this.storage.get('id').then(val => {
          this.id = val;
          this.provider.viewprofile(this.id, this.newoppositeid).subscribe(res => {
            this.pres = res;
            this.PhotoPath = this.pres.data.Pilot.PhotoPath;
            this.PilotFname = this.pres.data.Pilot.PilotFname;
            this.provider.getusermsgs(this.id, this.newoppositeid).subscribe(res => {
              console.log(res);
              this.msg = res;
              if (this.msg.data != null) {
                this.msgList = this.msg.data.Messages;
                this.provider.dismissloading();
                console.log(this.msgList);
                this.scrollToBottom();
              }
              else {
                this.provider.dismissloading();
              }

            })
          })
        })
      }

    })
  }


  // get send messagae using socket
  getSendMessage() {
    let observable = new Observable(observer => {
      this.socket.on('sendmessage', (data) => {
        observer.next(data);
      })
    })
    return observable;
  }


  ionViewDidEnter() {
    // create socket id between two users
    this.socket.connect();
    this.socket.emit('set-nickname', 'pilot');
    this.navbar.backButtonClick = () => {
      this.navCtrl.pop({ animate: false });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatpagePage');
  }

  // send message to user
  sendNewMsg(SendMessage) {

    var date = moment().format('YYYY-MM-DD[T]HH:mm:ss');

    if (this.SendMessage == undefined || this.SendMessage == '' || this.SendMessage == null) {
      //this.provider.dismissloading();
      let toast = this.toastCtrl.create({
        message: 'Message can not be empty',
        duration: 3000,
        position: 'top',
        dismissOnPageChange: true
      });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });

      toast.present();
    } else {
      this.msgtype = false;
      this.provider.setloading();
      if (this.ismessage == false) {
        if (this.newoppositeid != undefined) {
          this.oppositepilotid = this.newoppositeid;
        }

        this.socket.emit('add-message', { text: SendMessage, userid: this.id, touserid: this.oppositepilotid, date: date, msgtype: false });
        this.provider.sendNewMsg(SendMessage, this.id, this.oppositepilotid, 'false').subscribe(res => {
          console.log(res);
          this.provider.dismissloading();
          this.msg = res;
          this.scrollToBottom();
          this.SendMessage = '';
        })
      }
      else {
        console.log(this.id);
        console.log(moment().format('YYYY-MM-DD[T]HH:mm:ss'));

        if (this.newoppositeid != undefined) {
          this.pkPilotId = this.newoppositeid;
        }
        console.log(this.pkPilotId);
        this.socket.emit('add-message', { text: SendMessage, userid: this.id, touserid: this.pkPilotId, date: date, msgtype: false });
        this.provider.sendNewMsg(SendMessage, this.id, this.pkPilotId, 'false').subscribe(res => {
          console.log(res);
          this.provider.dismissloading();
          this.msg = res;
          this.scrollToBottom();
          this.SendMessage = '';
        })
      }

    }
  }

  // push message to msg array and scroll to bottom
  pushNewMsg(msg) {
    console.log(msg)
    if (this.ismessage == false) {
      const userId = this.id,
        toUserId = this.oppositepilotid;
      this.msgList.push(msg);
      this.scrollToBottom();
    }
    else {
      const userId = this.id,
        toUserId = this.pkPilotId;
      this.msgList.push(msg);
      this.scrollToBottom();
    }

  }


  // after page init get scroll to bottom
  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  // method is used for send attachemnt
  async SendAttachment() {
    var date = moment().format('YYYY-MM-DD[T]HH:mm:ss');
    console.log(this.id);
    console.log(this.oppositeid);
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.DataUrl
    });
    // image.webPath will contain a path that can be set as an image src. 
    // You can access the original file using image.path, which can be 
    // passed to the Filesystem API to read the raw data of the image, 
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    console.log(image);
    var imageUrl = image.dataUrl;
    let string = imageUrl.split(',');
    let img = string[1];
    this.msgtype = true;
    this.provider.setloading();
    this.provider.sendNewMsg(img, this.id, this.oppositeid, 'true').subscribe(res => {
      console.log(res);
      this.msg = res;
      this.socket.emit('add-message', { text: this.msg.data.Message, userid: this.id, touserid: this.oppositeid, date: date, msgtype: true });
      // this.pushNewMsg(this.msg.data.Message);
      this.SendMessage = '';
      this.provider.dismissloading();
    })

  }



  // open modal to view attachment

  openModal(image) {

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: true
    };

    const myModalData = {
      img: image
    };

    const myModal: Modal = this.modal.create('ChatimagemodalPage', { 'img': image }, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data) => {

    });

    myModal.onWillDismiss((data) => {

    });

  }

  // open profile page in modal controller
  openprofile() {

    this.provider.setloading();
    this.provider.viewprofile(this.id, this.oppositeid).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.modal.create("ProfilePage", { 'isedit': false }).present().then(() => {
        this.events.publish('userdata', res);
      });
    })
  }

  // set opposite id to null for notification
  ionViewWillLeave() {
    this.provider.setoppositeid("");
  }

}

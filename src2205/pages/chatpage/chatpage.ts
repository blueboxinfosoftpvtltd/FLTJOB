import { Component, ViewChild, animate } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, ActionSheetController, Platform, Navbar,App } from 'ionic-angular';
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
import {Keyboard} from '@ionic-native/keyboard';
import * as moment from 'moment';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  CameraResultType } from '@capacitor/core';

const { PushNotifications,LocalNotifications,Camera } = Plugins;
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
  oppositeid:any;
  mydate: string = new Date().toISOString();
  private ionapp: Element;
  constructor(public navCtrl: NavController, private toastCtrl: ToastController, public navParams: NavParams, public provider: AuthproviderProvider, public storage: Storage, private keyboard : Keyboard,
     private transfer: Transfer,public events:Events, private modal: ModalController, private file: File, private filePath: FilePath, public actionSheetCtrl: ActionSheetController, public platform: Platform, public socket: Socket,public app : App) {
      platform.ready().then(() => {
      // keyboard.onKeyboardShow().subscribe((e) => {
      //           app.setElementClass('keyboard', true); //set keyboard class on ion-app element
      //           let active: any = document.activeElement;
      //           if (active) {
      //               if ((platform.is('android') || platform.is('ios')) && e.keyboardHeight) {
      //                   this.ionapp = active.closest('.app-root');
      //                   this.ionapp.setAttribute('style', 'height: calc(100% - ' + e.keyboardHeight + 'px);');
      //               }
      //               if (active.scrollIntoViewIfNeeded) {
      //                   active.scrollIntoViewIfNeeded(true); //ensure input focus
      //               }
      //           }
      //       });
           
      //       keyboard.onKeyboardHide().subscribe((e) => {
      //           app.setElementClass('keyboard', false); //remove keyboard-showing-specific styles
      //           if (platform.is('ios') && this.ionapp) {
      //               this.ionapp.setAttribute('style', 'height: 100%;');
      //           }
      //       });
    this.newoppositeid = this.navParams.get('oppositeid');
    this.oppositeid = this.provider.getoppositeid();
    if(this.oppositeid == undefined || this.oppositeid == null || this.oppositeid == ""){
      this.oppositeid = this.newoppositeid;
    }
    console.log(this.navParams.get('oppositeid'));
    this.provider.setoppositeid(this.oppositeid);
    this.socket.connect();
    this.socket.emit('set-nickname', 'pilot');
    this.getSendMessage().subscribe(message => {
      console.log(message);
      this.socketres = message;
      if (this.socketres.userid == this.id) {
        this.msgList.push({
          Message: this.socketres.Message,
          EntryDate: this.socketres.EntryDate,
          IsDelete: false,
          IsReceive: false,
          IsSend: true,
          MessageType: false,
        })
        this.scrollToBottom();
      }
      else if (this.socketres.touserid == this.id && this.socketres.userid == this.oppositeid) {
        this.msgList.push({
          Message: this.socketres.Message,
          EntryDate: this.socketres.EntryDate,
          IsDelete: false,
          IsReceive: true,
          IsSend: false,
          MessageType: false,
        })
        this.scrollToBottom();
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
            //this.provider.setloading();  
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

  getSendMessage() {
    let observable = new Observable(observer => {
      this.socket.on('sendmessage', (data) => {
        observer.next(data);
      })
    })
    return observable;
  }

  ionViewDidEnter() {
    this.socket.connect();
    this.socket.emit('set-nickname', 'pilot');
    this.navbar.backButtonClick = () => {
      this.navCtrl.pop({ animate: false });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatpagePage');
  }

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
      this.provider.setloading();
      if (this.ismessage == false) {
        if (this.newoppositeid != undefined) {
          this.oppositepilotid = this.newoppositeid;
        }

        this.socket.emit('add-message', { text: SendMessage, userid: this.id, touserid: this.oppositepilotid, date: date });
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
        this.socket.emit('add-message', { text: SendMessage, userid: this.id, touserid: this.pkPilotId, date: date });
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

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  async SendAttachment() {

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

    this.provider.setloading();
    this.provider.sendNewMsg(img, this.loggedinpilotid, this.oppositepilotid, 'true').subscribe(res => {
        console.log(res);
        this.msg = res;
        this.pushNewMsg(this.msg.data.Message);
        this.SendMessage = '';
        this.provider.dismissloading();
      })
    // let actionSheet = this.actionSheetCtrl.create({
    //   buttons: [
    //     {
    //       text: 'Gallery',
    //       handler: () => {
    //         this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
    //       }
    //     },
    //     {
    //       text: 'Camera',
    //       handler: () => {
    //         this.takePicture(this.camera.PictureSourceType.CAMERA);
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel'
    //     }
    //   ]
    // });
    // actionSheet.present();
  }

  // public takePicture(sourceType) {
  //   // Create options for the Camera Dialog
  //   var options = {
  //     quality: 50,
  //     sourceType: sourceType,
  //     saveToPhotoAlbum: false,
  //     correctOrientation: true
  //   };

  //   // Get the data of an image
  //   this.camera.getPicture(options).then((imagePath) => {
  //     // Special handling for Android library
  //     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
  //       this.filePath.resolveNativePath(imagePath)
  //         .then(filePath => {
  //           let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
  //           let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
  //         });
  //     } else {
  //       var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
  //       var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
  //       console.log(currentName);
  //       console.log(correctPath);
  //       // this.userprofilepic= correctPath+currentName;
  //       console.log(correctPath + currentName);
  //       this.file.readAsDataURL(correctPath, currentName)
  //         .then(base64File => {
  //           console.log("here is encoded image ", base64File);
  //           // alert(base64File);
  //           console.log("splitarray" + base64File.split(','));
  //           let string = base64File.split(',');
  //           let img = string[1];
  //           console.log(img);
  //           this.provider.setloading();
  //           this.provider.sendNewMsg(img, this.loggedinpilotid, this.oppositepilotid, 'true').subscribe(res => {
  //             //  
  //             console.log(res);
  //             this.msg = res;
  //             this.pushNewMsg(this.msg.data.Message);
  //             this.SendMessage = '';
  //             this.provider.dismissloading();
  //           })

  //         })
  //         .catch(() => {
  //           this.provider.dismissloading();
  //           console.log('Error reading file');
  //         })
  //     }
  //   }, (err) => {
  //     this.presentToast('Error while selecting image.');
  //   });
  // }

  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

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
      console.log("I have dismissed.");
      console.log(data);
    });

    myModal.onWillDismiss((data) => {
      console.log("I'm about to dismiss");
      console.log(data);
    });

  }

  openprofile(){
    // e.stopPropagation();
     //console.log(data);
     this.provider.setloading();
     this.provider.viewprofile(this.id, this.oppositeid).subscribe(res => {
       console.log(res);
       this.provider.dismissloading();
       this.modal.create("ProfilePage", { 'isedit': false }).present().then(() => {
         this.events.publish('userdata', res);
       });
     })
   }


  ionViewWillLeave() {
    this.provider.setoppositeid("");
    //this.socket.disconnect();
  }

}

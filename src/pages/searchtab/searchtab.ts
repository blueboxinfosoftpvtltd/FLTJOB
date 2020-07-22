import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, Events, App, Searchbar } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Socket } from 'ng-socket-io';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the SearchtabPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-searchtab',
  templateUrl: 'searchtab.html',
})
export class SearchtabPage {
  //@ViewChild('searchbar') searchbar: Searchbar;
  searchdata: any;
  single: boolean = false;
  multiple: boolean = false;
  id: any;
  res: any;
  constructor(public navCtrl: NavController, public storage: Storage, public navParams: NavParams, public modalCtrl: ModalController, public events: Events, public app: App, public socket: Socket, public provider: AuthproviderProvider) {

    // get login id
    this.storage.get('id').then(val => {
      this.id = val;
    });

    // get users data from tabpage by using events
    this.events.subscribe('searchdata', res => {
      console.log(res);
      this.res = res;
      this.searchdata = res;

      this.events.publish('setfocus', true);

    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchtabPage');
  }

  // open profile component in modal controller
  openprofile(data) {
    console.log(data);
    this.provider.setloading();
    this.provider.viewprofile(this.id, data.pkPilotId).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.modalCtrl.create("ProfilePage", { 'isedit': false }).present().then(() => {
        this.events.publish('userdata', res);
      });
    })
  }

  // method to open request page
  openchatpage(data) {
    this.app.getRootNav().push('RequestpagePage', { "data": data, 'issearch': true });
  }

  // click on chat icon to open chat page
  chat(pkPilotId, PhotoPath, PilotFname, PilotLname) {
    console.log(pkPilotId)
    this.provider.setoppositeid(pkPilotId);
    this.socket.connect();
    this.socket.emit('set-nickname', 'pilot');
    this.app.getRootNav().push('ChatpagePage', { 'pkPilotId': pkPilotId, 'PhotoPath': PhotoPath, 'PilotFname': PilotFname, 'PilotLname': PilotLname, animate: false, 'ismessage': true });
  }

}

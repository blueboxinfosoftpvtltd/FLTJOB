import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ModalController, Events,AlertController } from 'ionic-angular';
import {AuthproviderProvider} from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the FavuserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favuser',
  templateUrl: 'favuser.html',
})
export class FavuserPage {
  favuserlist: any;
  id:any;
  res:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public provider : AuthproviderProvider,
    public modalCtrl: ModalController, public events: Events, public storage:Storage,public alertCtrl: AlertController) {
      this.storage.get('id').then(val => {
        this.id = val;
        this.GetFavUser();
      });
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavuserPage');
  }


  GetFavUser(){
    this.provider.setloading();
       this.provider.getfavuser(this.id).subscribe(res => {
         console.log(res);
         this.res = res;
         if(this.res.datas != null){
         this.favuserlist = this.res.datas.favourites;
         this.provider.dismissloading();
         }
         else{
          this.provider.dismissloading();
          this.presentAlert("Pilot", "No records found");
         }
         
       })  
  }

  GoToProfile(favuserid){
      // e.stopPropagation();
       console.log(favuserid);
       this.provider.setloading();
       this.provider.viewprofile(this.id, favuserid).subscribe(res => {
         console.log(res);
         this.provider.dismissloading();
         this.modalCtrl.create("ProfilePage", { 'isedit': false }).present().then(() => {
           this.events.publish('userdata', res);
         });
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
}

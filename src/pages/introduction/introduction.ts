import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the IntroductionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-introduction',
  templateUrl: 'introduction.html',
})
export class IntroductionPage {

  slidename: any;
  user:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

    // it will display slides as user take action
    this.slidename = this.navParams.get("slidename");
    if(this.navParams.get('user')){
      this.user = this.navParams.get('user');
    }
    if (this.slidename == "login") {
      this.slidename = "./assets/imgs/1st.png";
    }
    if (this.slidename == "profile") {
      this.slidename = "./assets/imgs/3rd.png";
    }
    if (this.slidename == "profile1") {
      this.slidename = "./assets/imgs/4th.png";
    }
    if (this.slidename == "login1") {
      this.slidename = "./assets/imgs/2ndup.png";
    }
    if (this.slidename == "login5") {
      this.slidename = "./assets/imgs/5th.png";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
  }

  back() {
    // hide manage availability slide to owner operator
    if (this.slidename == "./assets/imgs/2ndup.png" && this.user !== 'Owner Operator') {
      this.navCtrl.pop().then(() => {
        let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login5" });
        profileModal.present();
      })
    }
    else {
      this.navCtrl.pop();
    }
  }

}

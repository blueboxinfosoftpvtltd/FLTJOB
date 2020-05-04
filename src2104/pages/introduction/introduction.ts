import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  slidename:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.slidename = this.navParams.get("slidename");
    if(this.slidename == "login"){
      this.slidename = "./assets/imgs/1st.png";
    }
    if(this.slidename == "profile"){
      this.slidename = "./assets/imgs/3rd.png";
    }
    if(this.slidename == "profile1"){
      this.slidename = "./assets/imgs/4th.png";
    }
    if(this.slidename == "login1"){
      this.slidename = "./assets/imgs/2nd.png";
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntroductionPage');
  }

  back(){
    this.navCtrl.pop();
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ChatimagemodalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chatimagemodal',
  templateUrl: 'chatimagemodal.html',
})
export class ChatimagemodalPage {
  img: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private view: ViewController) {
  }

  // get image 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatimagemodalPage');
    this.img = this.navParams.get('img');
  }


  // close open modal
  closeModal() {
    const data = {
      name: 'John Doe',
      occupation: 'Milkman'
    };
    this.view.dismiss(data);

  }
}

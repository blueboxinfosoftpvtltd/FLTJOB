import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController  } from 'ionic-angular';

/**
 * Generated class for the Calendarmodal1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-calendarmodal1',
  templateUrl: 'calendarmodal1.html',
})
export class Calendarmodal1Page {

  constructor(public navCtrl: NavController, public navParams: NavParams,private view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Calendarmodal1Page');
  }

  dateSelected(day){
    console.log(day);
    this.closeModal(day);
  }

  closeModal(day) {
    const data = {
      date:day
    };
    this.view.dismiss({ data: day });
  }


}

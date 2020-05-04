import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';

declare var jQuery: any;
declare var $: any;
@IonicPage()
@Component({
  selector: 'page-userratting',
  templateUrl: 'userratting.html',
})
export class UserrattingPage {
  id: any;
  ratingcount: any;
  comment: any;
  tripid: any;
  oppositeid: any;
  getcomment: any;
  getrating: any;
  res: any;
  rate: any;
  @ViewChild('myInput') myInput: ElementRef;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public provider: AuthproviderProvider, public storage: Storage, public alertCtrl: AlertController) {
    this.storage.get('id').then(val => {
      this.id = val;
      console.log(this.id);
      this.tripid = navParams.get('tripid');
      this.oppositeid = navParams.get('oppositeid');
      this.comment = navParams.get('comment');
      this.rate = navParams.get('rating');
      var that = this;
      jQuery(function () {


        jQuery("#rateYo1").rateYo({
          starWidth: "40px",
          halfStar: true,
          spacing: "13px",
          rating: that.rate
        })
          .on("rateyo.change", function (e, data) {

            that.ratingcount = data.rating;
            jQuery(this).next().text(that.ratingcount);
            console.log(that.ratingcount);
          });

      });

    })

  }

  logRatingChange(rating){
    this.ratingcount = rating;
    console.log(this.ratingcount);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserrattingPage');
  }

  // onModelChange(star) {
  //   this.ratingcount = star;
  // }

  SubmitReview() {
    this.provider.setloading();
    this.provider.insertratingcomment(this.tripid, this.id, this.oppositeid, this.comment, this.ratingcount).subscribe(res => {
      this.res = res;
      if (this.res.Code == 200) {
        this.provider.dismissloading();
        this.successalert('Pilot', 'Rating and comment done');
      }
      else {
        this.provider.dismissloading();
      }
    })
  }

  successalert(title, msg) {
    let alert = this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }
}

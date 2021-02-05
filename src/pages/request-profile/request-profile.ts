import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';

/**
 * Generated class for the RequestProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-request-profile',
  templateUrl: 'request-profile.html',
})
export class RequestProfilePage {

  senderData: any;
  response: any;
  senderId: any;
  senderImage: any;
  senderFirstName: any;
  senderLastName: any;
  senderMidName: any;
  senderMemberType: any;
  senderGender: any;
  senderCompenyName: any;
  senderLangaugeSpoken: any;
  senderContinent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private provider: AuthproviderProvider) {
    this.senderId = this.provider.senderID;
    this.provider.viewprofile("", this.senderId).subscribe(res => {
      this.response = res;

      if(this.response.data != null){
        this.senderData = this.response.data.Pilot;
        this.senderFirstName = this.senderData.PilotFname;
        this.senderMidName = this.senderData.PilotMname;
        this.senderLastName = this.senderData.PilotLname;
        this.senderMemberType = this.senderData.MemberShipType;
        this.senderCompenyName = this.senderData.CompanyName;
        this.senderGender = this.senderData.EmailId;
        this.senderImage = this.senderData.PhotoPath;
        this.senderLangaugeSpoken = this.senderData.LanguagesSpoken;
        this.senderContinent = this.senderData.Continent;
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RequestProfilePage');
  }

}

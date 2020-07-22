import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the AvionicsexpselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-avionicsexpselect',
  templateUrl: 'avionicsexpselect.html',
})
export class AvionicsexpselectPage {

  @ViewChild('navbar') navBar: Navbar;
  avionicsdata: any;
  listavionicsdata: any;
  name: any;
  avname:any;
  avtempdata:any;
  listav:any[]=[];
  selectedav:any[]=[];
  selectedavname:any[]=[];
  avreturn:any;
  public date: string = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events, public provider: AuthproviderProvider) {

    this.provider.setloading();

  }
  ionViewDidEnter() {
    var avionicsdata = this.provider.getmasterdata();
    this.avionicsdata = avionicsdata.data.AvionicsExperience;
    this.avname = this.navParams.get('selectedav');
    this.avtempdata = this.avionicsdata; 
    this.provider.dismissloading();
    //this.avionicsdata = this.navParams.get('avionicsdata');
    console.log(this.avionicsdata);
    this.navBar.backButtonClick = () => {
      //this.navCtrl.pop();
    
        for (let i = 0; i < this.avtempdata.length; i++) {
          if (this.avtempdata[i].checked == true) {
            this.listav.push(this.avtempdata[i]);
            console.log('aircraftlist' + this.listav);
          }
        }
        if (this.listav !== undefined) {
          for (let i = 0; i < this.listav.length; i++) {
            if (this.listav[i].checked == true) {
              this.selectedav.push(this.listav[i].pkAvoinicsExp);
              this.selectedavname.push(this.listav[i].AvionicsExperienceType);
              this.avreturn = this.selectedavname.join();
            }
          }
          console.log(this.avreturn);
          if (this.selectedav.length > 0) {
            this.event.publish('selectav', this.avreturn);
          }
          else {
            this.event.publish('selectav', "");
          }

          this.navCtrl.pop({ animate: false });
          console.log('back done');
        }


      
    };

  }

  // checkboxselectav(data, event) {
  //   if (event.checked == false) {
  //     this.avionicsdata.splice(data);
    
  //   }
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectaircraftPage');
  }
  listselect(avionicsname, id) {
    this.name = avionicsname;
    this.event.publish('avionicsselecteddata', [this.name, id]);
    this.navCtrl.pop();
    console.log('back done');
  }

}

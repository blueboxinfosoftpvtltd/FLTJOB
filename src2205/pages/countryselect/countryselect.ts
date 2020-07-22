import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the CountryselectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-countryselect',
  templateUrl: 'countryselect.html',
})
export class CountryselectPage {

  @ViewChild('navbar') navBar: Navbar;
  countrydata: any;
  selectedcountry: any;
  listcountry: any[] = [];
  selecteddata: string[] = [];
  selectedcountryname: string[] = [];
  issingle: any;
  tempcountry: any;
  public date: string = new Date().toISOString();
  countryname: any;
  searchcode: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events, public provider: AuthproviderProvider) {
    this.provider.setloading();
  }

  onInput() {
    if (this.searchcode.toString().length >= 2) {
      this.countrydata = this.countrydata.filter((item) => {
        console.log(this.searchcode);
        return item.CountryName.indexOf(this.searchcode) > -1;
      });
    }
    else if (this.searchcode.toString().length < 2) {
      this.countrydata = this.tempcountry;
    }
  }

  onCancel() {
    console.log('call cancel');
  }

  ionViewDidEnter() {
    var country = this.provider.getmasterdata();
    this.countrydata = country.data.Countries;
    this.tempcountry = this.countrydata;
    //this.countrydata = this.navParams.get('countrydata');
    this.selectedcountry = this.navParams.get('selectedcountry');
    this.issingle = this.navParams.get('issingle');
    console.log(this.countrydata);
    this.provider.dismissloading();
    this.navBar.backButtonClick = () => {
      this.selecteddata = [];
      for (let i = 0; i < this.tempcountry.length; i++) {
        if (this.tempcountry[i].checked == true) {
          this.listcountry.push(this.tempcountry[i]);
        }
      }
      if (this.listcountry !== undefined) {
        for (let i = 0; i < this.listcountry.length; i++) {
          if (this.listcountry[i].checked == true) {
            this.selecteddata.push(this.listcountry[i].pkCountryId);
            this.selectedcountryname.push(this.listcountry[i].CountryName);
            this.countryname = this.selectedcountryname.join();
            console.log(this.countryname);
          }
        }
        if (this.selecteddata.length > 0) {
          this.event.publish('countrydata', this.countryname);
        }
        else {
          this.event.publish('countrydata', "");
        }

      }
      //console.log(this.selecteddata.length);
      this.navCtrl.pop();
      console.log('back done');
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectaircraftPage');
  }

  checkboxselect(data, event) {
    if (event.checked == false) {
      this.listcountry.splice(data);
      console.log(this.listcountry);
    }
    //this.listcountry = <Array<any>>(<Object>this.countrydata);

  }

  listselect(name, code) {
    this.event.publish('countryname', [name, code]);
    this.navCtrl.pop();
  }
}

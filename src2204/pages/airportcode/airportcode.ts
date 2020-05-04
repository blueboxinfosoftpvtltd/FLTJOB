import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { ViewChild } from '@angular/core';
/**
 * Generated class for the AirportcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-airportcode',
  templateUrl: 'airportcode.html',
})
export class AirportcodePage {
  @ViewChild('navbar') navBar: Navbar;
  airportcodes: any;
  totalcount: any;
  count: any;
  res: any;
  res1: any;
  category: any;
  enrouteairport: any[] = [];
  enrouteairportcodelist: any[] = [];
  selectedaiportcode: string[] = [];
  codertn: any;
  searchcode: any;
  moreairportcode: any[] = [];
  i: any;
  searchdata: boolean = false;
  tempairportcode: any[] = [];
  airportcodes1: any;
  enrouteairportcodelist2: any[] = [];
  enrouteairportcodelist3: any;
  newarray: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: AuthproviderProvider, public events: Events) {

    this.airportcodes = this.navParams.get('codedata');
    this.totalcount = this.airportcodes.TotalCount;
    this.airportcodes = this.airportcodes.data.AirportCode;
    console.log(this.airportcodes);
    // this.enrouteairportcodelist3 = localStorage.getItem("enrouteairportcodelist");
    // // console.log(this.enrouteairportcodelist3);
    // if (this.enrouteairportcodelist3 != null) {
    //   this.enrouteairportcodelist2 = JSON.parse(this.enrouteairportcodelist3);
    //   localStorage.setItem("enrouteairportcodelist1", JSON.stringify(this.enrouteairportcodelist2));
    // }

    this.count = this.navParams.get('count');
    this.category = this.navParams.get('category');

    // if (this.enrouteairportcodelist2 == null) {
    //   this.enrouteairportcodelist2 = [];
    // }

    // // this.airportcodes1 = this.airportcodes.data.AirportCode;
    // this.airportcodes = this.enrouteairportcodelist2.concat(this.airportcodes.data.AirportCode);
    // var uniq = {}
    // this.airportcodes = this.airportcodes.filter(obj => !uniq[obj.pkAirportcodeId] && (uniq[obj.pkAirportcodeId] = true));
    // //this.airportcodes = this.airportcodes.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AirportcodePage');
  }

  doInfinite(infiniteScroll) {
    this.i = this.count;
    this.count = parseInt(this.count) + 500;

    setTimeout(() => {
      if (this.count <= this.totalcount) {
        this.provider.getAirportCode(this.count)
          .subscribe(
            res => {
              this.res = res;
              var aircode = this.res.data.AirportCode;
              for (let i = this.i; i < this.res.data.AirportCode.length; i++) {
                this.moreairportcode.push(this.res.data.AirportCode[i]);
              }
              this.airportcodes = this.moreairportcode;
              infiniteScroll.complete();
            })
      }

      console.log('Async operation has ended');

    }, 10000);
  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {

      if (this.airportcodes !== undefined) {
        for (let i = 0; i < this.airportcodes.length; i++) {
          if (this.airportcodes[i].checked == true) {
            this.selectedaiportcode.push(this.airportcodes[i].AirportCode);
            this.codertn = this.selectedaiportcode.join();
          }
        }
        if (this.selectedaiportcode.length > 0) {
          this.events.publish('enroute', this.codertn);
        }
        else {
          this.events.publish('enroute', "");
        }
      }

      this.navCtrl.pop();
      console.log('back done');
    };

  }

  checkboxselect(data, event) {

    // if (event.checked == true) {
    //       this.enrouteairportcodelist.push(data);
    //     }
    //     else {
    //       this.enrouteairportcodelist.splice(data);
    //     }
    //     console.log(this.enrouteairportcodelist);
    // this.enrouteairportcodelist = <Array<any>>(<Object>this.airportcodes);
    // console.log(data)
    // this.enrouteairport.push(data);
    // // console.log(this.enrouteairportcodelist);
    // console.log(this.enrouteairport);



    //   this.enrouteairportcodelist3 = localStorage.getItem("enrouteairportcodelist1");

    //   if(this.enrouteairportcodelist3 != null){
    //     this.enrouteairportcodelist2  = JSON.parse(this.enrouteairportcodelist3);
    //     this.enrouteairport = this.enrouteairport.concat(this.enrouteairportcodelist2);
    //   }
    //  console.log(this.enrouteairport);


    //   localStorage.removeItem("enrouteairportcodelist1");
    //   var uniq = {};
    //   this.enrouteairport =  this.enrouteairport.filter(obj => !uniq[obj.pkAirportcodeId] && obj.checked == true);
    //   console.log(this.enrouteairport);

    console.log(this.enrouteairport);

    // this.enrouteairportcodelist3 = localStorage.getItem("enrouteairportcodelist");
    // this.enrouteairportcodelist2  = JSON.parse(this.enrouteairportcodelist3);
    localStorage.setItem("enrouteairportcodelist", JSON.stringify(this.enrouteairport));




  }

  listselect(code, id) {
    if (this.category == 'departure') {
      this.events.publish('departureairportcode', code);
      this.navCtrl.pop();
    }
    else if (this.category == 'enroute') {

    }
    else if (this.category == 'destination') {
      this.events.publish('destinationairportcode', code);
      this.navCtrl.pop();
    }

  }

  getItems(event) {
    if (this.searchcode.toString().length >= 2) {
      this.searchdata = true;
      this.provider.searchairportcode(this.searchcode).subscribe(res => {
        console.log(res);
        this.res1 = res
        if (this.res1.data != null) {
          this.airportcodes = res;
          this.airportcodes = this.airportcodes.data.AirportCode;
          this.tempairportcode = this.airportcodes;
          console.log(this.tempairportcode)

        }
        this.searchdata = false;
      })
    }
    else {
      this.airportcodes = this.tempairportcode;
    }

  }
}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, AlertController, ModalController, Avatar } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage'
declare var jQuery: any;
import { ViewChild } from '@angular/core';
/**
 * Generated class for the FiltercaptainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtercaptain',
  templateUrl: 'filtercaptain.html',
})
export class FiltercaptainPage {
  dummyJson = {

    mclass: [
      { description: '1' },
      { description: '2' },
      { description: '3' }
    ]
  }
  @ViewChild('navbar') navBar: Navbar;
  totaltime: any;
  totaltimetype: any;
  pictime: any;
  pictimetype: any;
  mclass: any;
  validpassyes: boolean = false;
  validpassno: boolean = false;
  ratingc: any;
  ratinga: any;
  continents: any;
  mstrainingyes: boolean = false;
  mstrainingno: boolean = false;
  id: any;
  tripid: any;
  havepasssport: any;
  ratingcertificate: string[] = [];
  ratingcer: any;
  rate: any;
  smtrain: boolean = false;
  aircraftname: any;
  filtercaptainstep: any;
  filtercaptainstep1: any;
  filtercaptainstep2: any;
  filtercaptainstep3: any;
  filtercaptainstep4: any;
  button1Color: any;
  button2Color: any;
  button3Color: any;
  button4Color: any;
  txt1color: any;
  txt2color: any;
  txt3color: any;
  txt4color: any;
  continentlist: any;
  pilotlist: any;
  errormessage: any;
  filterpilotdata: boolean = false;;
  scommand: any;
  fatt: any;
  fins: any;
  allcaptain: any;
  favcaptain: any;
  avlcaptain: any;
  captain: boolean = false;
  showfinishsc: any;
  showfinishfa: any;
  showfinishfi: any;
  pkid: any;
  selectpilot: any;
  pilotid: string[] = [];
  usertype: any;
  res: any;
  fns_sh: any;
  fns_shno: number;
  dispdata: boolean = true;
  title: any;
  oceexp: any;
  ocienselist: any;
  selectedociens: any;
  ratingcount: any;
  isall: any;
  isavl: any;
  isfav: any;
  isallavl: any;
  isavlfav: any;
  isfavall: any;
  isnearest:number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, public storage: Storage, public modalCtrl: ModalController) {


    var that = this;
    jQuery(function () {


      jQuery("#rateYofiltercaptain").rateYo({
        starWidth: "27px",
        halfStar: true,
        spacing: "7px",
      })
        .on("rateyo.change", function (e, data) {

          that.ratingcount = data.rating;
          jQuery(this).next().text(that.ratingcount);
          console.log(that.ratingcount);
        });

    });

    this.events.subscribe('oceansdata', val => {
      if (val == undefined) {
        this.selectedociens = "";
      }
      else {
        this.selectedociens = val;
      }
    })
    this.storage.get('usertype').then(val => {
      this.usertype = val;
      console.log(this.usertype);
    })
    this.provider.getContinents().subscribe(res => {
      this.ocienselist = res;
      this.ocienselist = this.ocienselist.continents.oceansdata;
    });
    this.provider.getContinents().subscribe(res => {
      this.continentlist = res;
      this.continentlist = this.continentlist.continents.continentdata;
    });
    this.title = 'Required Experience';
    this.id = this.navParams.get('id');
    this.tripid = this.navParams.get('tripid');
    this.aircraftname = this.navParams.get('aircraftname');
    this.scommand = navParams.get('scommand');
    this.fatt = navParams.get('fatt');
    this.fins = navParams.get('fins');
    this.oceexp = navParams.get('oce');
    if (this.scommand == undefined || this.scommand == false) {
      this.showfinishsc = false;
    }
    else if (this.scommand == true) {
      this.showfinishsc = true;
    }
    if (this.fatt == undefined || this.fatt == false) {
      this.showfinishfa = false;
    }
    else if (this.fatt == true) {
      this.showfinishfa = true;
    }
    if (this.fins == undefined || this.fins == false) {
      this.showfinishfi = false;
    }
    else if (this.fins == true) {
      this.showfinishfi = true;
    }
    // this.captain = true;
    this.filtercaptainstep = '1';
    this.filtercaptainstep1 = '1';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';
    console.log(this.scommand);
    console.log(this.fatt);
    console.log(this.fins);
    console.log(this.filter);
    console.log(this.filtercaptainstep);
    this.mclass = this.dummyJson.mclass[0].description;
    this.events.subscribe('continentdata', res => {
      if (res == undefined) {
        this.continents = "";
      }
      else {
        this.continents = res;
      }


    })
  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      console.log(this.filtercaptainstep);

      this.filtercaptainstep = this.filtercaptainstep - 1;

      if (this.filtercaptainstep >= "1") {
        if (this.filtercaptainstep == '1') {
          var that = this;
          jQuery(function () {


            jQuery("#rateYofiltercaptain").rateYo({
              starWidth: "27px",
              halfStar: true,
              spacing: "7px",
              rating: that.ratingcount,
            })
              .on("rateyo.change", function (e, data) {

                that.ratingcount = data.rating;
                jQuery(this).next().text(that.ratingcount);
                console.log(that.ratingcount);
              });

          });

          this.title = 'Required Experience';
          this.button1Color = '#fff';
          this.button2Color = '#000';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#000';
          this.txt2color = '#fff';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filtercaptainstep == '2') {
          this.title = 'Day Rate';
          this.button1Color = '#000';
          this.button2Color = '#fff';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#000';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filtercaptainstep == '3') {
          this.title = 'Search by';
          this.button1Color = '#000';
          this.button2Color = '#000';
          this.button3Color = '#fff';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#fff';
          this.txt3color = '#000';
          this.txt4color = '#fff';
        }
        else if (this.filtercaptainstep == '4') {
          this.title = 'Results';
          this.button1Color = '#000';
          this.button2Color = '#000';
          this.button3Color = '#000';
          this.button4Color = '#fff';
          this.txt1color = '#fff';
          this.txt2color = '#fff';
          this.txt3color = '#fff';
          this.txt4color = '#000';
        }
      }
      else {
        this.navCtrl.pop();
      }
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltercaptainPage');
  }

  openpicker() {
    this.selector.show({
      title: "",
      items: [
        this.dummyJson.mclass
      ],
      defaultItems: [
        { index: 0, value: this.dummyJson.mclass[0].description }
      ],
    }).then(
      result => {
        console.log(result[0].description + ' at index: ' + result[0].index);
        this.mclass = result[0].description;

      },
      err => console.log('Error: ', err)
    );
  }
  cheboxcheck(op, event) {
    if (op == 'msy') {
      if (event.checked == true) {
        this.mstrainingno = false;
        this.mstrainingyes = true;
      }
      else {
        this.mstrainingno = true;
        this.mstrainingyes = false;
      }
    }
    else if (op == 'msn') {
      if (event.checked == true) {
        this.mstrainingno = true;
        this.mstrainingyes = false;
      } else {
        this.mstrainingno = false;
        this.mstrainingyes = true;
      }
    }

    else if (op == 'vpy') {
      if (event.checked == true) {
        this.validpassno = false;
        this.validpassyes = true;
      }
      else {
        this.validpassno = true;
        this.validpassyes = false;
      }
    }
    else if (op == 'vpn') {
      if (event.checked == true) {
        this.validpassno = true;
        this.validpassyes = false;
      }
      else {
        this.validpassno = false;
        this.validpassyes = true;
      }
    }
  }

  selectcontinents() {
    this.navCtrl.push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.continents, animate: false });
  }

  filter() {
    if (this.favcaptain == undefined || this.favcaptain == false ) {
      this.favcaptain = 0
    }
    if (this.allcaptain == undefined || this.allcaptain == false) {
      this.allcaptain = 0
    }
    if (this.avlcaptain == undefined || this.avlcaptain == false) {
      this.avlcaptain = 0
    }
    if (this.favcaptain == true ) {
      this.favcaptain = 1
    }
    if (this.allcaptain == true) {
      this.allcaptain = 1
    }
    if (this.avlcaptain == true) {
      this.avlcaptain = 1
    }

    if (this.favcaptain == false && this.allcaptain == false && this.avlcaptain == false) {
      let alert = this.alertCtrl.create({
        title: "Pilot",
        message: "Please select atleast one option",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.ionViewDidEnter();
            }
          }
        ]
      });
      alert.present();
    }
    else if (this.favcaptain == undefined && this.allcaptain == undefined && this.avlcaptain == undefined) {
      let alert = this.alertCtrl.create({
        title: "Pilot",
        message: "Please select atleast one option",
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.ionViewDidEnter();
            }
          }
        ]
      });
      alert.present();
    }

    else {
      // if (this.allcaptain == true && this.favcaptain == false && this.avlcaptain == false) {
      //   this.isall = true;
      //   this.isfav = false;
      //   this.isavl = false;
      //   this.isfavall = false;
      //   this.isavlfav = false;
      //   this.isallavl = false;
      // }
      // else if (this.allcaptain == false && this.favcaptain == true && this.avlcaptain == false) {
      //   this.isall = false;
      //   this.isfav = true;
      //   this.isavl = false;
      //   this.isfavall = false;
      //   this.isavlfav = false;
      //   this.isallavl = false;
      // }
      // else if (this.allcaptain == false && this.favcaptain == false && this.avlcaptain == true) {
      //   this.isall = false;
      //   this.isfav = false;
      //   this.isavl = true;
      //   this.isfavall = false;
      //   this.isavlfav = false;
      //   this.isallavl = false;
      // }
      // else if (this.allcaptain == true && this.favcaptain == true && this.avlcaptain == false) {
      //   this.isall = false;
      //   this.isfav = false;
      //   this.isavl = false;
      //   this.isfavall = true;
      //   this.isavlfav = false;
      //   this.isallavl = false;
      // }
      // else if (this.allcaptain == false && this.favcaptain == true && this.avlcaptain == true) {
      //   this.isall = false;
      //   this.isfav = false;
      //   this.isavl = false;
      //   this.isfavall = false;
      //   this.isavlfav = true;
      //   this.isallavl = false;
      // }
      // else if (this.allcaptain == true && this.favcaptain == false && this.avlcaptain == true) {
      //   this.isall = false;
      //   this.isfav = false;
      //   this.isavl = false;
      //   this.isfavall = false;
      //   this.isavlfav = false;
      //   this.isallavl = true;
      // }
      this.title = 'Results';
      this.provider.setloading();
      this.fns_shno = 0;
      this.fns_sh = "";
      this.filtercaptainstep = '4';
      this.filtercaptainstep1 = '1';
      this.filtercaptainstep2 = '2';
      this.filtercaptainstep3 = '3';
      this.filtercaptainstep4 = '4';
      this.button1Color = '#000';
      this.button2Color = '#000';
      this.button3Color = '#000';
      this.button4Color = '#fff';
      this.txt1color = '#fff';
      this.txt2color = '#fff';
      this.txt3color = '#fff';
      this.txt4color = '#000';
      this.ratingcertificate = [];
      if (this.validpassno == true) {
        this.havepasssport = false;
      }
      else if (this.validpassyes == true) {
        this.havepasssport = true;
      }
      if (this.mstrainingno == true) {
        this.smtrain = false;
      }
      else if (this.mstrainingyes == true) {
        this.smtrain = true;
      }
      if (this.ratingc == true) {
        this.ratingcertificate.push('Commercial');
        this.ratingcer = this.ratingcertificate.join();
      }
      if (this.ratinga == true) {
        this.ratingcertificate.push('ATP')
        this.ratingcer = this.ratingcertificate.join();

      }
      this.provider.filtercaptain(this.id, this.totaltime, this.totaltimetype, this.pictime, this.pictimetype, this.mclass, this.havepasssport, this.ratingcer, this.aircraftname, this.continents, this.smtrain, this.tripid, this.rate, this.selectedociens, this.ratingcount,this.isnearest,this.favcaptain,1).subscribe(res => {

        if (this.showfinishsc == true) {
          this.fns_shno = this.fns_shno + 1;
        }
        if (this.showfinishfa == true) {
          this.fns_shno = this.fns_shno + 1;
        }
        if (this.showfinishfi == true) {
          this.fns_shno = this.fns_shno + 1;
        }

        console.log(res);
        this.res = res;

        if (this.res.Code == 200) {
          if (this.res.data.Pilots == null || this.res.data == null) {
            this.dispdata = false;
            if (this.fns_shno == 0) {
              this.fns_sh = '_finish'
            }
            else if (this.fns_shno > 0) {
              this.fns_sh = '_next'
            }

          }
          else if (this.res.data != null) {
            this.dispdata = true;
            this.pilotlist = this.res.data.Pilots;
            if (this.fns_shno >= 0) {
              this.fns_sh = '_send'
            }
          }
          console.log(this.filterpilotdata);
          this.provider.dismissloading();
        }
        else if (this.res.Code == 400) {
          this.provider.dismissloading();
        }
      })
    }
  }



  save1() {

    if (this.totaltime == undefined) {
      this.errormessage = "Please enter total time"
      this.showAlert();
    }
    else {
      this.title = 'Day Rate';
      this.filtercaptainstep1 = '1';
      this.filtercaptainstep2 = '2';
      this.filtercaptainstep = '2';
      this.button1Color = '#000';
      this.button2Color = '#fff';
      this.button3Color = '#000';
      this.button4Color = '#000';
      this.txt1color = '#fff';
      this.txt2color = '#000';
      this.txt3color = '#fff';
      this.txt4color = '#fff';
    }


  }

  save2() {
    if (this.rate == undefined) {
      this.errormessage = "Please enter rate"
      this.showAlert();
    }
    else {
      this.title = 'Search by';
      this.filtercaptainstep1 = '1';
      this.filtercaptainstep2 = '2';
      this.filtercaptainstep3 = '3';
      this.filtercaptainstep = '3';
      this.button1Color = '#000';
      this.button2Color = '#000';
      this.button3Color = '#fff';
      this.button4Color = '#000';
      this.txt1color = '#fff';
      this.txt2color = '#fff';
      this.txt3color = '#000';
      this.txt4color = '#fff';
    }

  }

  changefilter() {
    var that = this;
    jQuery(function () {


      jQuery("#rateYofiltercaptain").rateYo({
        starWidth: "27px",
        halfStar: true,
        spacing: "7px",
        rating: that.ratingcount,
      })
        .on("rateyo.change", function (e, data) {

          that.ratingcount = data.rating;
          jQuery(this).next().text(that.ratingcount);
          console.log(that.ratingcount);
        });

    });
    this.filtercaptainstep = '1';
    this.filtercaptainstep1 = '1';
    this.filtercaptainstep2 = '2';
    this.filtercaptainstep3 = '3';
    this.filtercaptainstep4 = '4';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';
  }
  activestep(op) {
    this.filtercaptainstep = op;

    if (op == '1') {
      var that = this;
      jQuery(function () {


        jQuery("#rateYofiltercaptain").rateYo({
          starWidth: "27px",
          halfStar: true,
          spacing: "7px",
          rating: that.ratingcount,
        })
          .on("rateyo.change", function (e, data) {

            that.ratingcount = data.rating;
            jQuery(this).next().text(that.ratingcount);
            console.log(that.ratingcount);
          });

      });

      this.title = 'Required Experience';
      this.button1Color = '#fff';
      this.button2Color = '#000';
      this.button3Color = '#000';
      this.button4Color = '#000';
      this.txt1color = '#000';
      this.txt2color = '#fff';
      this.txt3color = '#fff';
      this.txt4color = '#fff';
    }
    else if (op == '2') {
      this.title = 'Day Rate';
      this.button1Color = '#000';
      this.button2Color = '#fff';
      this.button3Color = '#000';
      this.button4Color = '#000';
      this.txt1color = '#fff';
      this.txt2color = '#000';
      this.txt3color = '#fff';
      this.txt4color = '#fff';
    }
    else if (op == '3') {
      this.title = 'Search by';
      this.button1Color = '#000';
      this.button2Color = '#000';
      this.button3Color = '#fff';
      this.button4Color = '#000';
      this.txt1color = '#fff';
      this.txt2color = '#fff';
      this.txt3color = '#000';
      this.txt4color = '#fff';
    }
    else if (op == '4') {
      this.title = 'Results';
      this.button1Color = '#000';
      this.button2Color = '#000';
      this.button3Color = '#000';
      this.button4Color = '#fff';
      this.txt1color = '#fff';
      this.txt2color = '#fff';
      this.txt3color = '#fff';
      this.txt4color = '#000';
    }
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.errormessage,
      buttons: ['OK']
    });
    alert.present();
  }

  sendnotification() {
    this.provider.setloading();
    for (let i = 0; i < this.pilotlist.length; i++) {
      if (this.pilotlist[i].checked == true) {
        this.pilotid.push(this.pilotlist[i].pkPilotId);
        this.pkid = this.pilotid.join();
      }
    }
    console.log(this.pilotid);
    if (this.pilotid.length != 0) {

      this.provider.sendnotification(this.pkid, this.id, this.tripid, this.rate).subscribe(res => {
        console.log(res);
        if (this.scommand == true) {
          this.provider.dismissloading();
          this.navCtrl.push('FiltersicPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp });
        }
        else if (this.fatt == true) {
          this.provider.dismissloading();
          this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp });
        }
        else if (this.fins == true) {
          this.provider.dismissloading();
          this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp });
        }
        else {
          this.provider.dismissloading();
          this.events.subscribe('usertype', this.usertype);
          //this.navCtrl.popTo(this.navCtrl.getByIndex(2));
          this.navCtrl.push('TabpagePage', { 'istab': false });
        }
      })
    }

    else {
      this.provider.dismissloading();
      this.showAlert1('Pilot', 'Please select atleast one captain');
    }

  }

  showAlert1(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.provider.dismissloading();
          }
        }
      ]
    });
    alert.present();
  }

  finish() {
    this.navCtrl.push('TabpagePage', { 'istab': false });
  }

  next() {
    if (this.scommand == true) {
      this.navCtrl.push('FiltersicPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins });
    }
    else if (this.fatt == true) {
      this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins });
    }
    else if (this.fins == true) {
      this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins });
    }
  }

  openProfile(opid) {
    this.provider.setloading();
    this.provider.viewprofile(this.id, opid).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.modalCtrl.create("ProfilePage", { 'isedit': false }).present().then(() => {
        this.events.publish('userdata', res);
      });
    })

  }

  selectociens() {
    this.navCtrl.push('SelectcontinentPage', { 'oceansdata': this.ocienselist, 'selectedocens': '', 'isociense': true, animate: false });
  }
  // checkboxselectpilot(pkid) {

  //   if (this.selectpilot == true) {
  //     this.pkid = pkid;
  //   }
  //   else if (this.selectpilot == false) {
  //     this.pkid = "";
  //   }
  // }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, AlertController, ModalController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
declare var jQuery: any;
import { ViewChild } from '@angular/core';
/**
 * Generated class for the FilterflightattendantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filterflightattendant',
  templateUrl: 'filterflightattendant.html',
})
export class FilterflightattendantPage {
  dummyJson = {

    mclass: [
      { description: '1' },
      { description: '2' },
      { description: '3' }
    ],
    yesno: [
      { description: 'Yes' },
      { description: 'No' }
    ],
  }
  @ViewChild('navbar') navBar: Navbar;
  exp: any;
  cullinarytraining1: any;
  specialtraining1: any;
  validpassyes: boolean = false;
  validpassno: boolean = false;
  continents: any;
  astraingyes: boolean = false;
  astraingyno: boolean = false;
  unrestricteduspass1: any;
  aircraftspecifitraining: any;
  id: any;
  selectedcullinarytraining: any;
  cullinaryothertraining: any;
  selectedtraining: any;
  othertraining: any;
  unrestricteduspass: any;
  simulator: any;
  tripid: any;
  havepasssport: any;
  language: any;
  sprofileyes: boolean = false;
  sprofileno: boolean = false;
  showprofile: any;
  ratingcertificate: string[] = [];
  ratingcer: any;
  rate: any;
  aircraftname: any;
  filterfastep: any;
  filterfastep1: any;
  filterfastep2: any;
  filterfastep3: any;
  filterfastep4: any;
  button1Color: any;
  button2Color: any;
  button3Color: any;
  button4Color: any;
  txt1color: any;
  txt2color: any;
  txt3color: any;
  txt4color: any;
  continentlist: any;
  attendantlist: any;
  errormessage: any;
  filterattendantdata: boolean = false;
  scommand: any;
  fatt: any;
  astraingno: any;
  fins: any;
  languagedata: any;
  allattendant: any;
  favattendant: any;
  avlattendant: any;
  showfinishfi: any;
  attendentid: string[] = [];
  attid: any;
  res: any;
  dispdata: boolean = true;
  fns_sh: any;
  fns_shno: number;
  title: any;
  oceexp: any;
  ratingcount: any = 0;
  isnearest: number = 0;
  invisayes: any;
  airexp: any;
  invisano: any;
  cullinarytraining: any;
  masterdata: any;
  SpecialtrainedName: any;
  CullinaryName: any;
  specialyes: any;
  specialno: any;
  cullinaryyes: any;
  cullinaryno: any;
  mstrainingno: any;
  mstrainingyes: any;
  usyes: any;
  usno: any;
  specialtraining: any;
  airtrainexp: any;
  isprofile: any;
  isgender: any;
  gdata: any;
  idata: any;
  ivisa: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    var that = this;
    // get rescheduled data is available
    this.gdata = provider.getfdata();

    // get aircraft data
    this.events.subscribe('selectdata', res => {
      if (res != undefined) {
        this.airexp = res;
      }
      // else {
      //   this.airexp = "";
      // }
    })

    // get master data to get speial train name and culinarry name
    this.masterdata = this.provider.getmasterdata();
    this.SpecialtrainedName = this.masterdata.data.SpecialtrainedName;
    this.CullinaryName = this.masterdata.data.CullinaryName;

    // set rating plugin
    jQuery(function () {


      jQuery("#rateYofilterattendant").rateYo({
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


    this.title = 'Required Experience - FA';
    this.id = this.navParams.get('id');
    this.tripid = this.navParams.get('tripid');
    this.aircraftname = this.navParams.get('aircraftname');
    this.scommand = navParams.get('scommand');
    this.fatt = navParams.get('fatt');
    this.fins = navParams.get('fins');
    this.languagedata = navParams.get('languagedata');
    this.oceexp = navParams.get('oce');
    this.isprofile = navParams.get('isprofile');
    this.isgender = navParams.get('isgender');
    this.filterfastep = '1';
    this.filterfastep1 = '1';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';

    if (this.fins == undefined || this.fins == false) {
      this.showfinishfi = false;
    }
    else if (this.fins == true) {
      this.showfinishfi = true;
    }
    this.events.subscribe('continentdata', res => {
      if (res == undefined) {
        this.continents = "";
      }
      else {
        this.continents = res;
      }

    })

    // get language data
    this.events.subscribe('languagedata', res => {
      this.language = res;
    })

    // get continents data
    this.provider.getContinents().subscribe(res => {
      this.continentlist = res;
      this.continentlist = this.continentlist.continents.continentdata;
    });
  }


  // get rating chnage value
  logRatingChange(rating) {
    this.ratingcount = rating;
    console.log(this.ratingcount);
  }

  // click to open aircraft page
  selecttrainaircraft() {
    this.navCtrl.push('SelectaircraftPage', { 'selectedaircraft': this.airtrainexp, 'type': 'aircraft', animate: false });
  }
  ionViewDidEnter() {
    // method to handle back button functionality
    this.navBar.backButtonClick = () => {
      console.log(this.filterfastep);

      this.filterfastep = this.filterfastep - 1;

      if (this.filterfastep >= "1") {
        if (this.filterfastep == '1') {
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

          this.title = 'Required Experience - FA';
          this.button1Color = '#fff';
          this.button2Color = '#000';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#000';
          this.txt2color = '#fff';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filterfastep == '2') {
          this.title = 'Day Rate - FA';
          this.button1Color = '#000';
          this.button2Color = '#fff';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#000';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filterfastep == '3') {
          this.title = 'Search by - FA';
          this.button1Color = '#000';
          this.button2Color = '#000';
          this.button3Color = '#fff';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#fff';
          this.txt3color = '#000';
          this.txt4color = '#fff';
        }
        else if (this.filterfastep == '4') {
          this.title = 'Results - FA';
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

    // set rescheduled data if available
    if (this.gdata) {

      this.exp = this.gdata.YEAREXP;
      this.continents = this.gdata.Continent;
      this.ratingcount = this.gdata.RatingCount;

      if (this.gdata.HavePassport) {
        this.validpassyes = true;
      }
      else {
        this.validpassno = true;
      }

      if (this.gdata.AircraftSpecifictraining) {
        this.astraingyes = true;
      }
      else {
        this.astraingyno = true;
      }
      if (this.gdata.SP_TRAINING == "") {
        this.specialtraining = "No";
      }
      else {
        this.specialtraining = "Yes";
        this.selectedtraining = this.gdata.SP_TRAINING;
        this.selectedtraining = this.selectedtraining.split(',');
      }
      if (this.gdata.SP_TRAINING == "Other") {
        this.othertraining = this.gdata.SpecialTrainedOther;
      }

      if (this.gdata.IsReqPrev12MonthTraining) {
        this.mstrainingyes = true;
      }
      else {
        this.mstrainingno = true;
      }
      if (this.gdata.VISA) {
        this.invisayes = true;
      }
      else {
        this.invisano = true;
      }


      if (this.gdata.SHOWPROFILE) {
        this.sprofileyes = true;
      }
      else {
        this.sprofileno = true;
      }
      if (this.gdata.CurrentUnrestrictedUSPass) {
        this.unrestricteduspass = "Yes";
      }
      else {
        this.unrestricteduspass = "No";
      }

      this.language = this.gdata.LANG_SPOKEN;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltercaptainPage');
  }

  // set wheel selector plugin value
  openpicker(type) {
    if (type == 'ctrain') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.yesno
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.yesno[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.cullinarytraining = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'strain') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.yesno
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.yesno[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.specialtraining = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    } else if (type == 'upassport') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.yesno
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.yesno[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.unrestricteduspass = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
  }


  // chekbox click method
  cheboxcheck(op, event) {
    // if (op == 'asty') {
    //   if (event.checked == true) {
    //     this.astraingyno = false;
    //     this.astraingyes = true;
    //   }
    //   else {
    //     this.astraingyno = true;
    //     this.astraingyes = false;
    //   }
    // }

    // else if (op == 'astn') {
    //   if (event.checked == true) {
    //     this.astraingyno = true;
    //     this.astraingyes = false;
    //   } else {
    //     this.astraingyno = false;
    //     this.astraingyes = true;
    //   }
    // }

    if (op == 'asty') {
      if (event.checked == true) {
        this.astraingno = false;
        this.astraingyes = true;
      }
      else {
        this.astraingno = true;
        this.astraingyes = false;
      }
    }

    else if (op == 'astn') {
      if (event.checked == true) {
        this.astraingno = true;
        this.astraingyes = false;
      }
      else {
        this.astraingno = false;
        this.astraingyes = true;
      }
    } else if (op == 'cy') {
      if (event.checked == true) {
        this.cullinaryno = false;
        this.cullinaryyes = true;
      }
      else {
        this.cullinaryno = true;
        this.cullinaryyes = false;
      }
    }

    else if (op == 'cn') {
      if (event.checked == true) {
        this.cullinaryno = true;
        this.cullinaryyes = false;
      }
      else {
        this.cullinaryno = false;
        this.cullinaryyes = true;
      }
    } else if (op == 'usy') {
      if (event.checked == true) {
        this.usno = false;
        this.usyes = true;
      }
      else {
        this.usno = true;
        this.usyes = false;
      }
    }

    else if (op == 'usn') {
      if (event.checked == true) {
        this.usno = true;
        this.usyes = false;
      }
      else {
        this.usno = false;
        this.usyes = true;
      }
    }
    else if (op == 'sy') {
      if (event.checked == true) {
        this.specialno = false;
        this.specialyes = true;
      }
      else {
        this.specialno = true;
        this.specialyes = false;
      }
    }

    else if (op == 'sn') {
      if (event.checked == true) {
        this.specialno = true;
        this.specialyes = false;
      }
      else {
        this.specialno = false;
        this.specialyes = true;
      }
    }
    else if (op == 'msy') {
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
      }
      else {
        this.mstrainingno = false;
        this.mstrainingyes = true;
      }
    }
    else if (op == 'ivisay') {
      if (event.checked == true) {
        this.invisano = false;
        this.invisayes = true;
      }
      else {
        this.invisano = true;
        this.invisayes = false;
      }
    }

    else if (op == 'ivisan') {
      if (event.checked == true) {
        this.invisano = true;
        this.invisayes = false;
      }
      else {
        this.invisano = false;
        this.invisayes = true;
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

    else if (op == 'sppy') {
      if (event.checked == true) {
        this.sprofileno = false;
        this.sprofileyes = true;
      }
      else {
        this.sprofileno = true;
        this.sprofileyes = false;
      }
    }

    else if (op == 'sppn') {
      if (event.checked == true) {
        this.sprofileno = true;
        this.sprofileyes = false;
      }
      else {
        this.sprofileno = false;
        this.sprofileyes = true;
      }
    }
  }

  // click to open continents page
  selectcontinents() {
    this.navCtrl.push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.continents, animate: false });
  }

  // click to open select lanaguage page
  selectlanguage() {
    console.log(this.languagedata);
    this.provider.setloading();
    this.navCtrl.push('SelectaircraftPage', { 'languagedata': this.languagedata, 'selectedlanguage': '', 'type': 'language' });
    this.provider.dismissloading();

  }
  // click to open aircraft select page
  selectaircraft(event) {
    this.navCtrl.push('SelectaircraftPage', { 'selectedaircraft': this.airexp, 'type': 'aircraft', animate: false });
  }


  // method is called when next button is pressed from 3rd tab
  filter() {
    if (this.favattendant == undefined || this.favattendant == false) {
      this.favattendant = 0
    }
    if (this.allattendant == undefined || this.allattendant == false) {
      this.allattendant = 0
    }
    if (this.avlattendant == undefined || this.avlattendant == false) {
      this.avlattendant = 0
    }
    if (this.favattendant == true) {
      this.favattendant = 1
    }
    if (this.allattendant == true) {
      this.allattendant = 1
    }
    if (this.avlattendant == true) {
      this.avlattendant = 1
    }

    if (this.favattendant == false && this.allattendant == false && this.avlattendant == false) {
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
    else if (this.favattendant == undefined && this.allattendant == undefined && this.avlattendant == undefined) {
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
      this.title = 'Results - FA';
      this.provider.setloading();
      this.fns_sh = "";
      this.fns_shno = 0;
      this.filterfastep = '4';
      this.filterfastep1 = '1';
      this.filterfastep2 = '2';
      this.filterfastep3 = '3';
      this.filterfastep4 = '4';
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
      if (this.astraingno == true) {
        this.aircraftspecifitraining = false;
      }
      else if (this.astraingyes == true) {
        this.aircraftspecifitraining = true;
      }
      if (this.sprofileno == true) {
        this.showprofile = "0";
      }
      else if (this.sprofileyes == true) {
        this.showprofile = "1";
      }
      if (this.mstrainingno == true) {
        this.simulator = false;
      }
      else if (this.mstrainingyes == true) {
        this.simulator = true;
      }
      if (this.invisayes == true) {
        this.ivisa = true;
      }
      else if (this.invisano == true) {
        this.ivisa = false;
      }
      if (this.unrestricteduspass == "Yes") {
        this.unrestricteduspass1 = true;
      } else if (this.unrestricteduspass == "No") {
        this.unrestricteduspass1 = false;
      }
      if (this.cullinarytraining == "Yes") {
        this.cullinarytraining1 = true;
      } else if (this.cullinarytraining == "No") {
        this.cullinarytraining1 = false;
      }
      if (this.specialtraining == "Yes") {
        this.specialtraining1 = true;
      } else if (this.specialtraining == "No") {
        this.specialtraining1 = false;
      }
      if (this.selectedtraining != undefined || this.selectedtraining != null) {
        var fselectedtraining = this.selectedtraining.join();
      }

      this.provider.filterflightattendant(this.id, this.exp, this.havepasssport, this.continents, this.aircraftspecifitraining, this.language, this.showprofile, this.tripid, this.rate, this.ratingcount, this.isnearest, this.favattendant, 1, this.airtrainexp, this.selectedcullinarytraining, this.cullinaryothertraining, fselectedtraining, this.othertraining, this.unrestricteduspass1, this.simulator, this.specialtraining1, this.cullinarytraining1, this.ivisa).subscribe(res => {
        console.log(res);
        if (this.showfinishfi == true) {
          this.fns_shno = this.fns_shno + 1;
        }
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data.FA == null || this.res.data == null) {
            this.dispdata = false;
            if (this.fns_shno == 0) {
              this.fns_sh = '_finish'
            }
            else if (this.fns_shno > 0) {
              this.fns_sh = '_next'
            }
          }
          else {
            this.dispdata = true;
            this.attendantlist = this.res.data.FA;
            if (this.fns_shno >= 0) {
              this.fns_sh = '_send'
            }
          }
          this.provider.dismissloading();
        }

        else if (this.res.Code == 400) {
          this.provider.dismissloading();
        }

      })
    }
  }

  // methd is called when next button presed from 1st tab
  save1() {
    this.title = 'Day Rate - FA';
    this.filterfastep1 = '1';
    this.filterfastep2 = '2';
    this.filterfastep = '2';
    this.button1Color = '#000';
    this.button2Color = '#fff';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#fff';
    this.txt2color = '#000';
    this.txt3color = '#fff';
    this.txt4color = '#fff';



  }
  // methd is called when next button presed from 2nd tab
  save2() {
    if (this.rate == undefined) {
      this.errormessage = "Please enter rate"
      this.showAlert();
    }
    else {
      this.title = 'Search by - FA';
      this.filterfastep1 = '1';
      this.filterfastep2 = '2';
      this.filterfastep3 = '3';
      this.filterfastep = '3';
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


  // method is called when change filter button is pressed
  changefilter() {
    var that = this;
    jQuery(function () {


      jQuery("#rateYofilterattendant").rateYo({
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
    this.filterfastep = '1';
    this.filterfastep1 = '1';
    this.filterfastep2 = '2';
    this.filterfastep3 = '3';
    this.filterfastep4 = '4';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';
  }

  // method to handle tab click event like 1,2,3,4
  activestep(op) {
    this.filterfastep = op;

    if (op == '1') {

      var that = this;
      jQuery(function () {


        jQuery("#rateYofilterattendant").rateYo({
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


      this.title = 'Required Experience - FA';
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
      this.title = 'Day Rate - FA';
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
      this.title = 'Search by - FA';
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
      this.title = 'Results - FA';
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

  // display alert dialog
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.errormessage,
      buttons: ['OK']
    });
    alert.present();
  }

  // method is called when send notification button pressed
  sendnotification() {
    this.provider.setloading();
    for (let i = 0; i < this.attendantlist.length; i++) {
      if (this.attendantlist[i].checked == true) {
        this.attendentid.push(this.attendantlist[i].pkPilotId);
        this.attid = this.attendentid.join();
      }
    }
    if (this.attendentid.length != 0) {
      this.provider.sendnotification(this.attid, this.id, this.tripid, this.rate).subscribe(res => {
        // if (this.fins == true) {
        //   this.provider.dismissloading();
        //   this.navCtrl.push('FilterflightinstructorPage', {
        //     'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender
        //   });
        // }
        if (this.fins == true) {
          //this.provider.dismissloading();
          if (this.gdata) {
            this.provider.getitrip(this.gdata.pkTripId, this.id).subscribe(res => {
              console.log(res);
              this.idata = res;
              this.idata = this.idata.data.Trip;
              if (this.idata == null) {
                this.provider.setidata("");
                this.provider.dismissloading();
                this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
              }
              // console.log(tid);
              else {
                this.idata = this.idata[0];
                this.provider.setidata(this.idata);
                this.provider.dismissloading();
                this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
                //this.app.getRootNav().push("SelectprofilePage");

              }
              //this.provider.dismissloading();
            },
              err => this.provider.dismissloading());
          }
          else {
            this.provider.dismissloading();
            this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
          }

        }
        else {
          this.provider.dismissloading();
          this.navCtrl.push('TabpagePage', { 'istab': false });
          //this.navCtrl.push('TabpagePage');
        }
      })
    }
    else {
      this.provider.dismissloading();
      this.showAlert1('Pilot', 'Please select atleast one attendant');
    }

  }

  // display alert dialog
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

  // call when finish button press
  finish() {
    this.navCtrl.push('TabpagePage', { 'istab': false });
  }

  // call when next button press from 4th tab
  next() {
    if (this.fins == true) {
      this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'isprofile': this.isprofile, 'isgender': this.isgender });
    }
  }


  // open profile page in modal controller
  openProfile(opid) {
    this.provider.setloading();
    this.provider.viewprofile(this.id, opid).subscribe(res => {
      console.log(res);
      this.provider.dismissloading();
      this.modalCtrl.create("ProfilePage", { 'isedit': false, 'isgender': this.isgender }).present().then(() => {
        this.events.publish('userdata', res);
      });
    })
  }
}

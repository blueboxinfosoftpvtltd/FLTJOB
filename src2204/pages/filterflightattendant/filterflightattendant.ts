import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events,Navbar, AlertController, ModalController } from 'ionic-angular';
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
  isnearest:number=0;
  invisayes: any;
  airexp: any;
  invisano:any;
  cullinarytraining: any;
  masterdata: any;
  SpecialtrainedName: any;
  CullinaryName: any;
  specialyes: any;
  specialno: any;
  cullinaryyes: any;
  cullinaryno:any;
  mstrainingno: any;
  mstrainingyes: any;
  usyes: any;
  usno: any;
  specialtraining: any;
  airtrainexp: any;
  isprofile: any;
  isgender: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    var that = this;
    this.events.subscribe('selectdata', res => {
      if (res != undefined) {
        this.airexp = res;
      }
      // else {
      //   this.airexp = "";
      // }
    })
    this.masterdata = this.provider.getmasterdata();
    this.SpecialtrainedName = this.masterdata.data.SpecialtrainedName;
    this.CullinaryName = this.masterdata.data.CullinaryName;
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


    this.title = 'Required Experience';
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

    this.events.subscribe('languagedata', res => {
      this.language = res;
    })
    this.provider.getContinents().subscribe(res => {
      this.continentlist = res;
      this.continentlist = this.continentlist.continents.continentdata;
    });
  }

  logRatingChange(rating){
    this.ratingcount = rating;
    console.log(this.ratingcount);
}
selecttrainaircraft(){
  this.navCtrl.push('SelectaircraftPage', { 'selectedaircraft': this.airtrainexp, 'type': 'aircraft', animate: false });
}
  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      console.log(this.filterfastep);
      
        this.filterfastep = this.filterfastep - 1;
      
        if(this.filterfastep >= "1"){
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
        else if (this.filterfastep == '2') {
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
        else if (this.filterfastep == '3') {
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
        else if (this.filterfastep == '4') {
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
      else{
        this.navCtrl.pop();
      }
    };

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltercaptainPage');
  }

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
    }else if (op == 'cy') {
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
    }else if (op == 'usy') {
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

  selectcontinents() {
    this.navCtrl.push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.continents, animate: false });
  }

  selectlanguage() {
    console.log(this.languagedata);
    this.provider.setloading();
    this.navCtrl.push('SelectaircraftPage', { 'languagedata': this.languagedata, 'selectedlanguage': '', 'type': 'language' });
    this.provider.dismissloading();

  }
  selectaircraft(event) {
    this.navCtrl.push('SelectaircraftPage', { 'selectedaircraft': this.airexp, 'type': 'aircraft', animate: false });
  }


  filter() {
    if (this.favattendant == undefined || this.favattendant == false ) {
      this.favattendant = 0
    }
    if (this.allattendant == undefined || this.allattendant == false) {
      this.allattendant = 0
    }
    if (this.avlattendant == undefined || this.avlattendant == false) {
      this.avlattendant = 0
    }
    if (this.favattendant == true ) {
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
    else{
    this.title = 'Results';
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
      this.havepasssport = "0";
    }
    else if (this.validpassyes == true) {
      this.havepasssport = "1";
    }
    if (this.astraingno == true) {
      this.aircraftspecifitraining = "0";
    }
    else if (this.astraingyes == true) {
      this.aircraftspecifitraining = "1";
    }
    if (this.sprofileno == true) {
      this.showprofile = "0";
    }
    else if (this.sprofileyes == true) {
      this.showprofile = "1";
    }
    if (this.mstrainingno == true) {
      this.simulator = "0";
    }
    else if (this.mstrainingyes == true) {
      this.simulator = "1";
    }
    if(this.unrestricteduspass  == "Yes"){
      this.unrestricteduspass1 = "1";
    }else if(this.unrestricteduspass  == "No"){
      this.unrestricteduspass1= "0";
    }
    if(this.cullinarytraining  == "Yes"){
      this.cullinarytraining1 = "1";
    }else if(this.cullinarytraining  == "No"){
      this.cullinarytraining1= "0";
    }
    if(this.specialtraining  == "Yes"){
      this.specialtraining1 = "1";
    }else if(this.specialtraining  == "No"){
      this.specialtraining1= "0";
    }
    if(this.selectedtraining != undefined || this.selectedtraining != null){
      var fselectedtraining = this.selectedtraining.join();
    }
    
    this.provider.filterflightattendant(this.id, this.exp, this.havepasssport, this.continents, this.aircraftspecifitraining, this.language, this.showprofile, this.tripid, this.rate, this.ratingcount,this.isnearest,this.favattendant,1,this.airtrainexp,this.selectedcullinarytraining,this.cullinaryothertraining,fselectedtraining,this.othertraining,this.unrestricteduspass1,this.simulator,this.specialtraining1,this.cullinarytraining1).subscribe(res => {
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

  save1() {
    this.title = 'Day Rate';
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

  save2() {
    if (this.rate == undefined) {
      this.errormessage = "Please enter rate"
      this.showAlert();
    }
    else {
      this.title = 'Search by';
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
    for (let i = 0; i < this.attendantlist.length; i++) {
      if (this.attendantlist[i].checked == true) {
        this.attendentid.push(this.attendantlist[i].pkPilotId);
        this.attid = this.attendentid.join();
      }
    }
    if (this.attendentid.length != 0) {
      this.provider.sendnotification(this.attid, this.id, this.tripid, this.rate).subscribe(res => {
        if (this.fins == true) {
          this.provider.dismissloading();
          this.navCtrl.push('FilterflightinstructorPage', {
            'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'oce': this.oceexp
          });
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
    if (this.fins == true) {
      this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt });
    }
  }

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

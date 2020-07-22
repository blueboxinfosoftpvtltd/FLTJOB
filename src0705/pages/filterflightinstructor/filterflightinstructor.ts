import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, AlertController, ModalController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
declare var jQuery: any;
import { ViewChild } from '@angular/core';
/**
 * Generated class for the FilterflightinstructorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filterflightinstructor',
  templateUrl: 'filterflightinstructor.html',
})
export class FilterflightinstructorPage {
  dummyJson = {

    mclass: [
      { description: '1' },
      { description: '2' },
      { description: '3' }
    ]
  }
  @ViewChild('navbar') navBar: Navbar;
  totaltime: any;
  dualgiven: any;
  instrumentinsyes: boolean = false;
  instrumentinsno: boolean = false;
  instrumentinstructor: any;
  multiinsyes: boolean = false;
  multiinsno: boolean = false;
  multiengineinstructor: any;
  complextime: any;
  hperformancetime: any;
  continents: any;
  twinsyes: boolean = false;
  twinsno: boolean = false;
  tailwheenins: any;
  ainsyes: boolean = false;
  ainsno: boolean = false;
  ainstructor: any;
  id: any;
  tripid: any;
  rate: any;
  aircraftname: any;
  filterfistep: any;
  filterfistep1: any;
  filterfistep2: any;
  filterfistep3: any;
  filterfistep4: any;
  button1Color: any;
  button2Color: any;
  button3Color: any;
  button4Color: any;
  txt1color: any;
  txt2color: any;
  txt3color: any;
  txt4color: any;
  continentlist: any;
  flightinstructorlist: any;
  errormessage: any;
  filterinstructordata: boolean = true;
  scommand: any;
  fatt: any;
  fins: any;
  allinstructor: any;
  favinstructor: any;
  avlinstructor: any;
  instructorid: string[] = [];
  insid: any;
  res: any;
  title: any;
  oceexp: any;
  ratingcount: any = 0;
  isnearest: number = 0;
  isprofile: any;
  isgender: any;
  idata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {

    this.idata = this.provider.getidata();
    var that = this;
    jQuery(function () {


      jQuery("#instructor").rateYo({
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
    this.title = 'Required Experience - FI';
    this.id = this.navParams.get('id');
    this.tripid = this.navParams.get('tripid');
    this.aircraftname = this.navParams.get('aircraftname');
    this.oceexp = this.navParams.get('oce');
    this.isprofile = navParams.get('isprofile');
    this.isgender = navParams.get('isgender');
    this.filterfistep = '1';
    this.filterfistep1 = '1';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';

    this.events.subscribe('continentdata', res => {
      this.continents = res;
    })
    this.provider.getContinents().subscribe(res => {
      this.continentlist = res;
      this.continentlist = this.continentlist.continents.continentdata;
    });


  }

  logRatingChange(rating) {
    this.ratingcount = rating;
    console.log(this.ratingcount);
  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      console.log(this.filterfistep);

      this.filterfistep = this.filterfistep - 1;

      if (this.filterfistep >= "1") {
        if (this.filterfistep == '1') {
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

          this.title = 'Required Experience - FI';
          this.button1Color = '#fff';
          this.button2Color = '#000';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#000';
          this.txt2color = '#fff';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filterfistep == '2') {
          this.title = 'Day Rate - FI';
          this.button1Color = '#000';
          this.button2Color = '#fff';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#000';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filterfistep == '3') {
          this.title = 'Search by - FI';
          this.button1Color = '#000';
          this.button2Color = '#000';
          this.button3Color = '#fff';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#fff';
          this.txt3color = '#000';
          this.txt4color = '#fff';
        }
        else if (this.filterfistep == '4') {
          this.title = 'Results - FI';
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

    if (this.idata) {
      this.totaltime = this.idata.TotalTime;
      this.dualgiven = this.idata.TimeOfInstruct;
      this.complextime = this.idata.complexTimeReqr;
      this.hperformancetime = this.idata.highPerfomanceTime;
      this.ratingcount = this.idata.RatingCount;
      if (this.idata.InstrumentInstructor == false) {
        this.instrumentinsno = true;

      }
      else {
        this.instrumentinsyes = true;
      }
      if (this.idata.MulEngInstructor == false) {
        this.multiinsno = true;
      }
      else {
        this.multiinsyes = true;
      }
      if (this.idata.tailWheelInsrtuctor == false) {
        this.twinsno = true;
      }
      else {
        this.twinsyes = true;
      }
      if (this.idata.acrobaticsInstructor == false) {
        this.ainsno = true;
      }
      else {
        this.ainsyes = true;
      }
    }

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltercaptainPage');
  }

  cheboxcheck(op, event) {
    if (op == 'iiy') {
      if (event.checked == true) {
        this.instrumentinsno = false;
        this.instrumentinsyes = true;
      }
      else {
        this.instrumentinsno = true;
        this.instrumentinsyes = false;
      }
    }
    else if (op == 'iin') {
      if (event.checked == true) {
        this.instrumentinsno = true;
        this.instrumentinsyes = false;
      } else {
        this.instrumentinsno = false;
        this.instrumentinsyes = true;
      }
    }

    else if (op == 'meiy') {
      if (event.checked == true) {
        this.multiinsno = false;
        this.multiinsyes = true;
      }
      else {
        this.multiinsno = true;
        this.multiinsyes = false;
      }
    }
    else if (op == 'mein') {
      if (event.checked == true) {
        this.multiinsno = true;
        this.multiinsyes = false;
      }
      else {
        this.multiinsno = false;
        this.multiinsyes = true;
      }
    }

    else if (op == 'twiy') {
      if (event.checked == true) {
        this.twinsno = false;
        this.twinsyes = true;
      }
      else {
        this.twinsno = true;
        this.twinsyes = false;
      }
    }
    else if (op == 'twin') {
      if (event.checked == true) {
        this.twinsno = true;
        this.twinsyes = false;
      }
      else {
        this.twinsno = false;
        this.twinsyes = true;
      }
    }

    else if (op == 'aiy') {
      if (event.checked == true) {
        this.ainsno = false;
        this.ainsyes = true;
      }
      else {
        this.ainsno = true;
        this.ainsyes = false;
      }
    }
    else if (op == 'ain') {
      if (event.checked == true) {
        this.ainsno = true;
        this.ainsyes = false;
      }
      else {
        this.ainsno = false;
        this.ainsyes = true;
      }
    }
  }

  selectcontinents() {
    this.navCtrl.push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': '' });
  }

  filter() {
    if (this.favinstructor == undefined || this.favinstructor == false) {
      this.favinstructor = 0
    }
    if (this.allinstructor == undefined || this.allinstructor == false) {
      this.allinstructor = 0
    }
    if (this.avlinstructor == undefined || this.avlinstructor == false) {
      this.avlinstructor = 0
    }
    if (this.favinstructor == true) {
      this.favinstructor = 1
    }
    if (this.allinstructor == true) {
      this.allinstructor = 1
    }
    if (this.avlinstructor == true) {
      this.avlinstructor = 1
    }

    if (this.favinstructor == false && this.allinstructor == false && this.avlinstructor == false) {
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
    else if (this.favinstructor == undefined && this.allinstructor == undefined && this.avlinstructor == undefined) {
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
      this.title = 'Results - FI';
      this.provider.setloading();
      this.filterfistep = '4';
      this.filterfistep1 = '1';
      this.filterfistep2 = '2';
      this.filterfistep3 = '3';
      this.filterfistep4 = '4';
      this.button1Color = '#000';
      this.button2Color = '#000';
      this.button3Color = '#000';
      this.button4Color = '#fff';
      this.txt1color = '#fff';
      this.txt2color = '#fff';
      this.txt3color = '#fff';
      this.txt4color = '#000';

      if (this.instrumentinsno == true) {
        this.instrumentinstructor = "0";
      }
      else if (this, this.instrumentinsyes == true) {
        this.instrumentinstructor = "1";
      }

      if (this.multiinsno == true) {
        this.multiengineinstructor = "0";
      }

      else if (this.multiinsyes == true) {
        this.multiengineinstructor = "1";
      }

      if (this.twinsno == true) {
        this.tailwheenins = "0";
      }

      else if (this.twinsyes == true) {
        this.tailwheenins = "1";
      }

      if (this.ainsno == true) {
        this.ainstructor = "0";
      }
      else if (this.ainsyes == true) {
        this.ainstructor = "1";
      }
      this.provider.filterflightinstructor(this.id, this.totaltime, this.dualgiven, this.instrumentinstructor, this.multiengineinstructor, this.complextime, this.hperformancetime, this.tailwheenins, this.ainstructor, this.tripid, this.rate, this.ratingcount, this.isnearest, this.favinstructor, 1).subscribe(res => {
        console.log(res);
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data.FI == null || this.res.data == null) {
            this.filterinstructordata = false;
          }
          else {
            this.flightinstructorlist = this.res.data.FI;
            this.filterinstructordata = true;
          }

          this.provider.dismissloading();
        }

        else if (this.res.Code == 400) {
          this.provider.dismissloading();
        }

      },
        err => this.provider.dismissloading())
    }
  }

  save1() {
    this.title = 'Day Rate - FI';
    this.filterfistep1 = '1';
    this.filterfistep2 = '2';
    this.filterfistep = '2';
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
      this.title = 'Search by - FI';
      this.filterfistep1 = '1';
      this.filterfistep2 = '2';
      this.filterfistep3 = '3';
      this.filterfistep = '3';
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


      jQuery("#instructor").rateYo({
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
    this.filterfistep = '1';
    this.filterfistep1 = '1';
    this.filterfistep2 = '2';
    this.filterfistep3 = '3';
    this.filterfistep4 = '4';
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
    this.filterfistep = op;

    if (op == '1') {

      var that = this;
      jQuery(function () {


        jQuery("#instructor").rateYo({
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

      this.title = 'Required Experience - FI';
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
      this.title = 'Day Rate - FI';
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
      this.title = 'Search by - FI';
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
      this.title = 'Results - FI';
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
    for (let i = 0; i < this.flightinstructorlist.length; i++) {
      if (this.flightinstructorlist[i].checked == true) {
        this.instructorid.push(this.flightinstructorlist[i].pkPilotId);
        this.insid = this.instructorid.join();
      }
    }
    if (this.instructorid.length != 0) {
      this.provider.sendnotification(this.insid, this.id, this.tripid, this.rate).subscribe(res => {
        //this.navCtrl.push('TabpagePage');
        this.navCtrl.push('TabpagePage', { 'istab': false });
        // if (this.scommand == true) {
        //   this.navCtrl.push('FiltersicPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins });
        // }
      })
    }
    else {
      this.provider.dismissloading();
      this.showAlert1('Pilot', 'Please select atleast one instructor');
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


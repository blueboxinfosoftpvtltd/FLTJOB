import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, AlertController, ModalController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { ViewChild } from '@angular/core';
declare var jQuery: any;
/**
 * Generated class for the FiltercaptainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-filtersic',
  templateUrl: 'filtersic.html',
})
export class FiltersicPage {
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
  filtersicstep: any;
  filtersicstep1: any;
  filtersicstep2: any;
  filtersicstep3: any;
  filtersicstep4: any;
  button1Color: any;
  button2Color: any;
  button3Color: any;
  button4Color: any;
  txt1color: any;
  txt2color: any;
  txt3color: any;
  txt4color: any;
  continentlist: any;
  siclist: any;
  errormessage: any;
  filtersicdata: boolean = false;
  fatt: any;
  fins: any;
  allsic: any;
  favsic: any;
  avlsic: any;
  showfinishfa: any;
  showfinishfi: any;
  sicidary: string[] = [];
  sicid: any;
  res: any;
  dispdata: boolean = true;
  fns_sh: any;
  fns_shno: number;
  title: any;
  ratingcount: any = 0;
  oceexp: any;
  isnearest: number = 0;
  isprofile: any;
  isgender: any;
  gdata: any;
  fdata: any;
  idata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public provider: AuthproviderProvider, public events: Events, public alertCtrl: AlertController, public modalCtrl: ModalController) {

    // get reschedule data if available
    this.gdata = provider.getsdata();
    var that = this;

    // set rating value
    jQuery(function () {


      jQuery("#rateYosecond").rateYo({
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
    this.title = "Required Experience - SIC";
    this.id = this.navParams.get('id');
    this.tripid = this.navParams.get('tripid');
    this.aircraftname = this.navParams.get('aircraftname');
    this.fatt = navParams.get('fatt');
    this.fins = navParams.get('fins');
    this.oceexp = navParams.get('oce');
    this.isprofile = navParams.get('isprofile');
    this.isgender = navParams.get('isgender');
    this.filtersicstep = '1';
    this.filtersicstep1 = '1';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';
    this.mclass = this.dummyJson.mclass[0].description;
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

    // get selected continenets data from continets page
    this.events.subscribe('continentdata', res => {
      this.continents = res;
    })

    // get continents data
    this.provider.getContinents().subscribe(res => {
      this.continentlist = res;
      this.continentlist = this.continentlist.continents.continentdata;
    });
  }

  // get change rating value
  logRatingChange(rating) {
    this.ratingcount = rating;
    console.log(this.ratingcount);
  }

  ionViewDidEnter() {

    // method to handle back button
    this.navBar.backButtonClick = () => {
      console.log(this.filtersicstep);

      this.filtersicstep = this.filtersicstep - 1;

      if (this.filtersicstep >= "1") {
        if (this.filtersicstep == '1') {
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

          this.title = 'Required Experience - SIC';
          this.button1Color = '#fff';
          this.button2Color = '#000';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#000';
          this.txt2color = '#fff';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filtersicstep == '2') {
          this.title = 'Day Rate - SIC';
          this.button1Color = '#000';
          this.button2Color = '#fff';
          this.button3Color = '#000';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#000';
          this.txt3color = '#fff';
          this.txt4color = '#fff';
        }
        else if (this.filtersicstep == '3') {
          this.title = 'Search by - SIC';
          this.button1Color = '#000';
          this.button2Color = '#000';
          this.button3Color = '#fff';
          this.button4Color = '#000';
          this.txt1color = '#fff';
          this.txt2color = '#fff';
          this.txt3color = '#000';
          this.txt4color = '#fff';
        }
        else if (this.filtersicstep == '4') {
          this.title = 'Results - SIC';
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

    // set reschedule data if available
    if (this.gdata) {
      this.totaltime = this.gdata.AircraftTotalTime;
      this.totaltimetype = this.gdata.TotalTimeAircraftId;
      this.mclass = this.gdata.FAAMedical;
      this.ratingcount = this.gdata.RatingCount;
      this.continents = this.gdata.Continent;
      if (this.gdata.HavePassport) {
        this.validpassyes = true;
      }
      else {
        this.validpassno = true;
      }
      if (this.gdata.rating == "Commercial") {
        this.ratingc = true;
      }
      else {
        this.ratinga = true;
      }
      if (this.gdata.IsReqPrev12MonthTraining) {
        this.mstrainingyes = true;
      }
      else {
        this.mstrainingno = true;
      }
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FiltercaptainPage');
  }

  // set wheel selector value
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
  // method to handle checkbox click event
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

  // open continents page
  selectcontinents() {
    this.navCtrl.push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.continents, animate: false });
  }

  // call when next button pressed from 3rd tab
  filter() {
    if (this.favsic == undefined || this.favsic == false) {
      this.favsic = 0
    }
    if (this.allsic == undefined || this.allsic == false) {
      this.allsic = 0
    }
    if (this.avlsic == undefined || this.avlsic == false) {
      this.avlsic = 0
    }
    if (this.favsic == true) {
      this.favsic = 1
    }
    if (this.allsic == true) {
      this.allsic = 1
    }
    if (this.avlsic == true) {
      this.avlsic = 1
    }

    if (this.favsic == false && this.allsic == false && this.avlsic == false) {
      let alert = this.alertCtrl.create({
        title: "",
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
    else if (this.favsic == undefined && this.allsic == undefined && this.avlsic == undefined) {
      let alert = this.alertCtrl.create({
        title: "",
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

      this.title = "Results - SIC";
      this.provider.setloading();
      this.fns_shno = 0;
      this.fns_sh = "";
      this.filtersicstep = '4';
      this.filtersicstep1 = '1';
      this.filtersicstep2 = '2';
      this.filtersicstep3 = '3';
      this.filtersicstep4 = '4';
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
      this.provider.filtersic(this.id, this.totaltime, this.totaltimetype, this.mclass, this.havepasssport, this.ratingcer, this.aircraftname, this.continents, this.smtrain, this.tripid, this.rate, this.ratingcount, this.isnearest, this.favsic, 1).subscribe(res => {
        console.log(res);
        if (this.showfinishfa == true) {
          this.fns_shno = this.fns_shno + 1;
        }
        if (this.showfinishfi == true) {
          this.fns_shno = this.fns_shno + 1;
        }
        this.res = res;
        if (this.res.Code == 200) {
          if (this.res.data.SIC == null || this.res.data == null) {
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
            this.siclist = this.res.data.SIC;
            if (this.fns_shno >= 0) {
              this.fns_sh = '_send'
            }
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

  // call when change filter button pressed
  changefilter() {
    var that = this;
    jQuery(function () {


      jQuery("#rateYosecond").rateYo({
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
    this.filtersicstep = '1';
    this.filtersicstep1 = '1';
    this.filtersicstep2 = '2';
    this.filtersicstep3 = '3';
    this.filtersicstep4 = '4';
    this.button1Color = '#fff';
    this.button2Color = '#000';
    this.button3Color = '#000';
    this.button4Color = '#000';
    this.txt1color = '#000';
    this.txt2color = '#fff';
    this.txt3color = '#fff';
    this.txt4color = '#fff';
  }

  // call when next button pressed from 1st tab
  save1() {
    if (this.totaltime == undefined) {
      this.errormessage = "Please enter total time";
      this.showAlert();
    }
    else {
      this.title = "Day Rate - SIC";
      this.filtersicstep1 = '1';
      this.filtersicstep2 = '2';
      this.filtersicstep = '2';
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

  //  call when next button pressed from 2nd tab
  save2() {

    if (this.rate == undefined) {
      this.errormessage = "Please enter rate";
      this.showAlert();
    }
    else {
      this.title = "Search by - SIC";
      this.filtersicstep1 = '1';
      this.filtersicstep2 = '2';
      this.filtersicstep3 = '3';
      this.filtersicstep = '3';
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

  // method to handle tab click event like 1,2,3,4
  activestep(op) {
    this.filtersicstep = op;

    if (op == '1') {

      var that = this;
      jQuery(function () {


        jQuery("#rateYosecond").rateYo({
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

      this.title = "Required Experience - SIC";
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
      this.title = "Day Rate - SIC";
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
      this.title = "Search by - SIC";
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
      this.title = "Results - SIC";
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
      subTitle: this.errormessage,
      buttons: ['OK']
    });
    alert.present();
  }


  // call when send notification button pressed
  sendnotification() {
    this.provider.setloading();
    for (let i = 0; i < this.siclist.length; i++) {
      if (this.siclist[i].checked == true) {
        this.sicidary.push(this.siclist[i].pkPilotId);
        this.sicid = this.sicidary.join();
      }
    }
    if (this.sicid.length != 0) {
      this.provider.sendnotification(this.sicid, this.id, this.tripid, this.rate).subscribe(res => {
        if (this.fatt == true) {
          if (this.gdata) {
            this.provider.getftrip(this.gdata.pkTripId, this.id).subscribe(res => {
              console.log(res);
              this.fdata = res;
              this.fdata = this.fdata.data.Trip;
              if (this.fdata == null) {
                this.provider.setfdata("");
                this.provider.dismissloading();
                this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
              }
              // console.log(tid);
              else {
                this.fdata = this.fdata[0];
                this.provider.setfdata(this.fdata);
                this.provider.dismissloading();
                this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
                //this.app.getRootNav().push("SelectprofilePage");

              }
              //this.provider.dismissloading();
            },
              err => this.provider.dismissloading());
          }
          else {
            this.provider.dismissloading();
            this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
          }



          // this.provider.dismissloading();
          // this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
        }
        else if (this.fins == true) {
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
        // if (this.fatt == true) {
        //   this.provider.dismissloading();
        //   this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fins': this.fins, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
        // }

        // else if (this.fins == true) {
        //   this.provider.dismissloading();
        //   this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'oce': this.oceexp, 'isprofile': this.isprofile, 'isgender': this.isgender });
        // }
        else {
          this.provider.dismissloading();
          //this.navCtrl.push('TabpagePage');
          this.navCtrl.push('TabpagePage', { 'istab': false });
        }
      })
    } else {
      this.provider.dismissloading();
      this.showAlert1('Pilot', 'Please select atleast one SIC');
    }

  }

  // display alert dialog
  showAlert1(title, msg) {
    const alert = this.alertCtrl.create({
      title: "",
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

  // call when finish button click
  finish() {
    this.navCtrl.push('TabpagePage', { 'istab': false });
  }

  // call when next button press from 4th tab
  next() {
    if (this.fatt == true) {
      this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fins': this.fins, 'isprofile': this.isprofile, 'isgender': this.isgender });
    }

    else if (this.fins == true) {
      this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.tripid, 'aircraftname': this.aircraftname, 'fatt': this.fatt, 'isprofile': this.isprofile, 'isgender': this.isgender });
    }
  }

  // click to open profile page in modal controller
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

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App, ToastController, AlertController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { Storage } from '@ionic/storage';
import * as $ from 'jquery';
declare var jQuery: any;
declare var $: any;
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userdata: any;
  masterdata: any;
  mtype: any;
  mtype1: any;
  fname: any;
  lname: any;
  cname: any;
  clocation: any;
  type: any;
  phoneno: any;
  email: any;
  ttime: any;
  ctime: any;
  hptime: any;
  dgiven: any;
  dperhour: any;
  iperhour: any;
  passfail: any;
  yexp: any;
  airexp: any;
  avionicsexp: any;
  medicalclass: any;
  passport: any;
  passportexpdate: any;
  selectedcountry: any;
  regionexp: any;
  unrestricteduspass: any;
  cprtraining: any;
  cullinarytraining: any;
  specialtraining: any;
  selectedlanguage: any;
  avionicsexpid: any;
  iinstructoryes: boolean = false;
  meinstructoryes: boolean = false;
  twinstructoryes: boolean = false;
  ainstructoryes: boolean = false;
  iinstructorno: boolean = false;
  meinstructorno: boolean = false;
  twinstructorno: boolean = false;
  ainstructorno: boolean = false;
  astrainingyes: boolean = false;
  astrainingno: boolean = false;
  mstrainingyes: boolean = false;
  mstrainingno: boolean = false;
  chk1: boolean = false;
  chk2: boolean = false;
  currentprofiledata: any;
  disableonactive: boolean = false;
  aircraftspecifictraining: boolean = false;
  simulatortraining: boolean = false;
  instrumentinstructor: boolean = false;
  multiengineinstructor: boolean = false;
  tailwheelinstrunctor: boolean = false;
  acrobaticsinstrunctor: boolean = false;
  continentlist: any;
  selectedcontinents: any;
  ocienselist: any;
  selectedociens: any
  experience: any;
  country: any;
  msg: any;
  expid: any;
  owner: any;
  instructor: any;
  pilot: any;
  flightattendent: any;
  certificationdata: any;
  fkMembershipId: any;
  searchdata: any;
  userid: any;
  masks: any;
  photo: any;
  ename: any;
  countrydata: any;
  pictime: any;
  aircraftdata: any;
  avionicsdata: any;
  languagedata: any;
  classdata: any;
  response: any;
  isedit: any;
  chatoppositeid: any;
  rate; any;
  _rateYo: any;
  experience1: any;
  mclass1: any;
  onoff1: any;
  yesno1: any;

  phoneNumber: any = "";
  dummyJson = {
    onoff: [
      { description: 'On' },
      { description: 'Off' }
    ],
    yesno: [
      { description: 'Yes' },
      { description: 'No' }
    ],
    mclass: [
      { description: '1' },
      { description: '2' },
      { description: '3' }
    ],
    experience: [
      { description: 'International' },
      { description: 'Domestic' }
    ],
    mtype: [
      { description: 'Owner Operator', id: '1' },
      { description: 'Instructor', id: '2' },
      { description: 'Pilot', id: '3' },
      { description: 'Flight Attendant', id: '4' },
      { description: 'Second In Command', id: '5' }
    ],
  }
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public events: Events, public provider: AuthproviderProvider, public app: App, public sharedservice: SharedserviceProvider, public alertCtrl: AlertController, public storage: Storage) {

    this.experience1 = this.dummyJson.experience;
    this.mtype1 = this.dummyJson.mtype;
    this.mclass1 = this.dummyJson.mclass;
    this.onoff1= this.dummyJson.onoff;
    this.yesno1 = this.dummyJson.yesno;
    this.masks = {
      phoneno: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };

    this.isedit = navParams.get('isedit');
    this.chatoppositeid = navParams.get('oppositeid');
    if (this.isedit == false) {
      this.disableonactive = true;
    }
    this.masterdata = this.provider.getmasterdata();
    this.countrydata = this.masterdata.data.Countries;
    this.aircraftdata = this.masterdata.data.AirCraft;
    this.avionicsdata = this.masterdata.data.AvionicsExperience;
    this.languagedata = this.masterdata.data.Languages;
    this.classdata = this.masterdata.data.AirCraftClass;



  }



  // private presentToast(text) {
  //   let toast = this.toastCtrl.create({
  //     message: text,
  //     duration: 3000,
  //     position: 'top'
  //   });
  //   toast.present();
  // }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');

    // $(function () {


    //   $("#rateYo").on("rateyo.init", function (e, data) {

    //     console.log("RateYo initialized! with " + data.rating);
    //   });

    //   this._rateYo = $("#rateYo").rateYo();
    //   // this._rateYo.rateYo({
    //   //   starWidth: "20px",
    //   //   halfStar: true,
    //   //   spacing: "13px",
    //   //   rating: that.rate
    //   // })
    // });
  }

  ionViewDidEnter() {
    var that = this;

    jQuery(function () {


      jQuery("#rateYo3").rateYo({
        starWidth: "20px",
        halfStar: true,
        spacing: "13px",
        rating: that.rate
      })
      jQuery("#rateYo").rateYo({
        starWidth: "20px",
        halfStar: true,
        spacing: "13px",
        rating: that.rate
      })
      jQuery("#rateYo2").rateYo({
        starWidth: "20px",
        halfStar: true,
        spacing: "13px",
        rating: that.rate
      })
      jQuery("#rateYo4").rateYo({
        starWidth: "20px",
        halfStar: true,
        spacing: "13px",
        rating: that.rate
      })

    });
    this.events.subscribe('ratingcerti', val => {

      console.log(val);
      this.certificationdata = val;
      this.certificationdata = this.certificationdata.data.RatingCertificate;
    })
    this.events.subscribe('selectdata', res => {
      if (res != undefined) {
        this.airexp = res;
      }
      // else {
      //   this.airexp = "";
      // }
    })
    this.events.subscribe('oceansdata', res => {
      if (res != undefined) {
        this.selectedociens = res;
      }
      // else {
      //   this.selectedociens = "";
      // }

    })

    this.events.subscribe('continentdata', res => {
      if (res != undefined) {
        this.selectedcontinents = res;
      }
      // else {
      //   this.selectedcontinents = "";
      // }

    })
    this.events.subscribe('avionicsselecteddata', res => {
      if (res != undefined) {
        this.avionicsexp = res[0];
        this.avionicsexpid = res[1];
      }
      // else {
      //   this.avionicsexp = "";
      //   this.avionicsexpid = "";
      // }
    })
    this.events.subscribe('countrydata', res => {
      if (res != undefined) {
        this.country = res;
      }
      // else {
      //   this.country = "";
      // }
    })
    this.events.subscribe('languagedata', res => {
      if (res != undefined) {
        this.selectedlanguage = res;
      }
      // else {
      //   this.selectedlanguage = "";
      // }
    })

    // get userdata from tab page

    // get Owner data
    this.events.subscribe('userdata', val => {
      console.log('profile page data', val);
      this.userdata = val;
      this.type = this.userdata.data.Pilot.MemberShipType;
      if (this.userdata.data.Pilot.ratingCount !== "") {
        this.rate = this.userdata.data.Pilot.ratingCount;
      }
      else {
        this.rate = this.userdata.data.Pilot.ExtraField1;
      }

      console.log(this.rate);
      var that = this;
      jQuery(function () {


        jQuery("#rateYo3").rateYo({
          starWidth: "20px",
          halfStar: true,
          spacing: "13px",
          rating: that.rate
        })
        jQuery("#rateYo").rateYo({
          starWidth: "20px",
          halfStar: true,
          spacing: "13px",
          rating: that.rate
        })
        jQuery("#rateYo2").rateYo({
          starWidth: "20px",
          halfStar: true,
          spacing: "13px",
          rating: that.rate
        })
        jQuery("#rateYo4").rateYo({
          starWidth: "20px",
          halfStar: true,
          spacing: "13px",
          rating: that.rate
        })

      });
      if (this.type == 'Owner Operator') {
        this.mtype = this.type;
        this.fname = this.userdata.data.Pilot.PilotFname;
        this.lname = this.userdata.data.Pilot.PilotLname;
        this.cname = this.userdata.data.Pilot.CompanyName;
        this.photo = this.userdata.data.Pilot.PhotoPath;
        this.clocation = this.userdata.data.Pilot.CurrentLocation;
        if (this.clocation) {
          this.clocation = this.dummyJson.onoff[0].description;
        }
        else {
          this.clocation = this.dummyJson.onoff[1].description;
        }
      }

      // for instructor data

      else if (this.type == 'Instructor') {
        this.mtype = this.type;
        this.fname = this.userdata.data.Pilot.PilotFname;
        this.lname = this.userdata.data.Pilot.PilotLname;
        this.cname = this.userdata.data.Pilot.CompanyName;
        this.photo = this.userdata.data.Pilot.PhotoPath;
        this.ctime = this.userdata.data.Pilot.complexTimeReq;
        this.hptime = this.userdata.data.Pilot.highPerfomanceTime;
        this.dgiven = this.userdata.data.Pilot.TimeOfInstruct;
        this.airexp = this.userdata.data.Pilot.AircraftType;
        this.phoneno = this.userdata.data.Pilot.cellNumber;
        this.email = this.userdata.data.Pilot.EmailId;
        this.ttime = this.userdata.data.Pilot.TotalTime;
        this.pictime = this.userdata.data.Pilot.TotalPICTime;
        this.photo = this.userdata.data.Pilot.PhotoPath;
        this.medicalclass = this.userdata.data.Pilot.FAAMedical;
        this.avionicsexpid =this.userdata.data.Pilot.fkAvionicsExperienceId;
        if (this.airexp != undefined) {
          this.sharedservice.getaircraftchklist(this.aircraftdata, this.airexp);
        }
        this.avionicsexp = this.userdata.data.Pilot.AvionicsExperienceType;
        if (this.avionicsexp != undefined) {
          this.sharedservice.getavionicschklist(this.avionicsdata, this.avionicsexp);
        }
        this.passfail = this.userdata.data.Pilot.PassOrFail;
        this.dperhour = this.userdata.data.Pilot.DomPHRate;
        this.iperhour = this.userdata.data.Pilot.InterPHRate;
        if (this.userdata.data.Pilot.InstrumentInstructor) {
          this.iinstructoryes = true;
        }
        else {
          this.iinstructorno = true;
        }
        if (this.userdata.data.Pilot.MulEngInstructor) {
          this.meinstructoryes = true;
        }
        else {
          this.meinstructorno = true;
        }
        if (this.userdata.data.Pilot.tailWheelInsrtuctor) {
          this.twinstructoryes = true;
        }
        else {
          this.twinstructorno = true;
        }
        if (this.userdata.data.Pilot.acrobaticsInstructor) {
          this.ainstructoryes = true;
        }
        else {
          this.ainstructorno = true;
        }
      }
      // for pilot data
      else if (this.type == 'Pilot' || this.type == 'Second In Command') {
        console.log(this.userdata.data.Pilot.CitizenCountry);
        this.provider.getContinents().subscribe(res => {
          this.continentlist = res;
          this.ocienselist = res;
          this.continentlist = this.continentlist.continents.continentdata;
          this.ocienselist = this.ocienselist.continents.oceansdata;
          this.mtype = this.type;
          this.fname = this.userdata.data.Pilot.PilotFname;
          this.lname = this.userdata.data.Pilot.PilotLname;
          this.clocation = this.userdata.data.Pilot.CurrentLocation;
          this.photo = this.userdata.data.Pilot.PhotoPath;
          if (this.clocation) {
            this.clocation = this.dummyJson.onoff[0].description;
          }
          else {
            this.clocation = this.dummyJson.onoff[1].description;
          }
          this.phoneno = this.userdata.data.Pilot.cellNumber;
          this.email = this.userdata.data.Pilot.EmailId;
          this.ttime = this.userdata.data.Pilot.TotalTime;
          this.pictime = this.userdata.data.Pilot.TotalPICTime;
          this.medicalclass = this.userdata.data.Pilot.FAAMedical;
          this.passport = this.userdata.data.Pilot.HavePassport;
          if (this.passport) {
            this.passport = this.dummyJson.yesno[0].description;
          }
          else {
            this.passport = this.dummyJson.yesno[1].description;
          }
          if (this.userdata.data.Pilot.IsReqPrev12MonthTraining == true) {
            this.mstrainingyes = true;
            this.mstrainingno = false;
          }
          else {
            this.mstrainingyes = false;
            this.mstrainingno = true;
          }
          this.country = this.userdata.data.Pilot.CitizenCountry;
          this.passportexpdate = this.userdata.data.Pilot.PassportExpDate;
          this.experience = this.userdata.data.Pilot.ExperianceType;
          this.selectedcontinents = this.userdata.data.Pilot.Continent;
          this.selectedociens = this.userdata.data.Pilot.OceanicExp;
          this.certificationdata = this.userdata.data.Pilot.Certification;
          this.msg = this.userdata.data.Pilot.OtherNotes;
          if (this.selectedcontinents != undefined) {
            this.sharedservice.getcontinentlist(this.continentlist, this.selectedcontinents);
          }
          if (this.selectedociens != undefined) {
            this.sharedservice.getoceaniclist(this.ocienselist, this.selectedociens);
          }
          if (this.country != undefined) {
            this.sharedservice.getcountrylist(this.countrydata, this.country);
          }
        })
      }


      // for Flight Attendant data
      else if (this.type == 'Flight Attendant') {
        console.log(this.userdata.data.Pilot.CitizenCountry);
        this.provider.getContinents().subscribe(res => {
          this.continentlist = res;
          this.ocienselist = res;
          this.continentlist = this.continentlist.continents.continentdata;
          this.ocienselist = this.ocienselist.continents.oceansdata;
          this.mtype = this.type;
          this.fname = this.userdata.data.Pilot.PilotFname;
          this.lname = this.userdata.data.Pilot.PilotLname;
          this.yexp = this.userdata.data.Pilot.yearOfExperiance;
          this.phoneno = this.userdata.data.Pilot.cellNumber;
          this.email = this.userdata.data.Pilot.EmailId;
          this.photo = this.userdata.data.Pilot.PhotoPath;
          this.regionexp = this.userdata.data.Pilot.InternationalExperience;
          if (this.regionexp) {
            this.regionexp = this.dummyJson.yesno[0].description;
          }
          else {
            this.regionexp = this.dummyJson.yesno[1].description;
          }
          this.unrestricteduspass = this.userdata.data.Pilot.CurrentUnrestrictedUSPass;
          if (this.unrestricteduspass) {
            this.unrestricteduspass = this.dummyJson.yesno[0].description;
          }
          else {
            this.unrestricteduspass = this.dummyJson.yesno[1].description;
          }
          this.airexp = this.userdata.data.Pilot.AircraftType;
          if (this.airexp != undefined) {
            this.sharedservice.getaircraftchklist(this.aircraftdata, this.airexp);
          }
          this.country = this.userdata.data.Pilot.InternationalVisas;
          if (this.country != undefined) {
            this.sharedservice.getcountrylist(this.countrydata, this.country);
          }
          this.selectedcontinents = this.userdata.data.Pilot.Continent;
          if (this.selectedcontinents != undefined) {
            this.sharedservice.getcontinentlist(this.continentlist, this.selectedcontinents);
          }
          this.selectedlanguage = this.userdata.data.Pilot.LanguagesSpoken;
          if (this.selectedlanguage != undefined) {
            this.sharedservice.getlanguagelist(this.languagedata, this.selectedlanguage);
          }
          this.passport = this.userdata.data.Pilot.HavePassport;
          if (this.passport) {
            this.passport = this.dummyJson.yesno[0].description;
          }
          else {
            this.passport = this.dummyJson.yesno[1].description;
          }
          this.cprtraining = this.userdata.data.Pilot.CPRTraining;
          if (this.cprtraining) {
            this.cprtraining = this.dummyJson.yesno[0].description;
          }
          else {
            this.cprtraining = this.dummyJson.yesno[1].description;
          }
          this.specialtraining = this.userdata.data.Pilot.IsSpecialTrained;
          if (this.specialtraining) {
            this.specialtraining = this.dummyJson.yesno[0].description;
          }
          else {
            this.specialtraining = this.dummyJson.yesno[1].description;
          }
          this.cullinarytraining = this.userdata.data.Pilot.CullinaryTraining;
          if (this.cullinarytraining) {
            this.cullinarytraining = this.dummyJson.yesno[0].description;
          }
          else {
            this.cullinarytraining = this.dummyJson.yesno[1].description;
          }
          if (this.userdata.data.Pilot.isAircraftSpecificTraining) {
            this.astrainingyes = true;
          }
          else {
            this.astrainingno = true;
          }
          this.dperhour = this.userdata.data.Pilot.DomPDRate;
          this.iperhour = this.userdata.data.Pilot.InterPDRate;
        })
      }
      else if (this.type == "") {
        this.fname = this.userdata.data.Pilot.PilotFname;
        this.lname = this.userdata.data.Pilot.PilotLname;
        this.photo = this.userdata.data.Pilot.PhotoPath;
        //this.mtype = this.dummyJson.mtype[0].description;
      }


    })
  }
  // }

  updatedata() {
    this.provider.setloading();
    var fkid;
    var location;
    var passport;
    if (this.clocation == 'On') {
      location = true;
    }
    else {
      location = false
    }
    if (this.experience == 'International') {
      this.expid = '1';
    }
    else {
      this.expid = '2';
    }
    if (this.passport == "Yes") {
      passport = true;
    }
    else {
      passport = false;
    }
    // For Owner operator update data
    if (this.type == 'Owner Operator') {
      console.log(this.userdata);
      if (this.userdata.data.Pilot.fkMemberShipId == "" || this.userdata.data.Pilot.fkMemberShipId == undefined || this.userdata.data.Pilot.fkMemberShipId == null) {
        this.storage.set('usertype', 'Owner Operator');
        fkid = "1";
      }
      else {
        fkid = this.userdata.data.Pilot.fkMemberShipId;
      }
      console.log(fkid);
      console.log(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, location, "", fkid, this.cname, this.photo);
      this.provider.updateowenerop(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, location, "", fkid, this.cname, this.photo).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert();
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }

      })
    }

    // For instructor update data
    else if (this.type == 'Instructor') {
      if (this.iinstructorno == true) {
        this.instrumentinstructor = false;
      }
      else if (this.iinstructoryes == true) {
        this.instrumentinstructor = true;
      }
      if (this.meinstructorno == true) {
        this.multiengineinstructor = false;
      }
      else if (this.meinstructoryes == true) {
        this.multiengineinstructor = true;
      }
      if (this.twinstructorno == true) {
        this.tailwheelinstrunctor = false;
      }
      else if (this.twinstructoryes == true) {
        this.tailwheelinstrunctor = true;
      }
      if (this.ainstructorno == true) {
        this.acrobaticsinstrunctor = false;
      }
      else if (this.ainstructoryes == true) {
        this.acrobaticsinstrunctor = true;
      }
      if (this.userdata.data.Pilot.fkMemberShipId == "" || this.userdata.data.Pilot.fkMemberShipId == undefined || this.userdata.data.Pilot.fkMemberShipId == null) {
        fkid = "2";
      }
      else {
        fkid = this.userdata.data.Pilot.fkMemberShipId;
      }
      this.provider.updateinstructor(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, fkid, this.phoneno, this.ttime, this.dgiven, this.medicalclass, "", this.airexp, this.avionicsexpid, this.passfail, this.instrumentinstructor, this.multiengineinstructor, this.ctime, this.hptime, this.tailwheelinstrunctor, this.acrobaticsinstrunctor, "", this.dperhour, "", this.iperhour, this.photo,this.pictime).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert();
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }
      })
    }

    // For Pilot and SIC update data

    else if (this.type == 'Pilot' || this.type == 'Second In Command') {
      if (this.mstrainingno == true) {
        this.simulatortraining = false;
      }
      else if (this.mstrainingyes == true) {
        this.simulatortraining = true;
      }
      if (this.userdata.data.Pilot.fkMemberShipId == "" || this.userdata.data.Pilot.fkMemberShipId == undefined || this.userdata.data.Pilot.fkMemberShipId == null) {
        if (this.type == 'Pilot') {
          fkid = "3";
        }
        else if (this.type == 'Second In Command') {
          fkid = "5";
        }

      }
      else {
        fkid = this.userdata.data.Pilot.fkMemberShipId;
      }
      this.provider.updatepilot(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, "", location, "", fkid, this.phoneno, this.ttime, this.medicalclass, "", passport, "", this.passportexpdate, this.country, this.expid, this.selectedcontinents, this.selectedociens, this.airexp, this.avionicsexpid, this.msg, this.simulatortraining, this.photo,this.pictime).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert();
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }
      })

    }

    else if (this.type == 'Flight Attendant') {
      var passport1;
      var regexp;
      var uspass;
      var cprtrain;
      var ctrain;
      var strain;
      if (this.astrainingno == true) {
        this.aircraftspecifictraining = false;
      }
      else if (this.astrainingyes == true) {
        this.aircraftspecifictraining = true;
      }
      if (this.mstrainingno == true) {
        this.simulatortraining = false;
      }
      else if (this.mstrainingyes == true) {
        this.simulatortraining = true;
      }
      if (this.passport == "Yes") {
        passport1 = true;
      }
      else if (this.passport == "No") {
        passport1 = false;
      }

      if (this.regionexp == "Yes") {
        regexp = true;
      }
      else if (this.regionexp == "No") {
        regexp = false;
      }

      if (this.unrestricteduspass == "Yes") {
        uspass = true;
      }
      else if (this.unrestricteduspass == "No") {
        uspass = false;
      }

      if (this.cprtraining == "Yes") {
        cprtrain = true;
      }
      else if (this.cprtraining == "No") {
        cprtrain = false;
      }

      if (this.cullinarytraining == "Yes") {
        ctrain = true;
      }
      else if (this.cullinarytraining == "No") {
        ctrain = false;
      }

      if (this.specialtraining == "Yes") {
        strain = true;
      }
      else if (this.specialtraining == "No") {
        strain = false;
      }
      if (this.userdata.data.Pilot.fkMemberShipId == "" || this.userdata.data.Pilot.fkMemberShipId == undefined || this.userdata.data.Pilot.fkMemberShipId == null) {
        fkid = "4";
      }
      else {
        fkid = this.userdata.data.Pilot.fkMemberShipId;
      }
      this.provider.updateflightatt(this.userdata.data.Pilot.pkPilotId, fkid, this.fname, this.lname, regexp, uspass, this.country, cprtrain, this.airexp, ctrain, this.selectedlanguage, this.selectedcontinents, strain, this.simulatortraining, this.yexp, passport1, this.aircraftspecifictraining, this.dperhour, this.iperhour, this.photo, this.phoneno).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert();
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }
      })
    }
  }


  selectaircraft(event) {
    this.app.getRootNav().push('SelectaircraftPage', { 'selectedaircraft': this.airexp, 'type': 'aircraft', animate: false });
  }

  selectavionics() {
    this.app.getRootNav().push('AvionicsexpselectPage', { animate: false });
  }

  selectcountries(event) {
    this.app.getRootNav().push('CountryselectPage', { 'selectedcountry': this.selectedcountry, animate: false });
  }
  selectlanguage() {
    this.app.getRootNav().push('SelectaircraftPage', { 'selectedlanguage': this.selectedlanguage, 'type': 'language', animate: false });
  }
  selectcontinents() {
    this.app.getRootNav().push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.selectedcontinents, animate: false });
  }

  selectociens() {
    this.app.getRootNav().push('SelectcontinentPage', { 'oceansdata': this.ocienselist, 'selectedocens': this.selectedociens, 'isociense': true, animate: false });
  }

  openpicker(type) {
    if (type == 'loc') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.onoff
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.onoff[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.clocation = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'medical') {
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
          this.medicalclass = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'passport') {
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
          this.passport = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'exp') {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.experience
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.experience[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.experience = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'rexp') {
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
          this.regionexp = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'upassport') {
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
    else if (type == 'cptraining') {
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
          this.cprtraining = result[0].description;

        },
        err => console.log('Error: ', err)
      );
    }
    else if (type == 'ctrain') {
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
    }

    else if (type == "member") {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.mtype
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.mtype[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.mtype = result[0].description;
          this.type = result[0].description;
          this.fkMembershipId = result[0].id;
          // alert(this.fkMembershipId);

        },
        err => console.log('Error: ', err)
      );
    }


  }

  cheboxcheck(op, event) {

    if (op == 'iiy') {
      if (event.checked == true) {
        this.iinstructorno = false;
        this.iinstructoryes = true;
      }
      else {
        this.iinstructorno = true;
        this.iinstructoryes = false;
      }
    }
    else if (op == 'iin') {
      if (event.checked == true) {
        this.iinstructorno = true;
        this.iinstructoryes = false;
      } else {
        this.iinstructorno = false;
        this.iinstructoryes = true;
      }
    }
    else if (op == 'mey') {
      if (event.checked == true) {
        this.meinstructorno = false;
        this.meinstructoryes = true;
      }
      else {
        this.meinstructorno = true;
        this.meinstructoryes = false;
      }
    }
    else if (op == 'men') {
      if (event.checked == true) {
        this.meinstructorno = true;
        this.meinstructoryes = false;
      } else {
        this.meinstructorno = false;
        this.meinstructoryes = true;
      }
    }
    else if (op == 'twy') {
      if (event.checked == true) {
        this.twinstructorno = false;
        this.twinstructoryes = true;
      }
      else {
        this.twinstructorno = true;
        this.twinstructoryes = false;
      }
    }
    else if (op == 'twn') {
      if (event.checked == true) {
        this.twinstructorno = true;
        this.twinstructoryes = false;
      } else {
        this.twinstructorno = false;
        this.twinstructoryes = true;
      }
    }
    else if (op == 'aiy') {
      if (event.checked == true) {
        this.ainstructorno = false;
        this.ainstructoryes = true;
      }
      else {
        this.ainstructorno = true;
        this.ainstructoryes = false;
      }
    }
    else if (op == 'ain') {
      if (event.checked == true) {
        this.ainstructorno = true;
        this.ainstructoryes = false;
      } else {
        this.ainstructorno = false;
        this.ainstructoryes = true;
      }
    }
    else if (op == 'asy') {
      if (event.checked == true) {
        this.astrainingno = false;
        this.astrainingyes = true;
      }
      else {
        this.astrainingno = true;
        this.astrainingyes = false;
      }
    }
    else if (op == 'asn') {
      if (event.checked == true) {
        this.astrainingno = true;
        this.astrainingyes = false;
      } else {
        this.astrainingno = false;
        this.astrainingyes = true;
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
      } else {
        this.mstrainingno = false;
        this.mstrainingyes = true;
      }
    }
  }

  addrating() {
    console.log('click');
    this.app.getRootNav().push('DispcurrentratingPage', { 'classdata': this.masterdata.data.AirCraftClass, 'aircraftdata': this.masterdata.data.AirCraft });
  }
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Data updated successfully!',
      buttons: ['OK']
    });
    alert.present();
  }

  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Error occured!',
      buttons: ['OK']
    });
    alert.present();
  }


  updaterating(data) {
    this.app.getRootNav().push('AddratingPage', { 'editdata': data, 'classdata': this.classdata, 'aircraftdata': this.aircraftdata, 'isedit': true });
  }

  back() {
    console.log(this.currentprofiledata);
    this.currentprofiledata = this.provider.getcurrentuserdata();
    this.navCtrl.pop().then(() => {
      this.events.publish('userdata', this.currentprofiledata);
    });
  }

  chating() {
    console.log(this.chatoppositeid);
    this.navCtrl.push('ChatpagePage', { 'oppositeid': this.chatoppositeid });
  }

  ionViewWillLeave() {

  }
}
import { Component, Input, ViewChild } from '@angular/core';
import { IonicPage, NavController, Content, ModalController, NavParams, Events, App, Platform, ToastController, ActionSheetController, AlertController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { Storage } from '@ionic/storage';
//import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
import { GalleryModal } from 'ionic-gallery-modal';
import {
  Plugins,
  PushNotification,
  PushNotificationToken,
  PushNotificationActionPerformed,
  CameraResultType
} from '@capacitor/core';

const { PushNotifications, LocalNotifications, Camera } = Plugins;
// import * as $ from 'jquery';
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
  @ViewChild('scrollArea') mainContent: Content;
  gender: any;
  selectedcullinarytraining: any;
  cullinaryothertraining: any;
  selectedtraining: any;
  othertraining: any;
  countryname: any;
  userdata: any;
  intro: any;
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
  airtrainexp: any;
  trainingairexp: any;
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
  selectedregion: any;
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
  trainaircraftdata: any[] = [];
  avionicsdata: any;
  languagedata: any;
  classdata: any;
  internationalvisa: any;
  response: any;
  isedit: any;
  isgender: any;
  chatoppositeid: any;
  rate: any = 0;
  _rateYo: any;
  CullinaryName: any;
  SpecialtrainedName: any;
  captureDataUrl1: any;
  captureDataUrl2: any;
  captureDataUrl3: any;
  captureDataUrl4: any;
  captureDataUrl5: any;
  captureDataUrl6: any;
  private photos: any[] = [];
  faimages: any[] = [];
  call: any;
  fapic: any;
  phoneNumber: any = "";
  dummyJson = {
    onoff: [
      { description: 'ON' },
      { description: 'OFF' }
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
      { description: 'Flight Attendant', id: '4' }
      // { description: 'Second In Command', id: '5' }
    ],
    gendertype: [
      { description: 'Male' },
      { description: 'Female' }
    ],
  }
  constructor(private toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams, private selector: WheelSelector, public events: Events, public provider: AuthproviderProvider, public app: App, public sharedservice: SharedserviceProvider, public alertCtrl: AlertController, public storage: Storage, public actionSheetCtrl: ActionSheetController, public platform: Platform, public file: File, public filePath: FilePath, private modalCtrl: ModalController) {

    // phone number masking
    this.masks = {
      phoneno: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
    };

    console.log(this.trainaircraftdata);

    this.isedit = this.navParams.get('isedit');
    this.isgender = this.navParams.get('isgender');
    this.chatoppositeid = this.navParams.get('oppositeid');
    if (this.isedit == false) {
      this.disableonactive = true;
    }

    console.log(this.CullinaryName);
  }




  ionViewDidLoad() {
    this.provider.setloading();

    // get the rating certifiate
    this.events.subscribe('ratingcerti', val => {

      console.log(val);
      this.certificationdata = val;
      this.certificationdata = this.certificationdata.data.RatingCertificate;
    })

    // get aircraft data
    this.events.subscribe('selectdata', res => {
      if (res != undefined) {
        this.airexp = res;
      }

    })
    // get selected aircraft training data
    this.events.subscribe('selecttraindata', res => {
      if (res != undefined) {
        this.airtrainexp = res;
      }
    })

    // get oceanics data
    this.events.subscribe('oceansdata', res => {
      if (res != undefined) {
        this.selectedociens = res;
      }


    })

    // get continent data
    this.events.subscribe('continentdata', res => {
      if (res != undefined) {
        this.selectedcontinents = res;
      }


    })

    // get avionics exp
    this.events.subscribe('selectav', res => {
      if (res != undefined) {
        this.avionicsexp = res;

      }
      else {
        this.avionicsexp = "";

      }
    })

    // get country data
    this.events.subscribe('countrydata', res => {
      if (res != undefined) {
        this.country = res;
        console.log(this.country);
      }

    })

    // get language data
    this.events.subscribe('languagedata', res => {
      if (res != undefined) {
        this.selectedlanguage = res;
      }

    })

    // get userdata from tab page


    this.events.subscribe('userdata', val => {
      console.log('profile page data', val);
      this.userdata = val;
      this.type = this.userdata.data.Pilot.MemberShipType;
      if (this.userdata.data.Pilot.ratingCount !== "") {
        this.rate = this.userdata.data.Pilot.ratingCount;
        // this.rate = Math.round(parseFloat(this.rate));
      }
      else {
        this.rate = this.userdata.data.Pilot.ExtraField1;
        // this.rate = Math.round(parseFloat(this.rate));
      }

      console.log(this.rate);
      var that = this;
    })
    this.call = setInterval(() => {
      console.log("demo test");
      if (this.provider.gettraindata() && this.provider.getmasterdata()) {
        this.trainaircraftdata = this.provider.gettraindata();
        this.masterdata = this.provider.getmasterdata();
        this.countrydata = this.masterdata.data.Countries;
        this.aircraftdata = this.masterdata.data.AirCraft;
        this.trainaircraftdata = this.masterdata.data.AirCraft2;
        //this.provider.settraindata(this.masterdata.data.AirCraft );
        this.avionicsdata = this.masterdata.data.AvionicsExperience;
        this.languagedata = this.masterdata.data.Languages;
        this.classdata = this.masterdata.data.AirCraftClass;
        var expdata = this.masterdata.data.SpecialtrainedName;
        this.SpecialtrainedName = this.masterdata.data.SpecialtrainedName;
        console.log(this.SpecialtrainedName);
        this.CullinaryName = this.masterdata.data.CullinaryName;


        // get Owner data

        if (this.type == 'Owner Operator') {
          this.mtype = this.type;
          this.fname = this.userdata.data.Pilot.PilotFname;
          this.lname = this.userdata.data.Pilot.PilotLname;
          this.gender = this.userdata.data.Pilot.PilotGender;
          this.cname = this.userdata.data.Pilot.CompanyName;
          this.photo = this.userdata.data.Pilot.PhotoPath;
          this.clocation = this.userdata.data.Pilot.CurrentLocation;
          if (this.clocation == true) {
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
          this.gender = this.userdata.data.Pilot.PilotGender;
          this.pictime = this.userdata.data.Pilot.TotalPICTime;
          this.photo = this.userdata.data.Pilot.PhotoPath;
          this.medicalclass = this.userdata.data.Pilot.FAAMedical;
          this.avionicsexpid = this.userdata.data.Pilot.fkAvionicsExperienceId;
          if (this.airexp != undefined) {
            this.sharedservice.getaircraftchklist(this.aircraftdata, this.airexp);
          }
          // this.avionicsexp = this.userdata.data.Pilot.AvionicsExperienceType;
          this.avionicsexp = this.userdata.data.Pilot.fkAvionicsExperienceId;
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
            this.gender = this.userdata.data.Pilot.PilotGender;
            this.fname = this.userdata.data.Pilot.PilotFname;
            this.lname = this.userdata.data.Pilot.PilotLname;
            this.clocation = this.userdata.data.Pilot.CurrentLocation;
            this.photo = this.userdata.data.Pilot.PhotoPath;
            console.log(this.clocation)
            if (this.clocation == true) {
              this.clocation = this.dummyJson.onoff[0].description;
            }
            else {
              this.clocation = this.dummyJson.onoff[1].description;
            }
            console.log(this.clocation)
            this.phoneno = this.userdata.data.Pilot.cellNumber;
            this.email = this.userdata.data.Pilot.EmailId;
            this.ttime = this.userdata.data.Pilot.TotalTime;
            this.pictime = this.userdata.data.Pilot.TotalPICTime;
            this.medicalclass = this.userdata.data.Pilot.FAAMedical;
            this.passport = this.userdata.data.Pilot.HavePassport;
            console.log(this.passport);
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
            this.gender = this.userdata.data.Pilot.PilotGender;
            this.fname = this.userdata.data.Pilot.PilotFname;
            this.lname = this.userdata.data.Pilot.PilotLname;
            this.yexp = this.userdata.data.Pilot.yearOfExperiance;
            this.phoneno = this.userdata.data.Pilot.cellNumber;
            this.email = this.userdata.data.Pilot.EmailId;
            this.photo = this.userdata.data.Pilot.PhotoPath;
            if (this.userdata.data.Pilot.FAImage1 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage1);
              this.captureDataUrl1 = this.userdata.data.Pilot.FAImage1;
            }
            if (this.userdata.data.Pilot.FAImage2 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage2);
              this.captureDataUrl2 = this.userdata.data.Pilot.FAImage2;
            }
            if (this.userdata.data.Pilot.FAImage3 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage3);
              this.captureDataUrl3 = this.userdata.data.Pilot.FAImage3;
            }
            if (this.userdata.data.Pilot.FAImage4 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage4);
              this.captureDataUrl4 = this.userdata.data.Pilot.FAImage4;
            }
            if (this.userdata.data.Pilot.FAImage5 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage5);
              this.captureDataUrl5 = this.userdata.data.Pilot.FAImage5;
            }
            if (this.userdata.data.Pilot.FAImage6 != "") {
              this.faimages.push(this.userdata.data.Pilot.FAImage6);
              this.captureDataUrl6 = this.userdata.data.Pilot.FAImage6;
            }
            // if (this.regionexp) {
            //   this.regionexp = this.dummyJson.yesno[0].description;
            // }
            // else {
            //   this.regionexp = this.dummyJson.yesno[1].description;
            // }
            if (this.userdata.data.Pilot.IsReqPrev12MonthTraining == true) {
              this.mstrainingyes = true;
              this.mstrainingno = false;
            }
            else {
              this.mstrainingyes = false;
              this.mstrainingno = true;
            }
            this.unrestricteduspass = this.userdata.data.Pilot.CurrentUnrestrictedUSPass;
            if (this.unrestricteduspass == true) {
              this.unrestricteduspass = this.dummyJson.yesno[0].description;
            }
            else {
              this.unrestricteduspass = this.dummyJson.yesno[1].description;
            }
            this.airexp = this.userdata.data.Pilot.AircraftType;
            if (this.airexp != undefined) {
              console.log("called");

              this.sharedservice.getaircraftchklist(this.aircraftdata, this.airexp);


            }

            this.airtrainexp = this.userdata.data.Pilot.TrainAircraftList;
            if (this.airtrainexp != undefined) {
              this.sharedservice.gettrainaircraftchklist(this.trainaircraftdata, this.airtrainexp);
              console.log(this.trainaircraftdata);
            }
            this.internationalvisa = this.userdata.data.Pilot.InternationalVisas;
            if (this.internationalvisa == 'true') {
              this.internationalvisa = this.dummyJson.yesno[0].description;
            }
            else {
              this.internationalvisa = this.dummyJson.yesno[1].description;
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


            this.selectedcullinarytraining = this.userdata.data.Pilot.Cullinary;
            this.cullinaryothertraining = this.userdata.data.Pilot.CullinaryOther;
            this.selectedtraining = this.userdata.data.Pilot.SpecialTrained;
            this.selectedtraining = this.selectedtraining.split(',');
            this.selectedregion = this.userdata.data.Pilot.RegionExp;
            this.selectedregion = this.selectedregion.split(',');
            this.othertraining = this.userdata.data.Pilot.SpecialTrainedOther;

          })
        }
        else if (this.type == "") {
          this.fname = this.userdata.data.Pilot.PilotFname;
          this.lname = this.userdata.data.Pilot.PilotLname;
          this.photo = this.userdata.data.Pilot.PhotoPath;
          //this.mtype = this.dummyJson.mtype[0].description;
        }
        this.provider.dismissloading();
        clearInterval(this.call);

      }

    }, 5000);


  }

  ionViewWillEnter() {

  }
  // }

  updatedata() {
    console.log(this.selectedregion)
    this.provider.setloading();
    var fkid;
    var location;
    var passport;
    if (this.clocation == 'ON') {
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
      console.log(this.country);
      if (this.userdata.data.Pilot.fkMemberShipId == "" || this.userdata.data.Pilot.fkMemberShipId == undefined || this.userdata.data.Pilot.fkMemberShipId == null) {
        this.storage.set('usertype', 'Owner Operator');
        fkid = "1";
      }
      else {
        fkid = this.userdata.data.Pilot.fkMemberShipId;
      }
      console.log(fkid);
      console.log(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, location, "", fkid, this.cname, this.photo);
      // this.storage.get('country').then(val => {

      this.countryname = localStorage.getItem("country");
      console.log(this.countryname)


      this.provider.updateowenerop(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, location, this.countryname, fkid, this.cname, this.photo, this.gender).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert('Owner Operator');
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }

      })
      // })
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
      if (this.iperhour == undefined || this.iperhour == null || this.iperhour == "") {
        this.iperhour = "0";
      }
      this.provider.updateinstructor(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, fkid, this.phoneno, this.ttime, this.dgiven, this.medicalclass, "", this.airexp, this.avionicsexp, this.passfail, this.instrumentinstructor, this.multiengineinstructor, this.ctime, this.hptime, this.tailwheelinstrunctor, this.acrobaticsinstrunctor, "", this.dperhour, "", this.iperhour, this.photo, this.pictime, this.gender).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert('Instructor');
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
      // this.storage.get('country').then(val => {

      this.countryname = localStorage.getItem("country");
      console.log(this.countryname)
      this.provider.updatepilot(this.userdata.data.Pilot.pkPilotId, this.fname, this.lname, "", location, this.countryname, fkid, this.phoneno, this.ttime, this.medicalclass, "", passport, "", this.passportexpdate, this.country, this.expid, this.selectedcontinents, this.selectedociens, this.airexp, this.avionicsexpid, this.msg, this.simulatortraining, this.photo, this.pictime, this.gender).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert('Pilot');
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }
      })
      // })

    }

    // for FA data update
    else if (this.type == 'Flight Attendant') {
      var passport1;
      var regexp;
      var uspass;
      var cprtrain;
      var ctrain;
      var strain;
      var ivisa;
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

      if (this.internationalvisa == "Yes") {
        ivisa = true;
      }
      else if (this.internationalvisa == "No") {
        ivisa = false;
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
      var fselectedtraining = this.selectedtraining.join();
      var fselectedegion = this.selectedregion.join();
      this.provider.updateflightatt(this.userdata.data.Pilot.pkPilotId, fkid, this.fname, this.lname, regexp, uspass, ivisa, cprtrain, this.airexp, ctrain, this.selectedlanguage, this.selectedcontinents, strain, this.simulatortraining, this.yexp, passport1, this.aircraftspecifictraining, this.dperhour, this.iperhour, this.photo, this.phoneno, this.gender, this.airtrainexp, this.selectedcullinarytraining, this.cullinaryothertraining, fselectedtraining, this.othertraining, fselectedegion).subscribe(res => {
        this.response = res;
        if (this.response.Code == 200) {
          if (this.response.data != null) {
            this.provider.dismissloading();
            console.log(res);
            this.events.publish('userdataupdate', res);
            this.showAlert('Flight Attendant');
          }
        }
        else {
          this.provider.dismissloading();
          this.errorAlert();
        }
      })
    }
  }

  // method call when click on aircraft
  selectaircraft(event) {
    console.log(this.airexp);
    this.app.getRootNav().push('SelectaircraftPage', { 'selectedaircraft': this.airexp, 'type': 'aircraft', animate: true });
  }

  // click on avionics
  selectavionics() {
    this.app.getRootNav().push('AvionicsexpselectPage', { 'selectedav': this.avionicsexp, animate: true });
  }

  // click on countries
  selectcountries(event) {
    this.app.getRootNav().push('CountryselectPage', { 'selectedcountry': this.selectedcountry, animate: true });
  }

  //click on langauge
  selectlanguage() {
    this.app.getRootNav().push('SelectaircraftPage', { 'selectedlanguage': this.selectedlanguage, 'type': 'language', animate: true });
  }
  // click on continents
  selectcontinents() {
    this.app.getRootNav().push('SelectcontinentPage', { 'continetdata': this.continentlist, 'selectedcontinent': this.selectedcontinents, animate: true });
  }

  // click on oceanic
  selectociens() {
    this.app.getRootNav().push('SelectcontinentPage', { 'oceansdata': this.ocienselist, 'selectedocens': this.selectedociens, 'isociense': true, animate: true });
  }

  // select value from wheel selector

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
    else if (type == 'internationalvisa') {
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
          this.internationalvisa = result[0].description;

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
    else if (type == "gender") {
      this.selector.show({
        title: "",
        items: [
          this.dummyJson.gendertype
        ],
        defaultItems: [
          { index: 0, value: this.dummyJson.gendertype[0].description }
        ],
      }).then(
        result => {
          console.log(result[0].description + ' at index: ' + result[0].index);
          this.gender = result[0].description;
        },
        err => console.log('Error: ', err)
      );
    }

  }

  // checkbox method to get true or false

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

  // click on rating to add rating certificate
  addrating() {
    console.log('click');
    this.app.getRootNav().push('DispcurrentratingPage', { 'classdata': this.masterdata.data.AirCraftClass, 'aircraftdata': this.masterdata.data.AirCraft });
  }

  // display dialog
  showAlert(val) {
    const alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'Data updated successfully!',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            if (val == 'Instructor' || val == 'Pilot' || val == 'Second In Command') {
              this.storage.get('introslideprofile').then(val => {
                this.intro = val;
                if (this.intro == null || this.intro == undefined || this.intro == "") {
                  this.storage.set("introslideprofile", true);
                  let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "profile" });
                  profileModal.present();
                }
                else {

                }
              })
            }
            else {
              this.storage.get('introslideprofile1').then(val => {
                this.intro = val;
                if (this.intro == null || this.intro == undefined || this.intro == "") {
                  this.storage.set("introslideprofile1", true);
                  let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "profile1" });
                  profileModal.present();
                }
                else {

                }
              })
            }
          }

        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();


  }

  // display error dialog
  errorAlert() {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      subTitle: 'Error occured!',
      buttons: ['OK']
    });
    alert.present();
  }


  // update rating certificate
  updaterating(data) {
    this.app.getRootNav().push('AddratingPage', { 'editdata': data, 'classdata': this.classdata, 'aircraftdata': this.aircraftdata, 'isedit': true });
  }

  // back button press method

  back() {
    console.log(this.currentprofiledata);
    this.currentprofiledata = this.provider.getcurrentuserdata();
    this.navCtrl.pop().then(() => {
      this.events.publish('userdata', this.currentprofiledata);
    });
  }

  // open chat page for chatting
  chating() {
    console.log(this.chatoppositeid);
    if (this.chatoppositeid == undefined) {
      this.chatoppositeid = this.userdata.data.Pilot.pkPilotId;
    }
    this.navCtrl.push('ChatpagePage', { 'oppositeid': this.chatoppositeid });
  }

  // method for select aircraft
  selecttrainaircraft() {
    this.app.getRootNav().push('SelectaircraftPage', { 'selectedaircraft': this.airtrainexp, 'type': 'trainaircraft', animate: true });
  }

  // scroll issue method to enable or disable scroll
  getfocus() {
    this.setDisableScroll(true);
  }
  getblur() {
    this.setDisableScroll(false);
  }
  private setDisableScroll(disable: boolean) {
    let scroll = this.mainContent.getScrollElement();
    scroll.style.overflowY = disable ? 'hidden' : 'scroll';
  }

  // method for FA photo upload

  async presentActionSheet(val) {
    if (this["captureDataUrl" + val] == undefined || this["captureDataUrl" + val] == "" || this["captureDataUrl" + val] == null) {

      const image = await Camera.getPhoto({
        quality: 50,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      // image.webPath will contain a path that can be set as an image src. 
      // You can access the original file using image.path, which can be 
      // passed to the Filesystem API to read the raw data of the image, 
      // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
      console.log(image);
      var imageUrl = image.dataUrl;
      console.log(imageUrl);
      this.fapic = "";
      var f1;
      var f2;
      var f3;
      var f4;
      var f5;
      var f6;
      let string = imageUrl.split(',');
      let img = string[1];
      if (val == 1) {
        f1 = img;
      }
      if (val == 2) {
        f2 = img;
      }
      if (val == 3) {
        f3 = img;
      }
      if (val == 4) {
        f4 = img;
      }
      if (val == 5) {
        f5 = img;
      }
      if (val == 6) {
        f6 = img;
      }
      this.provider.setloading();
      this.provider.uploadfaimages(this.userdata.data.Pilot.pkPilotId, val, f1, f2, f3, f4, f5, f6).subscribe(res => {
        console.log(res);
        this.fapic = res;
        console.log(res);
        if (val == 1) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage1;
          this.faimages.splice(0, 0, this.fapic.data.Pilot.FAImage1);
        }
        if (val == 2) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage2;
          this.faimages.splice(1, 0, this.fapic.data.Pilot.FAImage2);
        }
        if (val == 3) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage3;
          this.faimages.splice(2, 0, this.fapic.data.Pilot.FAImage3);
        }
        if (val == 4) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage4;
          this.faimages.splice(3, 0, this.fapic.data.Pilot.FAImage4);
        }
        if (val == 5) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage5;
          this.faimages.splice(4, 0, this.fapic.data.Pilot.FAImage5);
        }
        if (val == 6) {
          this["captureDataUrl" + val] = this.fapic.data.Pilot.FAImage6;
          this.faimages.splice(5, 0, this.fapic.data.Pilot.FAImage6);
        }
        this.provider.dismissloading();
      })



    }
  }



  // get images from api to display in modal for FA
  getimg(index) {
    if (this["captureDataUrl" + index] != undefined) {
      index = index - 1;
      this.createphotos();
      let modal = this.modalCtrl.create(GalleryModal, {
        photos: this.photos,
        initialSlide: index
      });
      modal.present();
    }
  }

  // add photos in modal to display for FA
  createphotos() {

    console.log(this.faimages.length);
    if (this.faimages.length != 0) {
      for (let i = 0; i < this.faimages.length; i++) {
        this.photos.push({
          url: this.faimages[i],
        });
      }
      console.log(this.photos);
      this.faimages = [];
    }
    else {

    }
  }

  // remove FA photo alert
  remove(val) {
    this.presentConfirm(val);
  }

  // remove photo from FA gallery
  presentConfirm(val) {
    let alert = this.alertCtrl.create({
      message: 'Do you want to delete photo?',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            console.log(val);
            var f1;
            var f2;
            var f3;
            var f4;
            var f5;
            var f6;


            if (val == 1) {
              f1 = "";
              f2 = this.captureDataUrl2;
              f3 = this.captureDataUrl3;
              f4 = this.captureDataUrl4;
              f5 = this.captureDataUrl5;
              f6 = this.captureDataUrl6;
            }
            if (val == 2) {
              f1 = this.captureDataUrl1;
              f2 = "";
              f3 = this.captureDataUrl3;
              f4 = this.captureDataUrl4;
              f5 = this.captureDataUrl5;
              f6 = this.captureDataUrl6;
            }
            if (val == 3) {
              f1 = this.captureDataUrl1;
              f2 = this.captureDataUrl2;
              f3 = "";
              f4 = this.captureDataUrl4;
              f5 = this.captureDataUrl5;
              f6 = this.captureDataUrl6;
            }
            if (val == 4) {
              f1 = this.captureDataUrl1;
              f2 = this.captureDataUrl2;
              f3 = this.captureDataUrl3;
              f4 = "";
              f5 = this.captureDataUrl5;
              f6 = this.captureDataUrl6;
            }
            if (val == 5) {
              f1 = this.captureDataUrl1;
              f2 = this.captureDataUrl2;
              f3 = this.captureDataUrl3;
              f4 = this.captureDataUrl4;
              f5 = "";
              f6 = this.captureDataUrl6;
            }
            if (val == 6) {
              f1 = this.captureDataUrl1;
              f2 = this.captureDataUrl2;
              f3 = this.captureDataUrl3;
              f4 = this.captureDataUrl4;
              f5 = this.captureDataUrl5;
              f6 = "";
            }
            this.provider.setloading();
            this.provider.uploadfaimages(this.userdata.data.Pilot.pkPilotId, val, f1, f2, f3, f4, f5, f6).subscribe(res => {
              console.log(res);
              this.fapic = res;
              console.log(res);
              this.faimages = [];
              if (this.fapic.data.Pilot.FAImage1 != null) {
                this.captureDataUrl1 = this.fapic.data.Pilot.FAImage1;
                this.faimages.push(this.fapic.data.Pilot.FAImage1);
              }
              if (this.fapic.data.Pilot.FAImage2 != null) {
                this.captureDataUrl2 = this.fapic.data.Pilot.FAImage2;
                this.faimages.push(this.fapic.data.Pilot.FAImage2);
              }
              if (this.fapic.data.Pilot.FAImage3 != null) {
                this.captureDataUrl3 = this.fapic.data.Pilot.FAImage3;
                this.faimages.push(this.fapic.data.Pilot.FAImage3);
              }
              if (this.fapic.data.Pilot.FAImage4 != null) {
                this.captureDataUrl4 = this.fapic.data.Pilot.FAImage4;
                this.faimages.push(this.fapic.data.Pilot.FAImage4);
              }
              if (this.fapic.data.Pilot.FAImage5 != null) {
                this.captureDataUrl5 = this.fapic.data.Pilot.FAImage5;
                this.faimages.push(this.fapic.data.Pilot.FAImage5);
              }
              if (this.fapic.data.Pilot.FAImage6 != null) {
                this.captureDataUrl6 = this.fapic.data.Pilot.FAImage6;
                this.faimages.push(this.fapic.data.Pilot.FAImage6);
              }


              this.provider.dismissloading();
            })


          }
        }
      ]
    });
    alert.present();
  }

}
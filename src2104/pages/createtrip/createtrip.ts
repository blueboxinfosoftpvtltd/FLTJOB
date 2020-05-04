import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ViewController } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { ProfilePage } from '../profile/profile';
import { SharedserviceProvider } from '../../providers/sharedservice/sharedservice';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
/**
 * Generated class for the CreatetripPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-createtrip',
  templateUrl: 'createtrip.html',
})
export class CreatetripPage {
  select = {
    radius: [
      { description: 'Select Radius' },
      { description: '50Miles' },
      { description: '100Miles' },
      { description: '150Miles' },
      { description: '200Miles' },
      { description: '250Miles' },
      { description: '300Miles' },
      { description: '350Miles' },
      { description: '400Miles' },
      { description: '450Miles' },
      { description: '500Miles' },
    ],
  }
  radius: any;
  iprofileno: any;
  iprofileyes: any;
  igenderno: any;
  igenderyes: any;
  aircraftdata: any;
  tripname: any;
  daircode: any;
  enaircode: any;
  destaircode: any;
  sdate: any;
  edate: any;
  aircrafttype: any;
  id: any;
  captain: any;
  scommand: any;
  fatt: any;
  fins: any;
  count: any;
  airportcode: any;
  aircraftid: any;
  resdata: any;
  totalcount: any;
  languagedata: any;
  tripform: any;
  ocienselist: any;
  gdata: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public sharedservice: SharedserviceProvider, public view: ViewController, private selector: WheelSelector, public provider: AuthproviderProvider, public storage: Storage) {
    this.gdata = this.provider.gtdata();
    this.aircraftdata = this.provider.getmasterdata();
    this.aircraftdata = this.aircraftdata.data.AirCraft;
    this.tripform = new FormGroup({
      tripname: new FormControl('', Validators.required),
      daircode: new FormControl('', Validators.required),
      enaircode: new FormControl(),
      aircrafttype: new FormControl('', Validators.required),
      destaircode: new FormControl('', Validators.required),
      sdate: new FormControl('', Validators.required),
      edate: new FormControl('', Validators.required),
      radius: new FormControl(),
      isremember: new FormControl()
    })

    localStorage.removeItem("enrouteairportcodelist");

    this.view.setBackButtonText('');
    this.captain = navParams.get('captain');
    this.scommand = navParams.get('scommand');
    this.fatt = navParams.get('fatt');
    this.fins = navParams.get('fins');
    this.count = "50";
    //this.radius = this.select.radius[0].description;
    this.events.subscribe('airdata', res => {
      // this.provider.setloading();
      console.log(res);
      this.totalcount = res;
      this.provider.getAirportCode(this.count).subscribe(res => {

        console.log(res);
        this.airportcode = res;
        if (this.gdata) {
          if (!this.enaircode) {
            this.enaircode = this.gdata.enroute_airportCode;
            this.sharedservice.getairportlist(this.airportcode.data.AirportCode, this.enaircode);
          }
        }
        //this.provider.dismissloading();
      })

    })

    if (this.gdata) {
      this.daircode = this.gdata.DepartureCode;
      this.destaircode = this.gdata.DestinationCode;

      this.aircrafttype = this.gdata.ratingAirCraftType;
      for (let i = 0; i < this.aircraftdata.length; i++) {
        if (this.aircrafttype == this.aircraftdata[i].AircraftType) {
          this.aircraftid = this.aircraftdata[i].pkAircraftId;
        }
      }
      this.radius = this.gdata.nearMeCaptain;
      if (this.radius == 0) {
        this.radius = "";
      }
    }

    this.events.subscribe('departureairportcode', res => {
      this.daircode = res;
    });
    this.events.subscribe('destinationairportcode', res => {
      this.destaircode = res;
    })
    this.events.subscribe('enroute', res => {
      this.enaircode = res;
    })

    this.events.subscribe('aircraftname', res => {
      this.aircrafttype = res[0];
      this.aircraftid = res[1];
    })

    this.storage.get('id').then((val) => {
      this.id = val;
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatetripPage');
  }

  profilecheboxcheck(data, event) {
    console.log(data);
    console.log(event);
    if (data == 'pyes') {
      if (event.checked == true) {
        this.iprofileno = false;
        this.iprofileyes = true;
      }
      else {
        this.iprofileno = true;
        this.iprofileyes = false;
      }
    }
    else if (data == 'pno') {
      if (event.checked == true) {
        this.iprofileno = true;
        this.iprofileyes = false;
      }
      else {
        this.iprofileno = false;
        this.iprofileyes = true;
      }
    }
  }

  gendercheboxcheck(data, event) {
    console.log(data);
    console.log(event)
    if (data == 'gyes') {
      if (event.checked == true) {
        this.igenderno = false;
        this.igenderyes = true;
      }
      else {
        this.igenderno = true;
        this.igenderyes = false;
      }
    }
    else if (data == 'gno') {
      if (event.checked == true) {
        this.igenderno = true;
        this.igenderyes = false;
      }
      else {
        this.igenderno = false;
        this.igenderyes = true;
      }
    }
  }

  selectaircraft() {
    this.navCtrl.push('SelectaircraftPage', { 'aircraftdata': this.aircraftdata, 'selectedaircraft': "", 'type': 'singleaircraft' });
  }

  selectairport(op) {
    this.navCtrl.push('AirportcodePage', { 'codedata': this.airportcode, 'count': this.count, 'category': op });
  }

  isTrip() {
    if (this.tripform.valid) {
      return true;
    }
    else {
      return false;
    }
  }
  openpicker() {

    this.selector.show({
      title: "",
      items: [
        this.select.radius
      ],
      defaultItems: [
        { index: 0, value: this.select.radius[0].description }
      ],
    }).then(
      result => {
        console.log(result[0].description + ' at index: ' + result[0].index);
        if (result[0].description == "Select Radius") {
          this.radius = "";
        }
        else {
          this.radius = result[0].description;
        }


      },
      err => console.log('Error: ', err)
    );
  }

  save() {
    if (this.radius == "Select Radius") {
      this.radius = "";
    }
    this.provider.setloading();
    this.provider.createtrip(this.id, this.tripname, this.daircode, this.enaircode, this.captain, this.scommand, this.fatt, this.fins, this.destaircode, this.sdate, this.edate, this.radius, this.aircraftid).subscribe(res => {
      console.log(res);
      this.resdata = res;
      this.provider.dismissloading();
      if (this.captain == true) {
        this.navCtrl.push('FiltercaptainPage', { 'id': this.id, 'tripid': this.resdata.data.Trip.pkTripId, 'aircraftname': this.aircrafttype, 'captain': this.captain, 'scommand': this.scommand, 'fatt': this.fatt, 'fins': this.fins, 'isprofile': this.iprofileyes, 'isgender': this.igenderyes });

      }
      else if (this.scommand == true) {
        this.navCtrl.push('FiltersicPage', { 'id': this.id, 'tripid': this.resdata.data.Trip.pkTripId, 'aircraftname': this.aircrafttype, 'captain': this.captain, 'fatt': this.fatt, 'fins': this.fins, 'isprofile': this.iprofileyes, 'isgender': this.igenderyes });
      }

      else if (this.fatt == true) {
        this.navCtrl.push('FilterflightattendantPage', { 'id': this.id, 'tripid': this.resdata.data.Trip.pkTripId, 'aircraftname': this.aircrafttype, 'captain': this.captain, 'scommand': this.scommand, 'fins': this.fins, 'isprofile': this.iprofileyes, 'isgender': this.igenderyes });
      }

      else if (this.fins == true) {
        this.navCtrl.push('FilterflightinstructorPage', { 'id': this.id, 'tripid': this.resdata.data.Trip.pkTripId, 'aircraftname': this.aircrafttype, 'isprofile': this.iprofileyes, 'isgender': this.igenderyes });
      }
    })

  }
}

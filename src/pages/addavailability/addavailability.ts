import { Component, NgZone, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Modal, AlertController, ModalController, ModalOptions, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import * as moment from "moment";

/**
 * Generated class for the AddavailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google;
@IonicPage()
@Component({
  selector: 'page-addavailability',
  templateUrl: 'addavailability.html',
})
export class AddavailabilityPage {

  id: any;
  comment: any;
  fromdate: any;
  todate: any;
  city: any;
  address: any;
  autocompleteItems: any;
  GoogleAutocomplete: any;
  autocomplete: any;
  res: any;
  availabilityid: any;
  availabilitydata: any;
  datesarray: any;
  cityname: any;
  constructor(private zone: NgZone, private modal: ModalController, public navCtrl: NavController, public navParams: NavParams, public authprovider: AuthproviderProvider, public storage: Storage, public alertCtrl: AlertController, public events: Events) {

    // get from date from getavailable page
    this.events.subscribe('fromdate', res => {
      this.fromdate = res;
      this.fromdate = moment(this.fromdate).format('MM-DD-YYYY');
    })
    // get to date from getavailable page
    this.events.subscribe('todate', res => {
      this.todate = res;
      this.todate = moment(this.todate).format('MM-DD-YYYY');
    })
    // get dates array from getavailable page
    this.events.subscribe('datesdata', res => {
      this.datesarray = res;
    })
    // get current login id
    this.storage.get('id').then((val) => {
      this.id = val;
      // when edit mode is true
      if (this.navParams.get('edit') == true) {
        this.availabilityid = this.navParams.get('availabilityid');
        this.comment = this.navParams.get('comment');
        this.fromdate = this.navParams.get('fromdate');
        this.todate = this.navParams.get('todate');
        this.city = this.navParams.get('city');
        this.autocomplete.input = this.navParams.get('city');
      }
    });

    // initialze google autocomplete
    this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
    this.autocomplete = { input: '' };
    this.autocompleteItems = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddavailabilityPage');
  }

  // method call when submit button click
  submit() {
    this.res = "";
    if (this.fromdate == undefined || this.fromdate == null || this.fromdate == '') {
      this.showAlert("Pilot", "Please select availabilty date");
    }
    else if (this.todate == undefined || this.todate == null || this.todate == '') {
      this.showAlert("Pilot", "Please select availabilty date");
    } else {
      if (this.navParams.get('edit') == true) {
        this.authprovider.setloading();
        this.authprovider.updateavaialbility(this.availabilityid, this.id, this.comment, this.fromdate, this.todate, this.autocomplete.input, true, false).subscribe(res => {
          this.res = res;
          this.availabilitydata = this.res.data.Pilot.Availability;
          this.authprovider.dismissloading();
          this.events.publish('availabilitydata', this.res.data.Pilot.Availability);
          this.showAlert('Pilot', 'Data updated successfully');
        })
      }
      else {
        this.authprovider.setloading();
        this.authprovider.Insertavailability(this.id, this.comment, this.fromdate, this.todate, this.autocomplete.input, true).subscribe(res => {
          console.log(res);
          this.res = res;
          if (this.res.Code == 200) {
            if (this.res.data != null) {
              this.authprovider.dismissloading();
              this.events.publish('updatednewavailability', this.res.data.Pilot.Availability);
              this.successalert('Pilot', 'Availability added successfully');
            }
            else {
              this.authprovider.dismissloading();
              this.showAlert('Pilot', this.res.msg);
            }
          }
          else {
            this.authprovider.dismissloading();
            this.showAlert('Pilot', 'Error occured!');
          }
        })
      }

    }
  }

  // display alert dialog
  showAlert(title, msg) {
    const alert = this.alertCtrl.create({
      title: "",
      subTitle: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  // display alert dialog
  successalert(title, msg) {
    let alert = this.alertCtrl.create({
      title: "",
      message: msg,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  // openModal() {
  //   const myModalOptions: ModalOptions = {
  //     enableBackdropDismiss: false
  //   };

  //   const myModalData = {
  //     date: 'Paul Halliday'
  //   };

  //   const myModal: Modal = this.modal.create('CalendermodalPage', { data: 'myModalData' }, myModalOptions);

  //   myModal.present();

  //   myModal.onDidDismiss((data) => {
  //     console.log("I have dismissed.");
  //     console.log(data);
  //     this.fromdate = data.data;
  //     this.fromdate = moment(this.fromdate).format("MM/DD/YYYY");
  //   });

  //   myModal.onWillDismiss((data) => {
  //     console.log("I'm about to dismiss");
  //     console.log(data);
  //     this.fromdate = data.data;
  //     this.fromdate = moment(this.fromdate).format("MM/DD/YYYY");
  //   });
  // }

  // openModal1() {

  //   const myModalOptions: ModalOptions = {
  //     enableBackdropDismiss: false
  //   };

  //   const myModalData = {
  //     date: 'Paul Halliday'
  //   };

  //   const myModal: Modal = this.modal.create('CalendermodalPage', { data: 'myModalData' }, myModalOptions);

  //   myModal.present();

  //   myModal.onDidDismiss((data) => {
  //     console.log("I have dismissed.");
  //     console.log(data);
  //     this.todate = data.data;
  //     this.todate = moment(this.todate).format("MM/DD/YYYY");
  //   });

  //   myModal.onWillDismiss((data) => {
  //     console.log("I'm about to dismiss");
  //     console.log(data);
  //     this.todate = data.data;
  //     this.todate = moment(this.todate).format("MM/DD/YYYY");
  //   });
  // }


  // select the search result from autocomplete
  selectSearchResult(item) {
    console.log(item);
    console.log(item.description);
    if (item.description) {
      this.autocomplete.input = item.terms[0].value;
    }
    else {
      this.autocomplete.input = item.CityName;
    }

    console.log(this.autocomplete.input);
    this.autocompleteItems = [];

  }

  // get search result using google autocomplete
  updateSearchResults() {
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
      (predictions, status) => {
        this.autocompleteItems = [];
        this.zone.run(() => {
          console.log(predictions);
          if (predictions !== null) {
            predictions.forEach((prediction) => {
              this.autocompleteItems.push(prediction);
            });
          }
        });
      });
  }


  // click to open calendar page
  opencalendar(ch) {
    if (ch == 'fromdate') {
      this.navCtrl.push('GetavailablePage', { 'isaddavailability': true, 'fromdate': true }).then(() => {
        this.events.publish('datearr', this.datesarray);
      });
    }
    else if (ch == 'todate') {
      this.navCtrl.push('GetavailablePage', { 'isaddavailability': true, 'todate': true }).then(() => {
        this.events.publish('datearr', this.datesarray);
      });
    }

  }
}

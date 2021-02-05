import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Navbar, ModalController, AlertController } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
declare var FCMPlugin;
/**
 * Generated class for the OpenpendingnotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-openpendingnotification',
  templateUrl: 'openpendingnotification.html',
})
export class OpenpendingnotificationPage {
  @ViewChild('navbar') navBar: Navbar;
  isfavorite: any;
  isfav: any;
  favres: any;
  oppositId: any;
  title: any;
  tripid: any;
  res: any;
  notificationlist: any[] = [];
  aircraft: any;
  rate: any;
  enroutecode: any;
  depcode: any;
  descode: any;
  tsdate: any;
  tedate: any;
  usertype: any;
  tempdata: any;
  id: any;
  displaydata: boolean = false;
  pendingdata: any;
  isPending: any;
  currentdata: any;
  isCurrent: any;
  futuredata: any;
  isFuture: any;
  historydata: any;
  isHistory: any;
  pcount: number = 0;
  ccount: number = 0;
  hcount: number = 0;
  fcount: number = 0;
  newtripid: any;
  isVoid: any;
  isskip: number = 0;
  oppositeid: any;
  getreasonres: any;
  iscancel: any;
  isescrow: any;
  partialamt: any;
  offsetamt: any;
  pilotname: any;
  ispartial: any;
  fpartialamt: any;
  RattingForDesignation: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public provider: AuthproviderProvider, public storage: Storage, public events: Events, public modalCtrl: ModalController, public alertCtrl: AlertController) {

    this.isVoid = this.provider.getescrowskip();
    if (this.isVoid == true) {
      this.isskip = 1;
    }
    else if (this.isVoid == false) {
      this.isskip = 0;
    }
    this.RattingForDesignation = "Owner/Operator";
  }

  ionViewDidEnter() {
    // get trip id
    this.newtripid = this.navParams.get('tripid');

    // back button functionality
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop();
      if (this.isPending == true) {
        this.events.publish('componentspending', true);
      }
      else if (this.isCurrent == true) {
        this.events.publish('componentscurrent', true);
      }
      else if (this.isHistory == true) {
        this.events.publish('componentshistory', true);
      }

    }
    this.provider.setloading();
    console.log('ionViewDidLoad OpenpendingnotificationPage');

    this.isPending = this.navParams.get('isPending');
    this.isCurrent = this.navParams.get('isCurrent');
    this.isFuture = this.navParams.get('');
    this.isHistory = this.navParams.get('isHistory');
    this.tripid = this.navParams.get('tripid');
    this.iscancel = this.navParams.get('iscancel');


    // get current user login type
    this.storage.get('usertype').then(val => {
      this.usertype = val;
    })
    // get current login id
    this.storage.get('id').then(val => {
      this.id = val;
      if (this.tripid == undefined) {
        this.tripid = this.newtripid;
      }
      // get trip details and display in view
      this.provider.gettripdetail(this.tripid, this.id).subscribe(res => {
        this.res = res;
        console.log(this.res);

        if (this.res.Code == 200) {
          this.isfavorite = this.res.data.Trip[0].isfavourite;
          if (this.res.data.Trip[0].isfavourite == '1') {
            this.isfav = true;
          } else {
            this.isfav = false;
          }
          if (this.res.data.Summary != null) {
            this.isescrow = this.res.data.Summary[0].IsEscrow;
            this.pilotname = this.res.data.Summary[0].Name;
            this.ispartial = this.res.data.Summary[0].IsPartial;
            this.fpartialamt = this.res.data.Summary[0].PartialAmount;
            this.notificationlist = this.res.data.Summary;
            console.log(this.notificationlist)
            this.tsdate = this.res.data.Trip[0].tripStartDate;
            this.tedate = this.res.data.Trip[0].tripEndDate;
            this.title = this.res.data.Trip[0].TripName;
            this.aircraft = this.res.data.Trip[0].AircraftType;
            this.enroutecode = this.res.data.Trip[0].enroute_airportCode;
            this.depcode = this.res.data.Trip[0].DepartureCode;
            this.descode = this.res.data.Trip[0].DestinationCode;
            this.partialamt = this.res.data.Trip[0].PartialAmount;
            this.offsetamt = this.res.data.Trip[0].OffsetAmount;
            if (this.res.data.Trip[0].Captain == true) {
              this.rate = this.res.data.Trip[0].updatepilotRate;
            }
            else if (this.res.data.Trip[0].SecondInCommand == true) {
              this.rate = this.res.data.Trip[0].updateSICRate;
            }
            else if (this.res.data.Trip[0].FlightAttendant == true) {
              this.rate = this.res.data.Trip[0].updateFARate;
            }
            else if (this.res.data.Trip[0].FlightInstructor == true) {
              this.rate = this.res.data.Trip[0].updateFIRate;
            }

            this.displaydata = true;
            this.provider.dismissloading();

            // when trip is pending trip
            if (this.isPending == true) {
              this.provider.getPendingtrip(this.id).subscribe(res => {
                this.pendingdata = res;
                if (this.pendingdata.data.Trip != null) {
                  this.pcount = 0;
                  console.log(this.pcount);
                  console.log(this.pendingdata);
                  for (let i = 0; i < this.pendingdata.data.Trip.length; i++) {
                    if (this.pendingdata.data.Trip[i].IsRecent == true) {
                      this.pcount += 1;
                    }
                  }
                  this.events.publish('pendingcount', this.pcount);
                }
              })
            }
            // when trip is current trip
            if (this.isCurrent == true) {
              this.provider.getCurrenttrip(this.id).subscribe(res => {
                this.currentdata = res;
                if (this.currentdata.data.Trip != null) {
                  this.ccount = 0;
                  console.log(this.ccount);

                  for (let i = 0; i < this.currentdata.data.Trip.length; i++) {
                    if (this.currentdata.data.Trip[i].IsRecent == true) {
                      this.ccount += 1;
                    }
                  }
                  this.events.publish('currentcount', this.ccount);
                }
              })
            }

            // when trip is history trip
            if (this.isHistory == true) {
              this.provider.getHistorytrip(this.id).subscribe(res => {
                this.historydata = res;
                if (this.historydata.data.Trip != null) {
                  this.hcount = 0;
                  for (let i = 0; i < this.historydata.data.Trip.length; i++) {
                    if (this.historydata.data.Trip[i].IsRecent == true) {
                      this.hcount += 1;
                    }
                  }
                  this.events.publish('historycount', this.hcount);
                }
              })
            }

          }
          else {
            this.provider.dismissloading();
            this.displaydata = false;
            this.presentalert();
          }
          console.log("len" + this.res.data.Summary.length);
          if (this.res.data.Summary.length >= 2) {
            this.oppositId = this.res.data.Summary[2].oppositId;
          }

        }
        else if (this.res.Code == 400) {
          this.provider.dismissloading();
          console.log('error occured');
        }
      })
    })
  }

  // add user as favorite list
  addasfav() {
    if (this.isfavorite == "0") {
      this.provider.setloading();
      this.isfavorite = true;
      this.provider.updatefavorite(this.id, this.oppositId, this.isfavorite).subscribe(res => {
        this.favres = res;
        if (this.favres.Code == 200) {
          this.provider.dismissloading();
          this.isfav = true;
          this.showAlert('Added to favorite List');
        }
        else {
          this.provider.dismissloading();
        }
      })
    }
    else {
      this.provider.setloading();
      this.isfavorite = false;
      this.provider.updatefavorite(this.id, this.oppositId, this.isfavorite).subscribe(res => {
        this.favres = res;
        if (this.favres.Code == 200) {
          this.provider.dismissloading();
          this.isfav = false;
          this.showAlert('Removed from favorite list');
        }
        else {
          this.provider.dismissloading();
        }
      })
    }
  }

  // display alert dialog
  showAlert(message) {
    const alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  // display alert dialog
  presentalert() {
    let alert = this.alertCtrl.create({
      message: 'No records found!',
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
  ionViewDidLoad() {


  }

  // when click on any card any view according to their type next action is performed
  // type is 3 means rating and comment is pending
  // type 4 means rating and comment is done
  tripsummary(type, oppositeid, tripid, rate, accpted, designation, RattingForId, EntryDate, comment, rating, message, IsAlreadyAccepted) {
    console.log(accpted);
    console.log(RattingForId);
    if (message == '' && type == 0) {
    }
    else {
      if (type == 3 && RattingForId != "") {
        this.navCtrl.push('UserrattingPage', { 'tripid': tripid, 'oppositeid': RattingForId, 'comment': comment, 'rating': rating });
      } else if (type == 4) {
        this.navCtrl.push('UserrattingPage', { 'comment': comment, 'rating': rating });
      }
      else if (type == 3 && RattingForId == "") {
        this.navCtrl.push('UserrattingPage', { 'tripid': tripid, 'oppositeid': RattingForId, 'comment': comment, 'rating': rating });
      }
      else {
        // when owner and any other member wants to cancel trip
        if (type == 8 || type == 9) {
          this.provider.setloading();
          this.provider.getReasonforCancel(tripid, oppositeid).subscribe(res => {
            this.getreasonres = res;
            this.getreasonres = this.getreasonres.data.Reason[0].Reason;
            console.log(this.getreasonres);
            this.provider.dismissloading();
            this.navCtrl.push('TripsummaryPage', { 'tname': this.title, 'depcode': this.depcode, 'enroutecode': this.enroutecode, 'descode': this.descode, 'tsdate': this.tsdate, 'tedate': this.tedate, 'aircraft': this.aircraft, 'rate': this.rate, 'oppositeid': oppositeid, 'tripid': tripid, 'type': type, 'accepted': accpted, 'designation': designation, 'EntryDate': EntryDate, 'Message': message, 'isaccepted': IsAlreadyAccepted, 'summary': this.notificationlist, 'reason': this.getreasonres });
          })
        }
        // redirct to trip summary page to display trip details
        // type 12 means initial escrow payment requested
        else if (type == 12) {
          this.navCtrl.push('TripsummaryPage', { 'tname': this.title, 'depcode': this.depcode, 'enroutecode': this.enroutecode, 'descode': this.descode, 'tsdate': this.tsdate, 'tedate': this.tedate, 'aircraft': this.aircraft, 'rate': this.rate, 'oppositeid': oppositeid, 'tripid': tripid, 'type': type, 'accepted': accpted, 'designation': designation, 'EntryDate': EntryDate, 'Message': message, 'isaccepted': IsAlreadyAccepted, 'summary': this.notificationlist, 'reason': this.getreasonres, 'iscancel': this.iscancel, 'isescrow': this.isescrow, 'partialamt': this.partialamt, 'offsetamt': this.offsetamt });
        }
        // initial escrow not requested
        else {
          this.navCtrl.push('TripsummaryPage', { 'tname': this.title, 'depcode': this.depcode, 'enroutecode': this.enroutecode, 'descode': this.descode, 'tsdate': this.tsdate, 'tedate': this.tedate, 'aircraft': this.aircraft, 'rate': this.rate, 'oppositeid': oppositeid, 'tripid': tripid, 'type': type, 'accepted': accpted, 'designation': designation, 'EntryDate': EntryDate, 'Message': message, 'isaccepted': IsAlreadyAccepted, 'summary': this.notificationlist, 'reason': this.getreasonres, 'iscancel': this.iscancel, 'isescrow': this.isescrow, 'offsetamt': this.offsetamt, 'partialamt': null });
        }


      }
    }


  }

  // click to open profile page in modal controller
  openProfile(opid, type) {
    console.log(this.oppositeid);
    if (type == '0') {
      this.provider.setloading();
      this.provider.viewprofile(this.id, opid).subscribe(res => {
        console.log(res);
        this.provider.dismissloading();
        this.modalCtrl.create("ProfilePage", { 'isedit': false, 'oppositeid': this.oppositeid, 'loginid': this.id }).present().then(() => {
          this.events.publish('userdata', res);
        });
      })
    }
  }

}

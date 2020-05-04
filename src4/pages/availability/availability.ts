import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, AlertController, Events, Navbar } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import * as moment from "moment";
/**
 * Generated class for the AvailabilityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-availability',
  templateUrl: 'availability.html',
})
export class AvailabilityPage {
  @ViewChild('navbar') navBar: Navbar;
  id: any;
  date: any;
  availabilitydata: any;
  res: any;
  usertype: any;
  ActiveSegment: any;
  IsCurrent1: any;
  IsFuture1: any;
  fromdate: any;
  currentdate: any;
  isupdate: any;
  isdelete: any;
  futuradata: string[] = [];
  pastdata: string[] = [];
  startdate: any;
  enddate: any;
  arr: string[] = [];
  datearray: any;
  todate: any;
  editbutton: any;
  constructor(public alertCtrl: AlertController, public app: App, public navCtrl: NavController, public navParams: NavParams, public authprovider: AuthproviderProvider, public storage: Storage, public events: Events) {
    //this.showLoader();
    this.IsFuture1 = false;
    this.ActiveSegment = "current";
    this.storage.get('usertype').then(val => {
      this.usertype = val;
    })

    this.events.subscribe('updatednewavailability', res => {
      console.log("updatedavailability")
      this.availabilitydata = res;
      console.log(this.availabilitydata);
      this.IsCurrent();
    })

    this.events.subscribe('updatedavailability', res => {
      console.log("updatedavailability")
      this.availabilitydata = res;
      console.log(this.availabilitydata);
    })
    this.events.subscribe('availabilitydata', res => {
      this.availabilitydata = res;
      console.log(this.availabilitydata);
      this.IsCurrent();
    })

  }

  ionViewDidEnter() {
    this.navBar.backButtonClick = () => {
      this.events.publish('updatedavailability', this.availabilitydata);
      this.navCtrl.pop();
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityPage');
  }

  addavailability() {
    this.arr = [];
    for (let i = 0; i < this.availabilitydata.length; i++) {
      this.startdate = this.availabilitydata[i].FromDate;
      this.enddate = this.availabilitydata[i].ToDate;
      this.startdate = new Date(moment(this.startdate).format('YYYY-MM-DD'));
      this.enddate = new Date(moment(this.enddate).format('YYYY-MM-DD'));
      var dt = new Date(this.startdate);
      var newarr = "";
      while (dt <= this.enddate) {
        this.arr.push(moment(new Date(dt)).format('YYYY-MM-DD'));
        dt.setDate(dt.getDate() + 1);
      }
      newarr = this.arr.join();
      this.datearray = newarr;
    }
    this.navCtrl.push('AddavailabilityPage').then(() => {
      this.events.publish('datesdata', this.datearray);
    });
  }

  IsFuture() {
    //this.authprovider.setloading();
    this.futuradata = [];
    this.ActiveSegment = "future";
    // this.storage.get('AvabilityData').then((val) => {
    //   console.log(val);

    //   this.availabilitydata = [];
    if (this.availabilitydata != null) {
      for (let i = 0; i < this.availabilitydata.length; i++) {
        this.currentdate = moment(new Date()).format("YYYY-MM-DD");
        this.fromdate = moment(this.availabilitydata[i].FromDate).format("YYYY-MM-DD");
        console.log(this.currentdate);
        console.log(this.fromdate);
        if (this.currentdate < this.fromdate) {
          this.futuradata.push(this.availabilitydata[i]);
          console.log(this.futuradata);
          // City: this.availabilitydata[i].City,
          // Comment: this.availabilitydata[i].Comment,
          // EntryDate: this.availabilitydata[i].EntryDate,
          // FromDate: this.availabilitydata[i].FromDate,
          // IsAvailability: this.availabilitydata[i].IsAvailability,
          // IsDelete: this.availabilitydata[i].IsDelete,
          // IsInsert: this.availabilitydata[i].IsInsert,
          // IsUpdate: this.availabilitydata[i].IsUpdate,
          // IsVoid: this.availabilitydata[i].IsVoid,
          // ToDate: this.availabilitydata[i].ToDate,
          // fkPilotid: this.availabilitydata[i].fkPilotid,
          // op: this.availabilitydata[i].op,
          // pkAvailabilityId: this.availabilitydata[i].pkAvailabilityId,
          // pkPilotId: this.availabilitydata[i].pkPilotId

        }
      }

      this.IsCurrent1 = false;
      this.IsFuture1 = true;
      // this.authprovider.dismissloading();
      console.log(this.availabilitydata);
      if (this.futuradata == null) {
        // this.authprovider.dismissloading();
        this.presentAlert("Pilot", "No records found");
      }

    }
    else if (this.availabilitydata == null) {
      //this.authprovider.dismissloading();
      this.presentAlert("Pilot", "No records found");
    }
    // });
  }

  IsCurrent() {
    //this.authprovider.setloading();
    this.pastdata = [];
    this.ActiveSegment = "current";
    // this.storage.get('AvabilityData').then((val) => {
    //   console.log(val);
    if (this.availabilitydata != null) {
      for (let i = 0; i < this.availabilitydata.length; i++) {
        this.currentdate = moment(new Date()).format("YYYY-MM-DD");
        this.fromdate = moment(this.availabilitydata[i].FromDate).format("YYYY-MM-DD");
        if (this.currentdate >= this.fromdate) {
          this.pastdata.push(this.availabilitydata[i]);
          // City: val[i].City,
          // Comment: val[i].Comment,
          // EntryDate: val[i].EntryDate,
          // FromDate: val[i].FromDate,
          // IsAvailability: val[i].IsAvailability,
          // IsDelete: val[i].IsDelete,
          // IsInsert: val[i].IsInsert,
          // IsUpdate: val[i].IsUpdate,
          // IsVoid: val[i].IsVoid,
          // ToDate: val[i].ToDate,
          // fkPilotid: val[i].fkPilotid,
          // op: val[i].op,
          // pkAvailabilityId: val[i].pkAvailabilityId,
          // pkPilotId: val[i].pkPilotId
          // })
        }
        // this.todate = moment(this.pastdata[i].ToDate).format("YYYY-MM-DD");
      }

      console.log(this.pastdata)
      // this.availabilitydata = val;
      this.IsCurrent1 = true;
      this.IsFuture1 = false;
      //this.authprovider.dismissloading();
      console.log(this.availabilitydata);
      if (this.availabilitydata == null) {
        // this.authprovider.dismissloading();
        this.presentAlert("Pilot", "No records found");
      }
    }
    else if (this.availabilitydata == null) {
      //this.authprovider.dismissloading();
      this.presentAlert("Pilot", "No records found");
    }
    // });
  }

  // delete(pkAvailabilityId,fkPilotid,Comment,FromDate,ToDate,City,IsAvailability){
  //   this.authprovider.Deleteavailability(pkAvailabilityId,fkPilotid,Comment,FromDate,ToDate,City,IsAvailability).subscribe(res => {
  //     console.log(res);
  //     this.res = res;
  //     this.presentAlert('Success!',this.res.msg);
  //     this.storage.set('AvabilityData', this.res.data.Pilot.Availability); 
  //     this.IsFuture();
  //     // this.navCtrl.push("AvailabilityPage");       
  //   })
  // }

  editordelete(op, pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate, City, IsAvailability) {
    console.log(City);
    if (op == "edit") {
      this.arr = [];
      // FromDate = new Date(moment(FromDate).format('YYYY-MM-DD'));
      for (let i = 0; i < this.availabilitydata.length; i++) {
        this.startdate = this.availabilitydata[i].FromDate;
        this.enddate = this.availabilitydata[i].ToDate;
        this.startdate = new Date(moment(this.startdate).format('YYYY-MM-DD'));
        this.enddate = new Date(moment(this.enddate).format('YYYY-MM-DD'));
        //
        var dt = new Date(this.startdate);
        var newarr = "";
        while (dt <= this.enddate) {
          this.arr.push(moment(new Date(dt)).format('YYYY-MM-DD'));
          dt.setDate(dt.getDate() + 1);
        }
        newarr = this.arr.join();
        this.datearray = newarr;
      }
      FromDate=FromDate.slice(0,10);
      ToDate=ToDate.slice(0,10);
      this.isupdate = true;
      this.isdelete = false;
      this.navCtrl.push('AddavailabilityPage', { 'availabilityid': pkAvailabilityId, 'id': fkPilotid, 'comment': Comment, 'fromdate': FromDate, 'todate': ToDate, 'city': City, 'edit': true }).then(() => {
        this.events.publish('datesdata', this.datearray);
      })
    }
    else if (op == "delete") {
      this.presentConfirm(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate);
    }
    // this.authprovider.updateavaialbility(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate, City, this.isupdate, this.isdelete).subscribe(res => {
    //   console.log(res);
    //   this.res = res;
    //   this.presentAlert('Success!', this.res.msg);
    //   this.storage.set('AvabilityData', this.res.data.Pilot.Availability);
    //   this.IsFuture();
    //   // this.navCtrl.push("AvailabilityPage");       
    // })
  }

  showAlert(title, msg) {
    const alert = this.alertCtrl.create({
      title: title,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  presentConfirm(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate) {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Do you want to delete availability?',
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
            this.authprovider.setloading();
            this.isdelete = true;
            this.isupdate = false;
            this.authprovider.updateavaialbility(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate, true, false, true).subscribe(res => {
              this.authprovider.dismissloading();
              this.res = res;
              this.availabilitydata = this.res.data.Pilot.Availability;
              this.events.publish('availabilitydata', this.res.data.Pilot.Availability);
              this.showAlert('Pilot', 'Data deleted successfully');
            })

          }
        }
      ]
    });
    alert.present();
  }

  presentAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['Ok']
    });
    alert.present();
  }

}

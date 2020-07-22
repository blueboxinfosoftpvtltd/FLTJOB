import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App, Events } from 'ionic-angular';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-addbankdetail',
  templateUrl: 'addbankdetail.html',
})
export class AddbankdetailPage {
  bankform: FormGroup;
  tripid: any;
  id: any;
  isacceptreject: any;
  rate: any;
  res: any;
  message: any;
  countrycode: any;
  bankname: any;
  accountname: any;
  biccode: any;
  accountnumber: any;
  ifsccode: any;
  pilotId: any;
  currancy: any;
  masterdata: any;
  countryname: any;
  ier: number = 0;
  oid: any;
  pres: any;
  ispartial:number=0;
  constructor(public storage: Storage, public navCtrl: NavController, public navParams: NavParams, public provider: AuthproviderProvider, public alertCtrl: AlertController, public app: App, public events: Events) {

    this.events.subscribe('countryname', res => {
      this.countryname = res[0];
      this.countrycode = res[1];
    })
    this.bankform = new FormGroup({
      countryname: new FormControl('', Validators.required),
      currancy: new FormControl('', Validators.required),
      bankname: new FormControl('', Validators.required),
      accountname: new FormControl('', Validators.required),
      biccode: new FormControl('', Validators.required),
      accountnumber: new FormControl('', Validators.required),
      ifsccode: new FormControl('', Validators.required),
      ier: new FormControl('', Validators.required)
    })

    this.tripid = this.navParams.get("tripid");
    this.id = this.navParams.get("id");
    this.isacceptreject = this.navParams.get("isacceptreject");
    this.rate = this.navParams.get("rate");
    this.oid = this.navParams.get('oid');
    this.storage.get('id').then(val => {
      this.pilotId = val;
    })

    this.masterdata = this.provider.getmasterdata();
    this.masterdata = this.masterdata.data.Countries;
  }


  isSubmit() {
    if (this.bankform.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddbankdetailPage');
  }

  currancyfilter(currancy) {
    this.currancy = currancy;
  }

  skip() {
    this.ispartial = 0;
    this.presentConfirm();
  }

  SubmitOffer() {
    if (this.ier <= 100 && this.ier != 0) {
      this.ispartial = 1;
      this.provider.setloading();
      this.provider.setescrowskip('false');
      this.provider.paymentoption(this.tripid, this.id, this.oid, true, "").subscribe(res => {
        this.pres = res;
        if (this.pres.Code == 200) {
          this.provider.addbankdetail(this.pilotId, this.countrycode, this.currancy, this.bankname, this.accountname, this.biccode, this.accountnumber, this.ifsccode,this.ier,this.ispartial,this.tripid).subscribe(res => {
            this.res = res;
            if (this.res.flag == 1) {
              this.provider.acceptrejecttrip(this.tripid, this.id, this.isacceptreject, this.rate).subscribe(res => {
                this.res = res;
                this.message = this.res.msg;
                this.provider.dismissloading();
                this.successalert();
              })
            }
            else {
              this.provider.dismissloading();
            }
          })
        }
      });
    }
    else if(this.ier == 0){
      this.ispartial = 0;
      this.provider.setloading();
      this.provider.setescrowskip('false');
      this.provider.paymentoption(this.tripid, this.id, this.oid, true, "").subscribe(res => {
        this.pres = res;
        if (this.pres.Code == 200) {
          this.provider.addbankdetail(this.pilotId, this.countrycode, this.currancy, this.bankname, this.accountname, this.biccode, this.accountnumber, this.ifsccode,this.ier,this.ispartial,this.tripid).subscribe(res => {
            this.res = res;
            if (this.res.flag == 1) {
              this.provider.acceptrejecttrip(this.tripid, this.id, this.isacceptreject, this.rate).subscribe(res => {
                this.res = res;
                this.message = this.res.msg;
                this.provider.dismissloading();
                this.successalert();
              })
            }
            else {
              this.provider.dismissloading();
            }
          })
        }
      });

    }
    else {
      this.alert();
    }
  }

  alert() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Enter a valid percentage.',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  successalert() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: this.message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop().then(() => {
              this.navCtrl.pop();
            });
          }
        }
      ]
    });
    alert.present();
  }

  selectcountries(event) {
    this.provider.setloading();
    this.app.getRootNav().push('CountryselectPage', { 'countrydata': this.masterdata, 'selectedcountry': "", 'issingle': true });
    this.provider.dismissloading();
  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Escrow keeps both pilot and operator protected.By skipping escrow you understand and accept the risk associated with it.',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.provider.setloading();
            this.provider.setescrowskip('true');
            this.provider.paymentoption(this.tripid, this.id, this.oid, false, "").subscribe(res => {
              this.pres = res;
              if (this.pres.Code == 200) {
                this.provider.acceptrejecttrip(this.tripid, this.id, this.isacceptreject, this.rate).subscribe(res => {
                  this.res = res;
                  this.message = "You accepted trip. Awaiting operator approval";
                  this.provider.dismissloading();
                  this.successalert();
                })
              }
              else {

              }
            })

          }
        }
      ]
    });
    alert.present();
  }
  erroralert() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: this.message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}

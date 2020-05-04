import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the JoinPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-join',
  templateUrl: 'join.html',
})
export class JoinPage {
  dummyJson = {
    onoff: [
      { description: 'On', id: '1' },
      { description: 'Off', id: '0' }
    ],
    mtype: [
      { description: 'Owner Operator', id: '1' },
      { description: 'Instructor', id: '2' },
      { description: 'Pilot', id: '3' },
      { description: 'Flight Attendant', id: '4' }
    ],
  }
  clocation: any;
  mtype: any;
  fname: any;
  lname: any;
  email: any;
  confirmemail: any;
  pass: any;
  confirmpass: any;
  cname: any;
  joinform: FormGroup;
  res: any;
  message: any;
  mtypes: any;
  clocations: any;
  devicetype: any;
  abstractcontrol: any;
  passerror: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private selector: WheelSelector, public authprovider: AuthproviderProvider, public alertCtrl: AlertController, public platform: Platform) {
    this.joinform = new FormGroup({
      mtype: new FormControl('', Validators.required),
      fname: new FormControl(),
      lname: new FormControl(),
      email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])),
      //confirmemail: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmpass: new FormControl('', Validators.compose([Validators.required, this.equalto('pass')])),
      clocation: new FormControl('', Validators.required),
      cname: new FormControl()
    })


    this.mtype = this.dummyJson.mtype[0].description;
    this.clocation = this.dummyJson.onoff[0].description;
  }

  ionViewDidLoad() {
    this.view.setBackButtonText('');
    console.log('ionViewDidLoad JoinPage');
  }

  openpicker(op) {
    if (op == "location") {
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
    else if (op == "member") {
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
          this.fname = "";
          this.lname = "";
          this.email = "";
          this.pass= "";
          this.confirmpass = "";
          this.cname = "";

        },
        err => console.log('Error: ', err)
      );
    }
  }

  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {

      let input = control.value;

      let isValid = control.root.value[field_name] == input
      if (!isValid)
        //this.passerror = true;
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }


  isjoin() {
    if (this.joinform.valid) {
      return true;
    }
    else {
      return false;
    }
  }

  submit() {
    this.authprovider.setloading();
    if (this.clocation == "On") {
      this.clocations = "1";
    }
    else if (this.clocation == "Off") {
      this.clocations = "0";
    }
    if (this.mtype == 'Owner Operator') {
      this.mtypes = "1";
    }
    else if (this.mtype == 'Instructor') {
      this.mtypes = "2";
    }
    else if (this.mtype == 'Pilot') {
      this.mtypes = "3";
    }
    else if (this.mtype == 'Flight Attendant') {
      this.mtypes = "4";
    }
    var clocation;
    if (this.clocation == "On") {
      clocation = true;
    }
    else if (this.clocation == "Off") {
      clocation = false;
    }
    if (this.platform.is('android')) {
      this.devicetype = "1";
    }
    else {
      this.devicetype = "2";
    }
    this.authprovider.join(this.fname, this.lname, "", clocation, "", this.mtypes, this.email, this.pass, this.pass, this.devicetype, this.cname).subscribe(res => {
      this.res = res;

      // if (this.res.Code == 200) {
      this.authprovider.dismissloading();
      this.message = this.res.msg;
      this.showAlert();
      // }
      // else if (this.res.Code == 400) {
      //  this.authprovider.dismissloading();
      //   this.message = this.res.message;
      //   this.showAlert();
      // }
    })
  }


  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Pilot',
      subTitle: this.message,
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

}

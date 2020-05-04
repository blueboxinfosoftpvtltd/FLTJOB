import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, Platform } from 'ionic-angular';
import { WheelSelector } from '@ionic-native/wheel-selector';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Plugins } from '@capacitor/core';

const { Browser } = Plugins;
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
      { description: 'Yes', id: '1' },
      { description: 'No', id: '0' }
    ],
    mtype: [
      { description: 'Owner Operator', id: '1' },
      { description: 'Instructor', id: '2' },
      { description: 'Pilot', id: '3' },
      { description: 'Flight Attendant', id: '4' }
    ],
    gendertype: [
      { description: 'Select'},
      { description: 'Male'},
      { description: 'Female' }
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
  isterms: boolean = false;
  message: any;
  mtypes: any;
  clocations: any;
  devicetype: any;
  abstractcontrol: any;
  gender: any;
  passerror: boolean = false;
  path: any;
  constructor(private iab: InAppBrowser,private transfer: FileTransfer,private file: File,private document: DocumentViewer,public navCtrl: NavController, public navParams: NavParams, public view: ViewController, private selector: WheelSelector, public authprovider: AuthproviderProvider, public alertCtrl: AlertController, public platform: Platform) {
    this.joinform = new FormGroup({
      mtype: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      fname: new FormControl(),
      lname: new FormControl(),
      email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])),
      //confirmemail: new FormControl('', Validators.required),
      pass: new FormControl('', Validators.required),
      confirmpass: new FormControl('', Validators.compose([Validators.required, this.equalto('pass')])),
      clocation: new FormControl('', Validators.required),
      cname: new FormControl(),
      isterms: new FormControl(undefined, Validators.required)
    })


    // this.mtype = this.dummyJson.mtype[0].description;
    this.clocation = this.dummyJson.onoff[0].description;
  }

  ionViewDidLoad() {
    this.view.setBackButtonText('');
    console.log('ionViewDidLoad JoinPage');
  }

  checkedterms(event){
    console.log(event);
    this.isterms = event._value;
  }

 async GoToTermsPrivacy(name){
    
    if(name == "Terms of use"){

      await Browser.open({ url: 'http://pilot2.itsguru.com/pdf/Fltjob Terms of Use.pdf' });

      // const browser = this.iab.create('http://pilot2.itsguru.com/pdf/Fltjob Terms of Use.pdf');
      // browser.on('loadstop').subscribe(event => {
      //   browser.insertCSS({ code: "body{color: red;" });      });

      // browser.close();
    }

    if(name == "Privacy Policy"){

      await Browser.open({ url: 'http://pilot2.itsguru.com/pdf/Fltjob Privacy Policy.pdf' });
      // const browser = this.iab.create('http://pilot2.itsguru.com/pdf/Fltjob Privacy Policy.pdf');
      // browser.on('loadstop').subscribe(event => {
      //   browser.insertCSS({ code: "body{color: red;" });      });

      // browser.close();
    }

    if(name == "Disclaimer"){

      await Browser.open({ url: 'http://pilot2.itsguru.com/pdf/Fltjob Disclaimer.pdf' });

      // const browser = this.iab.create('http://pilot2.itsguru.com/pdf/Fltjob Disclaimer.pdf');
      // browser.on('loadstop').subscribe(event => {
      //   browser.insertCSS({ code: "body{color: red;" });      });

      // browser.close();
    }
    
    
    // this.navCtrl.push("TermsPage", {'Title':name }, { animate: false });
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
    }else if (op == "gender") {
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
    if (this.joinform.valid && this.isterms == true) {
      return true;
    }
    else {
      return false;
    }
  }

  submit() {
    this.authprovider.setloading();
    if (this.clocation == "Yes") {
      this.clocations = "1";
    }
    else if (this.clocation == "No") {
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
    if (this.clocation == "Yes") {
      clocation = true;
    }
    else if (this.clocation == "No") {
      clocation = false;
    }
    if (this.platform.is('android')) {
      this.devicetype = "1";
    }
    else {
      this.devicetype = "2";
    }
    this.authprovider.join(this.fname, this.lname, "", clocation, "", this.mtypes, this.email, this.pass, this.pass, this.devicetype, this.cname,this.gender).subscribe(res => {
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

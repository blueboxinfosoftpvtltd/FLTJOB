import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { FormControl, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';

/**
 * Generated class for the ForgotpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgotpassword',
  templateUrl: 'forgotpassword.html',
})
export class ForgotpasswordPage {

  forgotform: any;
  message: any;
  email: any;
  res: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,public authprovider: AuthproviderProvider) {
    this.forgotform = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])),
     
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotpasswordPage');
  }

  isValid() {
    if (this.forgotform.valid) {
      return true;
    }
    else {
      return false;
    }
  }


  submit() {
    this.authprovider.setloading();

    this.authprovider.ForgotPassword(this.email).subscribe(res => {
      this.res = res;

       if (this.res.Code == 200) {
      this.authprovider.dismissloading();
      this.message = this.res.msg;
      this.showAlert();
       }
      else if (this.res.Code == 400) {
       this.authprovider.dismissloading();
        this.message = this.res.message;
        this.showAlert();
      }
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
            // this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}

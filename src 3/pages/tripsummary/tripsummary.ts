import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import * as moment from 'moment';
/**
 * Generated class for the TripsummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tripsummary',
  templateUrl: 'tripsummary.html',
})
export class TripsummaryPage {
  title: any;
  depcode: any;
  enroutecode: any;
  descode: any;
  tsdate: any;
  tedate: any;
  aircraft: any;
  rate: any;
  usertype: any;
  res: any;
  oppositeid: any;
  tripid: any;
  isacceptreject: any;
  id: any;
  type: any;
  accepted: any;
  message: any;
  designation: any;
  EntryDate: any;
  userfullname: any;
  messagetext: any;
  isaccepted: any;
  disableButton: any;
  pcres: any;
  ptripdata: any;
  tripsummary: any;
  Ispilotcanceltrip: boolean = false;
  Iscancel: boolean = false;
  tripcancelbothres: any;
  reasonforcancel: any;
  cancelacceptreject: any;
  tripcancelres: any;
  cancelflag: any;
  isescrow: any;
  ctransres: any;
  comtripdata: any;
  ispartial:number = 0;
  partialamt:any;
  offsetamt:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public provider: AuthproviderProvider, public alertCtrl: AlertController, public events: Events) {
    this.disableButton = false;
    this.storage.get('usertype').then(val => {
      this.usertype = val;

    })
    this.storage.get('userfullname').then(res => {
      console.log(res);
      this.userfullname = res;
    })

    this.storage.get('id').then(val => {
      this.id = val;
      this.title = this.navParams.get('tname');
      this.depcode = this.navParams.get('depcode');
      this.enroutecode = this.navParams.get('enroutecode');
      this.descode = this.navParams.get('descode');
      this.tsdate = this.navParams.get('tsdate');
      this.cancelflag = this.navParams.get('iscancel');
      var tripsdate = moment(this.tsdate).format('YYYY-MM-DD');
      var date = moment().format('YYYY-MM-DD');
      if (tripsdate > date) {
        this.Iscancel = true;
      }
      // else {
      //   this.Iscancel = false;
      // }
      this.tedate = this.navParams.get('tedate');
      this.aircraft = this.navParams.get('aircraft');
      this.rate = this.navParams.get('rate');
      this.oppositeid = this.navParams.get('oppositeid');
      this.tripid = this.navParams.get('tripid');
      this.type = this.navParams.get('type');
      this.accepted = this.navParams.get('accepted');
      this.designation = this.navParams.get('designation');
      this.EntryDate = this.navParams.get('EntryDate');
      this.messagetext = this.navParams.get('Message');
      this.isaccepted = this.navParams.get('isaccepted');
      this.reasonforcancel = this.navParams.get('reason');
      this.tripsummary = this.navParams.get('summary');
      this.isescrow = this.navParams.get('isescrow');
      this.partialamt = this.navParams.get('partialamt');
      this.offsetamt = this.navParams.get('offsetamt');
      this.tripsummary.find(ele => {
        if (ele.type > 0) {
          this.Ispilotcanceltrip = false;
        }
        else {
          this.Ispilotcanceltrip = true;
        }
      })
    })
    //console.log(this.Ispilotcanceltrip);

  }

  ionDidViewEnter() {
    this.disableButton = false;
  }

  accept() {
    this.disableButton = true;
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to accept ?",
      buttons: [
        {
          text: 'Cancle',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            this.navCtrl.push('AddbankdetailPage', { 'tripid': this.tripid, 'id': this.id, 'oid': this.oppositeid, 'isacceptreject': "1", 'rate': this.rate });
          }
          // handler: data => {                 
          //    this.provider.setloading();
          //     this.isacceptreject = "1";
          //     this.provider.acceptrejecttrip(this.tripid, this.id, this.isacceptreject, this.rate).subscribe(res => {
          //       this.res = res;
          //       if (this.res.Code == 200) {
          //         this.provider.dismissloading();
          //         this.message = this.res.msg;
          //         this.successalert();
          //       }
          //       else {
          //         this.provider.dismissloading();
          //       }
          //     })
          // }
        }
      ]
    });
    prompt.present();

  }

  decline() {
    this.disableButton = true;

    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to decline offer ?",
      buttons: [
        {
          text: 'Cancle',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            this.provider.setloading();
            this.isacceptreject = "0";
            this.provider.acceptrejecttrip(this.tripid, this.oppositeid, this.isacceptreject, this.rate).subscribe(res => {
              this.res = res;
              if (this.res.Code == 200) {
                this.provider.dismissloading();
                this.message = this.res.msg;
                this.successalert();
              }
              else {
                this.provider.dismissloading();
              }
            })

          }
        }
      ]
    });
    prompt.present();


  }

  negotiate() {
    this.presentPrompt();
  }

  acceptoffer() {
    this.provider.setloading();
    this.provider.acceptoffer(this.oppositeid, this.id, this.tripid, this.rate).subscribe(res => {
      this.res = res;
      if (this.res.Code == 200) {
        this.provider.dismissloading();
        this.message = this.res.msg;
        this.successalert();
      }
      else {
        this.provider.dismissloading();
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripsummaryPage');
  }
  presentPrompt() {
    this.disableButton = true;
    let alert = this.alertCtrl.create({
      title: 'Enter negotiate amount',
      inputs: [
        {
          name: 'amount',
          placeholder: 'Enter negotiate amount'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            this.disableButton = false;
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Submit',
          handler: data => {
            this.provider.setloading();
            if (data.amount != "") {
              this.provider.negotiate(this.oppositeid, this.id, this.tripid, data.amount).subscribe(res => {
                this.res = res;
                if (this.res.Code == 200) {
                  this.provider.dismissloading();
                  this.message = this.res.msg;
                  this.successalert();
                }
                else {
                  this.provider.dismissloading();
                }
              })
            }
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
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  acceptowner() {
    this.disableButton = true;
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to accept offer ?",
      buttons: [
        {
          text: 'Cancle',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            var isescrow = this.provider.getescrowskip();
            if (this.isescrow == true) {
              this.provider.setloading();
              this.isacceptreject = "1";
              this.provider.acceptrejectfromowner(this.tripid, this.id, this.oppositeid, this.isacceptreject, this.rate).subscribe(res => {
                this.res = res;
                if (this.res.Code == 200) {
                  var entrydate = moment(this.EntryDate).format('MM/DD/YYYY');
                  this.provider.createTransaction(this.tripid, this.id, this.oppositeid, this.rate, entrydate).subscribe(res => {
                    this.ctransres = res;
                    if (this.ctransres.flag == 1) {
                      this.message = "Successfully Accepted";
                      this.provider.dismissloading();
                      this.successalert();
                    }
                    else {
                      this.provider.dismissloading();
                      this.erroralert();
                    }

                  })
                }
                else {
                  this.erroralert();
                  this.provider.dismissloading();
                }
              })
            }
            else if (this.isescrow == false) {
              this.provider.setloading();
              this.isacceptreject = "1";
              this.provider.acceptrejectfromowner(this.tripid, this.id, this.oppositeid, this.isacceptreject, this.rate).subscribe(res => {
                this.res = res;
                if (this.res.Code == 200) {
                  this.message = "Successfully Accepted";
                  this.provider.dismissloading();
                  this.successalert();
                }
                else {
                  this.provider.dismissloading();
                }
              })
            }

          }
        }
      ]
    });
    prompt.present();
  }

  declineowner() {
    this.disableButton = true;
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to decline crew member ?",
      buttons: [
        {
          text: 'Cancle',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Accept',
          handler: data => {
            this.provider.setloading();
            this.isacceptreject = "0";
            this.provider.acceptrejectfromowner(this.tripid, this.id, this.oppositeid, this.isacceptreject, this.rate).subscribe(res => {
              this.res = res;
              if (this.res.Code == 200) {
                this.provider.dismissloading();
                this.message = this.res.msg;
                this.successalert();
              }
              else {
                this.provider.dismissloading();
              }
            })


          }
        }
      ]
    });
    prompt.present();
  }

  erroralert() {
    let alert = this.alertCtrl.create({
      title: 'Pilot',
      message: 'Error ocuured!',
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

  payment() {
    this.disableButton = true;
    this.provider.setloading();
    var isescrow = this.provider.getescrowskip();
    console.log(isescrow);
    if (isescrow == true) {
      this.provider.paymentrelease(this.tripid).subscribe(res => {
        this.res = res;
        if (this.res.Code == 200) {
          this.provider.dismissloading();
          this.message = this.res.msg;
          this.successalert();
        }
        else {
          this.provider.dismissloading();
        }
      })
    }
    else {
      this.provider.releasepayment(this.oppositeid, this.tripid).subscribe(res => {
        this.res = "";
        this.res = res;
        if (this.res.flag == 1) {
              if(this.partialamt == undefined){
                this.provider.paymentrelease(this.tripid).subscribe(res => {
                  this.res = res;
                  console.log(this.res);
                  if (this.res.Code == 200) {
                this.provider.dismissloading();
                this.message = this.res.msg;
                this.successalert();
              }
              else{
                this.provider.dismissloading();
                this.erroralert();
              }
            })
               
            }
              else{
               
                var entrydate = moment(this.EntryDate).format('MM/DD/YYYY');
                this.provider.createTransaction(this.tripid, this.id, this.oppositeid, this.offsetamt, entrydate).subscribe(res => {
                  this.ctransres = res;
                  if (this.ctransres.flag == 1) {
                    this.provider.dismissloading();
                    this.message = this.res.msg;
                    this.successalert();
                  }
                  else {
                    this.provider.dismissloading();
                    this.erroralert();
                  }
              });
            }
          }
            else {
              this.provider.dismissloading();
            }

      })
    }


  }
  canceltrip() {
    if (this.Ispilotcanceltrip == true) {
      this.disableButton = true;
      const prompt = this.alertCtrl.create({
        title: 'Pilot',
        message: "Are you sure you want to cancel trip ?",
        buttons: [
          {
            text: 'No',
            handler: data => {
              this.disableButton = false;
              console.log('No clicked');
            }
          },
          {
            text: 'Yes',
            handler: data => {
              this.provider.setloading();

              this.provider.canceltripbypilot(this.tripid, this.id, "").subscribe(res => {
                this.pcres = res;
                if (this.pcres.Code == 200) {
                  this.provider.getPendingtrip(this.id).subscribe(res => {
                    this.ptripdata = res;
                    this.ptripdata = this.ptripdata.data.Trip;
                    this.events.publish('pending', this.ptripdata);
                  })
                  this.provider.dismissloading();
                  this.message = "Trip canceled successfully";
                  this.successalert1();
                }
                else {
                  this.provider.dismissloading();
                  this.erroralert();
                }

              })

            }
          }
        ]
      });
      prompt.present();
    }
    else {

      let alert = this.alertCtrl.create({
        title: 'Enter Reason',
        inputs: [
          {
            name: 'reason',
            placeholder: 'Enter reason'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              this.disableButton = false;
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Submit',
            handler: data => {
              this.provider.setloading();
              if (data.reason != "") {
                this.provider.insertReasonforCancel(this.tripid, this.id, data.reason).subscribe(res => {
                  this.res = res;
                  if (this.res.Code == 200) {
                    this.provider.canceltripbyboth(this.tripid, this.id, "").subscribe(res => {
                      this.tripcancelbothres = res;
                      if (this.tripcancelbothres.Code == 200) {
                        this.provider.dismissloading();
                        this.message = this.res.msg;
                        this.successalert();
                      }
                      else {
                        this.provider.dismissloading();
                        this.erroralert();
                      }
                    })
                  }
                  else {
                    this.provider.dismissloading();
                  }
                })
              }
            }
          }
        ]
      });
      alert.present();
    }
  }

  successalert1() {
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

  acceptcancel() {
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to accept ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.cancelacceptreject = "1";
            this.tripcancel(this.cancelacceptreject);
          }
        },
      ]
    });
    prompt.present();
  }

  declinecancel() {
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to decline ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.cancelacceptreject = "0";
            this.tripcancel(this.cancelacceptreject);
          }
        },
      ]
    });
    prompt.present();
  }

  tripcancel(cancelacceptreject) {
    var date = moment().format('YYYY-MM-DD');
    this.provider.setloading();
    this.provider.AcceptRejectCancellation(this.tripid, this.oppositeid, date, cancelacceptreject).subscribe(res => {
      this.tripcancelres = res;
      if (this.tripcancelres.Code == 200) {
        this.provider.getPendingtrip(this.id).subscribe(res => {
          this.ptripdata = res;
          this.ptripdata = this.ptripdata.data.Trip;
          this.events.publish('pending', this.ptripdata);
        })
        this.provider.dismissloading();
        if (cancelacceptreject == "1") {
          this.message = "Trip cancel successfully"
        }
        else {
          this.message = "Trip decline successfully"
        }
        this.successalert1();

      }
      else {
        this.provider.dismissloading();
      }
      console.log(this.tripcancelres);
    })
  }

  canceltripowner() {

    if (this.Ispilotcanceltrip == true) {
      this.disableButton = true;
      const prompt = this.alertCtrl.create({
        title: 'Pilot',
        message: "Are you sure you want to cancel trip ?",
        buttons: [
          {
            text: 'No',
            handler: data => {
              this.disableButton = false;
              console.log('No clicked');
            }
          },
          {
            text: 'Yes',
            handler: data => {
              this.provider.setloading();

              this.provider.canceltripowner(this.tripid, "").subscribe(res => {
                this.pcres = res;
                if (this.pcres.Code == 200) {
                  this.provider.getPendingtrip(this.id).subscribe(res => {
                    this.ptripdata = res;
                    this.ptripdata = this.ptripdata.data.Trip;
                    this.events.publish('pending', this.ptripdata);
                  })
                  this.provider.dismissloading();
                  this.message = "Trip canceled successfully";
                  this.successalert1();
                }
                else {
                  this.provider.dismissloading();
                  this.erroralert();
                }

              })

            }
          }
        ]
      });
      prompt.present();
    }
    else {

      let alert = this.alertCtrl.create({
        title: 'Enter Reason',
        inputs: [
          {
            name: 'reason',
            placeholder: 'Enter reason'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              this.disableButton = false;
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Submit',
            handler: data => {
              this.provider.setloading();
              if (data.reason != "") {
                this.provider.insertReasonforCancel(this.tripid, this.id, data.reason).subscribe(res => {
                  this.res = res;
                  if (this.res.Code == 200) {
                    this.provider.canceltripowner(this.tripid, "").subscribe(res => {
                      this.tripcancelbothres = res;
                      if (this.tripcancelbothres.Code == 200) {
                        this.provider.dismissloading();
                        this.message = this.res.msg;
                        this.successalert();
                      }
                      else {
                        this.provider.dismissloading();
                        this.erroralert();
                      }
                    })
                  }
                  else {
                    this.provider.dismissloading();
                  }
                })
              }
            }
          }
        ]
      });
      alert.present();
    }
  }
  acceptcancelowner() {
    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to accept ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.cancelacceptreject = "1";
            this.tripcancelowner(this.cancelacceptreject);
          }
        },
      ]
    });
    prompt.present();
  }
  declinecancelowner() {

    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to decline ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.cancelacceptreject = "0";
            this.tripcancelowner(this.cancelacceptreject);
          }
        },
      ]
    });
    prompt.present();
  }

  tripcancelowner(cancelacceptreject) {
    var date = moment().format('YYYY-MM-DD');
    this.provider.setloading();
    this.provider.AcceptRejectCancellationPilot(this.tripid, this.id, date, cancelacceptreject).subscribe(res => {
      this.tripcancelres = res;
      if (this.tripcancelres.Code == 200) {
        this.provider.getPendingtrip(this.id).subscribe(res => {
          this.ptripdata = res;
          this.ptripdata = this.ptripdata.data.Trip;
          this.events.publish('pending', this.ptripdata);
        })
        this.provider.dismissloading();
        if (cancelacceptreject == "1") {
          this.message = "Trip cancel successfully"
        }
        else {
          this.message = "Trip decline successfully"
        }
        this.successalert1();

      }
      else {
        this.provider.dismissloading();
      }
      console.log(this.tripcancelres);
    })
  }

  completetrip() {
    this.provider.setloading();
    this.provider.copletetrip(this.tripid).subscribe(res => {
      this.comtripdata = res;
      if (this.comtripdata.Code == 200) {
        this.provider.dismissloading();
        this.message = "Trip Completed Successfully";
        this.successalert();
      }
      else {
        this.provider.dismissloading();
        this.erroralert();
      }
    })
  }
  completeowner() {

    const prompt = this.alertCtrl.create({
      title: 'Pilot',
      message: "Are you sure you want to complete trip ?",
      buttons: [
        {
          text: 'No',
          handler: data => {
            //this.disableButton = false;
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            //this.cancelacceptreject = "0";
            //this.tripcancelowner(this.cancelacceptreject);
            this.completetrip();
          }
        },
      ]
    });
    prompt.present();
  }

}

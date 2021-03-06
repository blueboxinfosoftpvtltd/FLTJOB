import { Component } from '@angular/core';
import { Platform, LoadingController, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabpagePage } from '../pages/tabpage/tabpage';
//import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../providers/authprovider/authprovider';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Keyboard } from '@ionic-native/keyboard';
import { FCM } from "capacitor-fcm";
const fcm = new FCM();
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed
} from '@capacitor/core';

const { PushNotifications } = Plugins;
@Component({
    templateUrl: 'app.html'
})

export class MyApp {
    rootPage: any;
    auth: any;
    password: any;
    email: any;
    loading: any;
    logout: any;
    devicetype: any;
    pendingtrip: any;
    currenttrip: any;
    historytrip: any;
    futuretrip: any;
    pcount: number = 0;
    ccount: number = 0;
    fcount: number = 0;
    hcount: number = 0;
    res: any;
    token: any;
    private ionapp: Element;
    fname: any;
    lname: any;
    ppath: any;
    pending: any;
    pencount: number = 0;
    message: any;
    mcount: number = 0;
    isgoogle:any;
    // tab1: any = HomePage;
    // tab2: any = "ProfilePage";
    // tab3: any = "PendingPage";
    // tab4: any = "NotificationPage";
    // tab5: any = "MessagePage";

    constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public loadingCtrl: LoadingController, public app: App, public provider: AuthproviderProvider, public events: Events, public firebase: Firebase, public geolocation: Geolocation, public diagnostic: Diagnostic, public keyboard: Keyboard) {

        platform.ready().then(() => {
            statusBar.styleDefault();
            // register push notification permission
            PushNotifications.register();

            // get master data like airportcode,country,language
            this.provider.getallmasterdata().subscribe(res => {
                this.provider.setmasterdata(res);
            })


            // get permission to turn on gps to get location
            this.diagnostic.getLocationAuthorizationStatus()
                .then((state) => {
                    switch (state) {
                        case this.diagnostic.permissionStatus.NOT_REQUESTED:

                            console.log("Permission not requested");
                            break;
                        case this.diagnostic.permissionStatus.DENIED:
                            // this.getUserPosition();
                            // alert("denie")
                            this.diagnostic.switchToSettings();
                            console.log("Permission denied");
                            break;
                        case this.diagnostic.permissionStatus.GRANTED:
                            // alert("yes")

                            console.log("Permission granted always");
                            break;
                        case this.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE:
                            // alert("while")

                            this.diagnostic.isLocationAvailable()
                                .then((isAvailable) => {


                                });
                            console.log("Permission granted only when in use");
                            break;
                    }
                }, function (error) {
                    console.error("The following error occurred: " + error);
                });

            // all the storage value get to login again without user interaction
            storage.get('logout').then(val => {
                this.logout = val;
                console.log(this.logout);
            })
            storage.get('email').then(val => {
                this.email = val;
            })
            storage.get('fname').then(val => {
                this.fname = val;
            })
            storage.get('lname').then(val => {
                this.lname = val;
            })
            storage.get('userprofilepic').then(val => {
                this.ppath = val;
            })

            storage.get('token').then(val => {
                if (val != null) {
                    this.token = val;
                    this.provider.settoken(this.token);
                }

            })
            storage.get('isgooglelogin').then(val =>{
                 this.isgoogle = val;
            })

            // if password is store in storage then login when user resart the app without logout
            storage.get('password').then(val => {

                this.password = val;
                this.showloader();
                if (this.email != null && this.password != null && this.logout == false) {
                    if (this.platform.is('ios')) {
                        this.devicetype = '2';
                    }
                    else {
                        this.devicetype = '1';
                    }

                    this.provider.doLogin(this.email, this.password, this.devicetype).subscribe(res => {
                        this.provider.savecurrentuserdata(res);
                        this.res = res;
                        this.storage.set('email', this.email);
                        this.storage.set('password', this.password);
                        this.storage.set('id', this.res.data.Pilot.pkPilotId);
                        this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
                        this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
                        this.storage.set('logout', false);
                        this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
                        this.storage.set('fname', this.res.data.Pilot.PilotFname);
                        this.storage.set('lname', this.res.data.Pilot.PilotLname);

                        // get all the trips 
                        this.provider.getPendingtrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                            console.log(res);
                            this.pendingtrip = res;
                            if (this.pendingtrip.data.Trip != null) {
                                this.pcount = 0;
                                for (let i = 0; i < this.pendingtrip.data.Trip.length; i++) {
                                    if (this.pendingtrip.data.Trip[i].IsRecent == true) {
                                        this.pcount += 1;
                                    }

                                }
                                this.events.publish('pendingcount', this.pcount);
                                console.log(this.pcount);
                            }
                        })
                        this.provider.getCurrenttrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                            console.log(res);
                            this.currenttrip = res;
                            if (this.currenttrip.data.Trip != null) {
                                this.ccount = 0;
                                for (let i = 0; i < this.currenttrip.data.Trip.length; i++) {
                                    if (this.currenttrip.data.Trip[i].IsRecent == true) {
                                        this.ccount += 1;
                                    }

                                }
                                this.events.publish('currentcount', this.ccount);
                                console.log(this.ccount);
                            }
                        })
                        this.provider.getHistorytrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                            console.log(res);
                            this.historytrip = res;
                            if (this.historytrip.data.Trip != null) {
                                this.hcount = 0;
                                for (let i = 0; i < this.historytrip.data.Trip.length; i++) {
                                    if (this.historytrip.data.Trip[i].IsRecent == true) {
                                        this.hcount += 1;
                                    }

                                }
                                this.events.publish('historycount', this.hcount);
                                console.log(this.hcount);
                            }
                        })
                        this.provider.getFuturetrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                            console.log(res);
                            this.futuretrip = res;
                            if (this.futuretrip.data.Trip != null) {
                                this.fcount = 0;
                                for (let i = 0; i < this.futuretrip.data.Trip.length; i++) {
                                    if (this.futuretrip.data.Trip[i].IsRecent == true) {
                                        this.fcount += 1;
                                    }

                                }
                                this.events.publish('futurecount', this.fcount);
                                console.log(this.fcount);
                            }
                        })
                        this.provider.getAllRequest(this.res.data.Pilot.pkPilotId).subscribe(res => {

                            this.pending = res;

                            if (this.pending.data.Requests != null) {
                                this.pencount = 0;
                                for (let i = 0; i < this.pending.data.Requests.length; i++) {
                                    if (this.pending.data.Requests[i].IsRecent == 0) {
                                        this.pencount += 1;
                                    }

                                }
                                this.events.publish('pencount', this.pencount);
                                console.log(this.pencount);
                            }
                        })
                        this.provider.getRecentMsgList(this.res.data.Pilot.pkPilotId).subscribe(res => {
                            this.message = res;

                            if (this.message.data.Messages != null) {
                                this.mcount = 0;
                                for (let i = 0; i < this.message.data.Messages.length; i++) {
                                    if (this.message.data.Messages[i].IsRecent == 0 && this.message.data.Messages[i].IsReceive == true) {
                                        this.mcount += 1;
                                    }

                                }
                                this.events.publish('mcount', this.mcount);
                                console.log(this.mcount);
                            }

                        })

                        this.loading.dismiss();
                        let rootPageParams = { 'data': res }

                        this.app.getRootNav().setRoot("TabpagePage", { "data": this.res, 'usertype': this.res.data.Pilot.MemberShipType }, { animate: false }).then(() => {
                            this.events.publish('available', this.res.data.Pilot.Availability);
                            splashScreen.hide();
                        });


                    })
                }
                // this code is for google login when password is not store in storage
                else if (this.email != null && this.password == null) {


                    this.provider.doGoogleLogin(this.email, this.fname, this.lname, this.ppath, this.devicetype).subscribe(res => {
                        console.log(res);
                        this.res = res;

                        if (this.res.data != null) {

                            this.storage.set('email', this.email);
                            this.storage.set('password', null);
                            this.storage.set('id', this.res.data.Pilot.pkPilotId);
                            this.storage.set('usertype', this.res.data.Pilot.MemberShipType);
                            this.storage.set('userprofilepic', this.res.data.Pilot.PhotoPath);
                            this.storage.set('logout', false);
                            this.storage.set('userfullname', this.res.data.Pilot.PilotFname + ' ' + this.res.data.Pilot.PilotLname);
                            this.storage.set('isgooglelogin', true);
                            this.storage.set('fname', this.res.data.Pilot.PilotFname);
                            this.storage.set('lname', this.res.data.Pilot.PilotLname);
                            // this.provider.dismissloading();
                            this.provider.savecurrentuserdata(this.res);

                            //get all the trips
                            this.provider.getPendingtrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                                console.log(res);
                                this.pendingtrip = res;
                                if (this.pendingtrip.data.Trip != null) {
                                    this.pcount = 0;
                                    for (let i = 0; i < this.pendingtrip.data.Trip.length; i++) {
                                        if (this.pendingtrip.data.Trip[i].IsRecent == true) {
                                            this.pcount += 1;
                                        }

                                    }
                                    this.events.publish('pendingcount', this.pcount);
                                    console.log(this.pcount);
                                }
                            })
                            this.provider.getCurrenttrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                                console.log(res);
                                this.currenttrip = res;
                                if (this.currenttrip.data.Trip != null) {
                                    this.ccount = 0;
                                    for (let i = 0; i < this.currenttrip.data.Trip.length; i++) {
                                        if (this.currenttrip.data.Trip[i].IsRecent == true) {
                                            this.ccount += 1;
                                        }

                                    }
                                    this.events.publish('currentcount', this.ccount);
                                    console.log(this.ccount);
                                }
                            })
                            this.provider.getHistorytrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                                console.log(res);
                                this.historytrip = res;
                                if (this.historytrip.data.Trip != null) {
                                    this.hcount = 0;
                                    for (let i = 0; i < this.historytrip.data.Trip.length; i++) {
                                        if (this.historytrip.data.Trip[i].IsRecent == true) {
                                            this.hcount += 1;
                                        }

                                    }
                                    this.events.publish('historycount', this.hcount);
                                    console.log(this.hcount);
                                }
                            })
                            this.provider.getFuturetrip(this.res.data.Pilot.pkPilotId).subscribe(res => {
                                console.log(res);
                                this.futuretrip = res;
                                if (this.futuretrip.data.Trip != null) {
                                    this.fcount = 0;
                                    for (let i = 0; i < this.futuretrip.data.Trip.length; i++) {
                                        if (this.futuretrip.data.Trip[i].IsRecent == true) {
                                            this.fcount += 1;
                                        }

                                    }
                                    this.events.publish('futurecount', this.fcount);
                                    console.log(this.fcount);
                                }
                            })
                            this.provider.getAllRequest(this.res.data.Pilot.pkPilotId).subscribe(res => {

                                this.pending = res;

                                if (this.pending.data.Requests != null) {
                                    this.pencount = 0;
                                    for (let i = 0; i < this.pending.data.Requests.length; i++) {
                                        if (this.pending.data.Requests[i].IsRecent == 0) {
                                            this.pencount += 1;
                                        }

                                    }
                                    this.events.publish('pencount', this.pencount);
                                    console.log(this.pencount);
                                }
                            })
                            this.provider.getRecentMsgList(this.res.data.Pilot.pkPilotId).subscribe(res => {
                                this.message = res;

                                if (this.message.data.Messages != null) {
                                    this.mcount = 0;
                                    for (let i = 0; i < this.message.data.Messages.length; i++) {
                                        if (this.message.data.Messages[i].IsRecent == 0 && this.message.data.Messages[i].IsReceive == true) {
                                            this.mcount += 1;
                                        }

                                    }
                                    this.events.publish('mcount', this.mcount);
                                    console.log(this.mcount);
                                }

                            })
                            if (this.res.data.Pilot.MemberShipType == "" || this.res.data.Pilot.MemberShipType == 0) {
                                this.loading.dismiss();
                                this.app.getRootNav().setRoot("TabpagePage", { tabIndex: 1, 'istab': 'google' }, { animate: false }).then(() => {
                                    this.events.publish('userdata', this.res);
                                })
                            }
                            else {
                                this.loading.dismiss();
                                this.app.getRootNav().setRoot("TabpagePage", { tabIndex: 0, 'istab': 'google' }, { animate: false }).then(() => {
                                    this.events.publish('userdata', this.res);
                                })
                            }


                            console.log('login');


                        }
                        else {

                        }
                    });

                }
                

                // if no value is available in storage then get fcm token and redirect to login page
                else {

                    fcm.getToken()
                        .then(r => this.provider.settoken(r.token))
                        .catch(err => console.log(err));

                    this.loading.dismiss();
                    this.rootPage = 'LoginPage';
                    splashScreen.hide();
                }
            });

        });
    }


    // show loading dialog
    showloader() {
        this.loading = this.loadingCtrl.create({
            content: ''
        });

        this.loading.present();
    }

}

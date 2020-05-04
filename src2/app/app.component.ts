import { Component } from '@angular/core';
import { Platform, LoadingController, App, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabpagePage } from '../pages/tabpage/tabpage';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { AuthproviderProvider } from '../providers/authprovider/authprovider';
import { Geolocation } from '@ionic-native/geolocation';
import { Firebase } from '@ionic-native/firebase';
import { Diagnostic } from '@ionic-native/diagnostic';
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


    // tab1: any = HomePage;
    // tab2: any = "ProfilePage";
    // tab3: any = "PendingPage";
    // tab4: any = "NotificationPage";
    // tab5: any = "MessagePage";

    constructor(public platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage, public loadingCtrl: LoadingController, public app: App, public provider: AuthproviderProvider, public events: Events, public firebase: Firebase, public geolocation: Geolocation, public diagnostic: Diagnostic) {

        platform.ready().then(() => {
            statusBar.styleDefault();
            this.firebase.grantPermission();


            this.provider.getallmasterdata().subscribe(res => {
                this.provider.setmasterdata(res);
            })


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

            storage.get('logout').then(val => {
                this.logout = val;
                console.log(this.logout);
            })
            storage.get('email').then(val => {
                this.email = val;
            })
            storage.get('token').then(val => {
                if(val != null){
                    this.token = val;
                    this.provider.settoken(this.token);
                }
                
            })
            storage.get('password').then(val => {
                // if (this.token != "" || this.token != undefined || this.token != null) {
                //      this.tokenrefresh();
                // }
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
                        // this.firebase.getToken()
                        //     .then(token => this.provider.settoken(token))
                        //     .catch(error => console.error('Error getting token', error));


                        // this.firebase.onTokenRefresh()
                        //     .subscribe((token: string) => this.provider.settoken(token));
                        // this.loading.dismiss();
                        this.loading.dismiss();
                        let rootPageParams = { 'data': res }
                        this.app.getRootNav().setRoot('TabpagePage', rootPageParams);
                        
                        splashScreen.hide();
                    })
                }
                else {
                    this.firebase.getToken()
                        .then(token => this.provider.settoken(token))
                        .catch(error => console.error('Error getting token', error));


                    this.firebase.onTokenRefresh()
                        .subscribe((token: string) => this.provider.settoken(token));
                    this.loading.dismiss();
                    this.rootPage = 'LoginPage';
                    splashScreen.hide();
                }
            });

        });
    }



    showloader() {
        this.loading = this.loadingCtrl.create({
            content: ''
        });

        this.loading.present();
    }

    // tokenrefresh() {
    //     this.fcm.onTokenRefresh().subscribe(token => {
    //         //alert(token);
    //         this.provider.settoken(token);
    //     })
    // }


}

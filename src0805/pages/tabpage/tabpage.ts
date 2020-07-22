import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, App, AlertController, Searchbar, ActionSheetController, ToastController, Platform, Alert, ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
import { Storage } from '@ionic/storage';
import { Tabs } from 'ionic-angular';
import { File } from '@ionic-native/file';
//import { Transfer, TransferObject } from '@ionic-native/transfer';
import { FilePath } from '@ionic-native/file-path';
//import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { Firebase } from '@ionic-native/firebase';
import * as moment from 'moment';
import { Socket } from 'ng-socket-io';
import { Geolocation } from '@ionic-native/geolocation';
//import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
//import { LocalNotifications } from '@ionic-native/local-notifications';
declare var jQuery: any;
declare var google;
import {
    Plugins,
    PushNotification,
    PushNotificationToken,
    PushNotificationActionPerformed,
    CameraResultType
} from '@capacitor/core';

const { PushNotifications, LocalNotifications, Camera } = Plugins;


/** 
 * Generated class for the TabpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
    selector: 'page-tabpage',
    templateUrl: 'tabpage.html',
})
export class TabpagePage {
    @ViewChild('searchbar') searchbar: Searchbar;
    @ViewChild('myTabs') myTabs: Tabs;
    tab1: any = HomePage;
    tab2: any = 'ProfilePage';
    tab3: any = "PendingPage";
    tab4: any = "NotificationPage";
    tab5: any = "MessagePage";
    tab6: any = "SearchtabPage";
    newuserprofilepic: any;
    masterdata: any;
    userdata: any;
    myInput: any;
    id: any;
    search: boolean = false;
    searchdata: any;
    seachtabhide: boolean = false;
    usertype: any;
    res: any;
    userprofilepic: any;
    lastImage: any;
    mySelectedIndex: any;
    tabIndex: any;
    searchdataarray: any;
    tempdataarray: any;
    intro: any;
    searchres: any;
    eventsval: any;
    selectedtab: any;
    selecttab: any;
    hideonsearchactive: boolean = false;
    isgooglelogin: any;
    isOwner: any;
    userfullname: any;
    availabilitydata: any;
    datearry: any;
    createtripcomplete: any;
    istabpage: any;
    oppositeid: any;
    // startDate: any = new Date("2017-10-01");
    // endDate: any = new Date("2017-10-07");
    //,public backgroundGeolocation: BackgroundGeolocation
    //public camera: Camera,
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public provider: AuthproviderProvider, public app: App, public alertCtrl: AlertController, public storage: Storage, public actionSheetCtrl: ActionSheetController, public platform: Platform, public toastCtrl: ToastController, public file: File, public filePath: FilePath, public googlePlus: GooglePlus, public firebase: Firebase, public socket: Socket, public geolocation: Geolocation, public modalCtrl: ModalController) {
        // const config: BackgroundGeolocationConfig = {
        //     desiredAccuracy: 10,
        //     stationaryRadius: 20,
        //     distanceFilter: 30,
        //     debug: true, //  enable this hear sounds for background-geolocation life-cycle.
        //     stopOnTerminate: false, // enable this to clear background location settings when the app terminates
        // };

        storage.get('introslidelogin1').then(val => {
            this.intro = val;
            if (this.intro == null || this.intro == undefined || this.intro == "") {
                this.storage.set("introslidelogin1", true);
                let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1" });
                profileModal.present();
            }
            else {

            }
        })

        platform.ready().then(() => {
            //LocalNotifications.requestPermissions();
            this.events.subscribe('refreshsearchdata', val => {
                this.searchres = val;
                this.searchdataarray = this.searchres.data.Pilots;
                console.log(this.searchdataarray);
                this.tempdataarray = this.searchdataarray;
            })

            // let notifications = {
            //     id: 1,
            //     text: "data.body",
            //     sound: 'default',
            //     foreground: true,
            //     data: "data"
            // }
            // this.localNotifications.schedule(notifications);
            // this.localNotifications.schedule({
            //     id: 1,
            //     text: "JSON.stringify(data)",
            //     sound: 'default',
            //     data: { secret: "key" }
            //   });

            // if (platform.is('ios') || platform.is('android')) {

            //     //Subscribe on pause
            //     this.platform.pause.subscribe(() => {
            //         //Hello pause
            //         this.backgroundGeolocation.stop();
            //     });

            //     //Subscribe on resume
            //     this.platform.resume.subscribe(() => {
            //         this.backgroundGeolocation.start();
            //     });
            // }
            // this.backgroundGeolocation.getCurrentLocation()
            //     .then((location: BackgroundGeolocationResponse) => {
            //         console.log(location);
            //         var lat = location.latitude;
            //         var long = location.longitude;
            //         var latlong = lat + "," + long;
            //         this.provider.updatePosition(this.id, latlong).subscribe(res => {

            //         })

            //         this.backgroundGeolocation.finish();

            //     });
            //         PushNotifications.addListener('pushNotificationReceived', 
            //   (notification: PushNotification) => {
            //     alert('Push received: ' + JSON.stringify(notification));
            //   }
            // );

            // PushNotifications.addListener('pushNotificationActionPerformed', 
            //   (notification: PushNotificationActionPerformed) => {
            //     alert('Push action performed: ' + JSON.stringify(notification));
            //   }
            // );

            this.geolocation.getCurrentPosition()
                .then((data: any) => {
                    //this.isLocationEnabled 	= true;
                    console.log("get api called");
                    var latitude = data.coords.latitude;
                    var longitude = data.coords.longitude;
                    var latlong = latitude + "," + longitude;
                    this.storage.get('id').then(val => {
                        var geocoder = new google.maps.Geocoder;
                        this.geocodeLatLng(geocoder, latlong);
                        this.id = val;
                        this.provider.updatePosition(this.id, latlong).subscribe(res => {

                        })
                    })
                })

            this.istabpage = navParams.get('istab');
            if (this.istabpage == undefined) {
                this.events.subscribe('available', val => {
                    this.availabilitydata = val;

                })
                // this.events.subscribe('tabpage', val => {
                //     this.istabpage = val;
                //     console.log(this.istabpage);
                //     this.userfullname = this.provider.getusername();
                //     if (this.istabpage == undefined) {
                this.storage.get('usertype').then(res => {
                    console.log(res);
                    if (res == "Owner Operator") {
                        this.isOwner = false;
                    }
                    else {
                        this.isOwner = true;
                    }

                })

                this.events.subscribe('userdata', val => {
                    console.log('google login data', val);
                    this.userdata = val;
                })
                this.events.subscribe('userdataupdate', res => {
                    this.userdata = "";
                    this.userfullname = "";
                    this.userdata = res;
                    this.userfullname = this.userdata.data.Pilot.PilotFname;
                    this.provider.setusername(this.userfullname);
                })
                this.events.subscribe('updatedavailability', res => {
                    this.availabilitydata = res;
                })

                // this.getDateArray(this.startDate, this.endDate);
                // this.storage.get('userfullname').then(res => {
                //     console.log(res);
                //     this.userfullname = res;
                // })

                this.storage.get('id').then(val => {
                    this.id = val;
                    this.userdata = this.navParams.get("data");
                    this.availabilitydata = this.userdata.data.Pilot.Availability;
                    this.userfullname = this.userdata.data.Pilot.PilotFname;
                    this.provider.setusername(this.userfullname);
                    console.log(this.userdata);
                    this.userprofilepic = this.userdata.data.Pilot.PhotoPath;
                    console.log(this.userprofilepic);
                    if (this.userdata != undefined) {
                        this.storage.set('userdata', this.userdata);
                    }
                    this.usertype = this.navParams.get('usertype');
                    this.provider.search('', this.id).subscribe(res => {
                        this.searchres = res;
                        this.searchdataarray = this.searchres.data.Pilots;
                        console.log(this.searchdataarray);
                        this.tempdataarray = this.searchdataarray;
                        // if (this.userdata == undefined) {
                        //     this.storage.get('userdata').then(val => {
                        //         console.log(val);
                        //         this.userdata = val;
                        //         this.userprofilepic = this.userdata.data.Pilot.PhotoPath;
                        //         this.events.publish('userdata', this.userdata, this.masterdata);
                        //     })
                        // }
                    })


                })

                this.events.subscribe('setfocus', val => {
                    console.log(val);
                    if (val == true) {
                        this.searchbar.setFocus();
                    }
                })
                let tabIndex = this.navParams.get('tabIndex');
                if (tabIndex) {
                    this.events.publish('userdata', this.userdata);
                    this.tabIndex = tabIndex;
                }

                //     }
                // })

            }
            else if (this.istabpage == 'google') {
                this.storage.get('usertype').then(res => {
                    console.log(res);
                    if (res == "Owner Operator") {
                        this.isOwner = false;
                    }
                    else {
                        this.isOwner = true;
                    }

                })
                this.events.subscribe('userdata', val => {
                    console.log('google login data', val);
                    this.userdata = val;
                    this.availabilitydata = this.userdata.data.Pilot.Availability;
                    this.userfullname = this.userdata.data.Pilot.PilotFname;
                    this.provider.setusername(this.userfullname);
                    console.log(this.userdata);
                    this.userprofilepic = this.userdata.data.Pilot.PhotoPath;
                })
                this.events.subscribe('setfocus', val => {
                    console.log(val);
                    if (val == true) {
                        this.searchbar.setFocus();
                    }
                })
                let tabIndex = this.navParams.get('tabIndex');
                if (tabIndex) {
                    //this.events.publish('userdata',this.userdata);
                    this.tabIndex = tabIndex;
                }
                this.events.subscribe('userdataupdate', res => {
                    this.userdata = "";
                    this.userfullname = "";
                    this.userdata = res;
                    this.userfullname = this.userdata.data.Pilot.PilotFname;
                    this.provider.setusername(this.userfullname);
                })

                this.provider.search('', this.id).subscribe(res => {
                    this.searchres = res;
                    this.searchdataarray = this.searchres.data.Pilots;
                    console.log(this.searchdataarray);
                    this.tempdataarray = this.searchdataarray;
                    // if (this.userdata == undefined) {
                    //     this.storage.get('userdata').then(val => {
                    //         console.log(val);
                    //         this.userdata = val;
                    //         this.userprofilepic = this.userdata.data.Pilot.PhotoPath;
                    //         this.events.publish('userdata', this.userdata, this.masterdata);
                    //     })
                    // }
                })
            }
            else if (this.istabpage == false) {
                this.userfullname = this.provider.getusername();
                this.events.subscribe('setfocus', val => {
                    console.log(val);
                    if (val == true) {
                        this.searchbar.setFocus();
                    }
                })
                let tabIndex = this.navParams.get('tabIndex');
                if (tabIndex) {
                    this.tabIndex = tabIndex;
                }
                this.events.subscribe('userdataupdate', res => {
                    this.userdata = "";
                    this.userfullname = "";
                    this.userdata = res;
                    this.userfullname = this.userdata.data.Pilot.PilotFname;
                    this.provider.setusername(this.userfullname);
                })
                this.storage.get('userdata').then(val => {
                    var userdata = val;
                    this.userprofilepic = userdata.data.Pilot.PhotoPath;

                })
                this.events.subscribe('updatedavailability', res => {
                    this.availabilitydata = res;
                })
                this.provider.search('', this.id).subscribe(res => {
                    this.searchres = res;
                    this.searchdataarray = this.searchres.data.Pilots;
                    console.log(this.searchdataarray);
                    this.tempdataarray = this.searchdataarray;
                    // if (this.userdata == undefined) {
                    //     this.storage.get('userdata').then(val => {
                    //         console.log(val);
                    //         this.userdata = val;
                    //         this.userprofilepic = this.userdata.data.Pilot.PhotoPath;
                    //         this.events.publish('userdata', this.userdata, this.masterdata);
                    //     })
                    // }
                })

            }
            //this.navCtrl.push('ChatpagePage', { 'oppositeid': '1' });

            // this.localNotifications.on('click').subscribe(notification => {
            //      let alert = this.alertCtrl.create({
            //             title:'Pilot',
            //             message : JSON.stringify(notification)
            //           });
            //           alert.present(); 
            //   });


            //       this.firebase.onNotificationOpen().subscribe(data =>{
            //         console.log(JSON.stringify(data));
            //         if (data.tap && data.t !== undefined) {
            //             console.log("Received in background");
            //             console.log('id of user', data.id);
            //             if (data.t == '1') {
            //                 this.socket.connect();
            //                 this.provider.setoppositeid(data.id);
            //                 this.socket.emit('set-nickname', 'pilot');
            //                 this.navCtrl.push('ChatpagePage', { 'oppositeid': data.id });
            //             }
            //             else if (data.t == '2') {
            //                 this.navCtrl.push('RequestpagePage', { 'oppositeid': data.id, 'reqid': data.req });
            //             }
            //             else if (data.t == '3') {
            //                 this.navCtrl.push('RequestpagePage', { 'oppositeid': data.id, 'reqid': data.req });
            //             }
            //             else if (data.t == '4') {
            //                 this.navCtrl.push('RequestpagePage', { 'oppositeid': data.id, 'reqid': data.req });
            //             }
            //             else if (data.t = '5') {
            //                 this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': data.id });
            //             }
            //             else if (data.t = '8') {
            //                 this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': data.id });
            //             }
            //         } else {
            //             console.log("Received in foreground");
            //             console.log(JSON.stringify(data));
            //             this.oppositeid = this.provider.getoppositeid();
            //             if(data.t == '1'){
            //             if(this.oppositeid != data.id ){
            //                 this.formnotification(data);
            //             }
            //             else{
            //                     console.log('opposite id same');

            //             }
            //         }
            //         else{
            //             this.formnotification(data);
            //         }



            //         };
            //     });

            //  let observable = this.localNotifications.on('click').subscribe(notification => {
            //         console.log('loc data');
            //         console.log(notification);
            //         if(notification.data.t !== undefined){
            //         if (notification.data.t == '1') {
            //             this.socket.connect();
            //             this.provider.setoppositeid(notification.data.id);
            //             this.socket.emit('set-nickname', 'pilot');
            //             this.navCtrl.push('ChatpagePage', { 'oppositeid': notification.data.id });
            //             //observable.unsubscribe();
            //         }
            //         else if (notification.data.t == '2') {
            //             this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //             //observable.unsubscribe();
            //         }
            //         else if (notification.data.t == '3') {
            //             this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //             //observable.unsubscribe();
            //         }
            //         else if (notification.data.t == '4') {
            //             this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //             //observable.unsubscribe();
            //         }
            //         else if (notification.data.t = '5') {
            //             this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.data.id });
            //             //observable.unsubscribe();
            //         }
            //         else if (notification.data.t = '8') {
            //             this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.data.id });
            //             //observable.unsubscribe();
            //         }
            //     }
            //     else{
            //         //alert('no page open');
            //     }
            //       });
            // LocalNotifications.addListener('localNotificationReceived',(notification)=>{
            //     console.log(notification);
            // })

            LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
                console.log(notification);
                if (notification.notification.extra.t !== undefined) {
                    if (notification.notification.extra.t == '1') {
                        this.socket.connect();
                        this.provider.setoppositeid(notification.notification.extra.id);
                        this.socket.emit('set-nickname', 'pilot');
                        this.navCtrl.push('ChatpagePage', { 'oppositeid': notification.notification.extra.id });
                        //observable.unsubscribe();
                    }
                    else if (notification.notification.extra.t == '2') {
                        this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.extra.id, 'reqid': notification.notification.extra.req });
                        //observable.unsubscribe();
                    }
                    else if (notification.notification.extra.t == '3') {
                        this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.extra.id, 'reqid': notification.notification.extra.req });
                        //observable.unsubscribe();
                    }
                    else if (notification.notification.extra.t == '4') {
                        this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.extra.id, 'reqid': notification.notification.extra.req });
                        //observable.unsubscribe();
                    }
                    else if (notification.notification.extra.t = '5') {
                        this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.notification.extra.id });
                        //observable.unsubscribe();
                    }
                    else if (notification.notification.extra.t = '8') {
                        this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.notification.extra.id });
                        //observable.unsubscribe();
                    }
                }
                else {
                    //alert('no page open');
                }
            })
            // this.localNotifications.on('click').subscribe(notification => {
            //     console.log('loc data');
            //     console.log(notification);
            //     if(notification.data.t !== undefined){
            //     if (notification.data.t == '1') {
            //         this.socket.connect();
            //         this.provider.setoppositeid(notification.data.id);
            //         this.socket.emit('set-nickname', 'pilot');
            //         this.navCtrl.push('ChatpagePage', { 'oppositeid': notification.data.id });
            //         //observable.unsubscribe();
            //     }
            //     else if (notification.data.t == '2') {
            //         this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //         //observable.unsubscribe();
            //     }
            //     else if (notification.data.t == '3') {
            //         this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //         //observable.unsubscribe();
            //     }
            //     else if (notification.data.t == '4') {
            //         this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.data.id, 'reqid': notification.data.req });
            //         //observable.unsubscribe();
            //     }
            //     else if (notification.data.t = '5') {
            //         this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.data.id });
            //         //observable.unsubscribe();
            //     }
            //     else if (notification.data.t = '8') {
            //         this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.data.id });
            //         //observable.unsubscribe();
            //     }
            // }
            // else{
            //     //alert('no page open');
            // }
            //   });

            PushNotifications.addListener('pushNotificationReceived',
                (notification: PushNotification) => {
                    //alert('Push received: ' + JSON.stringify(notification.data));
                    this.oppositeid = this.provider.getoppositeid();
                    if (notification.data.t == "1") {
                        if (this.oppositeid != notification.data.id) {
                            //this.formnotification(data);
                            this.formnotification(notification.data);
                        }
                        else {
                            console.log('opposite id same');

                        }
                    }
                    else if (notification.data.t != "1") {
                        this.formnotification(notification.data);
                    }
                }
            );

            // Method called when tapping on a notification
            PushNotifications.addListener('pushNotificationActionPerformed',
                (notification: PushNotificationActionPerformed) => {
                    // this.formnotification(notification);
                    // alert('Push action performed: ' + JSON.stringify(notification));
                    if (notification.notification.data.t !== undefined) {
                        console.log("Received in background");
                        console.log('id of user', notification.notification.data.id);
                        if (notification.notification.data.t == '1') {
                            this.socket.connect();
                            this.provider.setoppositeid(notification.notification.data.id);
                            this.socket.emit('set-nickname', 'pilot');
                            this.navCtrl.push('ChatpagePage', { 'oppositeid': notification.notification.data.id });
                        }
                        else if (notification.notification.data.t == '2') {
                            this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.data.id, 'reqid': notification.notification.data.req });
                        }
                        else if (notification.notification.data.t == '3') {
                            this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.data.id, 'reqid': notification.notification.data.req });
                        }
                        else if (notification.notification.data.t == '4') {
                            this.navCtrl.push('RequestpagePage', { 'oppositeid': notification.notification.data.id, 'reqid': notification.notification.data.req });
                        }
                        else if (notification.notification.data.t = '5') {
                            this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.notification.data.id });
                        }
                        else if (notification.notification.data.t = '8') {
                            this.navCtrl.push('OpenpendingnotificationPage', { 'tripid': notification.notification.data.id });
                        }
                        // } else {
                        //     console.log("Received in foreground");
                        //     console.log(JSON.stringify(notification.data));
                        //     this.oppositeid = this.provider.getoppositeid();
                        //     if(notification.data.t == '1'){
                        //     if(this.oppositeid != notification.data.id ){
                        //         this.formnotification(notification.data);
                        //     }
                        //     else{
                        //             console.log('opposite id same');

                        //     }
                        //     }
                        // }
                    }

                }
            );
        })
    }

    profileclick() {

        this.search = false;
        console.log(this.userdata);
        if (this.userdata == undefined) {
            this.storage.get('userdata').then(val => {
                console.log(val);
                this.userdata = val;
                this.events.publish('userdata', this.userdata);
            })
        }
        else if (this.userdata == null) {
            console.log('userdata null');
            this.storage.get('userdata').then(val => {
                console.log(val);
                this.userdata = val;
                this.events.publish('userdata', this.userdata);
            })
        }
        else {
            this.events.publish('userdata', this.userdata);
        }

    }
    homeclick() {

        console.log('click home');
        this.events.publish('member', this.masterdata);
    }
    searchclick() {
        this.events.publish('searchdata', this.searchdata);
    }
    pendingclick() {

    }

    notificationclick() {

    }
    messageclick() {

    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad TabpagePage');
    }
    logout() {
        let modaloption = {
            cssClass: "modal-fullscreen"
        }
        let usermodal = this.modalCtrl.create("UsermodalPage", {}, modaloption);
        usermodal.present();
        // this.showAlert();
    }

    availablity() {
        if (this.isOwner == false) {
            this.navCtrl.push('GetavailablepilotPage');
        }
        else {
            this.navCtrl.push('AvailabilityPage').then(() => {
                this.events.publish('availabilitydata', this.availabilitydata);
            });
        }
    }

    profile() {
        //this.app.getRootNav().getActiveChildNav().select(1);
        this.navCtrl.push('FavuserPage');
    }

    showAlert() {
        const prompt = this.alertCtrl.create({
            title: this.userfullname,
            message: "Are you sure you want to logout ?",
            buttons: [
                {
                    text: 'Yes',
                    handler: data => {
                        this.storage.get('isgooglelogin').then(val => {
                            this.isgooglelogin = val;
                            if (this.isgooglelogin == true) {
                                // this.app.getRootNav().getActiveChildNav().select(0);
                                //      this.navCtrl.push('LoginPage', { animate: false }).then(() => {
                                //  })
                                this.googlePlus.logout().then(() => {
                                    this.storage.set('isgooglelogin', false);
                                    console.log('google logout');
                                    this.app.getRootNav().getActiveChildNav().select(0);
                                    this.navCtrl.push('LoginPage', { animate: false }).then(() => {
                                    })
                                })
                            }
                            else {
                                this.app.getRootNav().getActiveChildNav().select(0);
                                this.navCtrl.push('LoginPage', { animate: false }).then(() => {
                                    this.storage.set('logout', true);
                                });
                            }
                        })


                    }
                },
                {
                    text: 'No',
                    handler: data => {
                        console.log('No clicked');
                    }
                }
            ]
        });
        prompt.present();
    }

    onfocuslost() {
        this.myInput = "";
    }
    onfocus() {
        this.app.getRootNav().getActiveChildNav().select(5);
    }

    onInput() {
        this.searchdataarray = this.tempdataarray;
        console.log(this.myInput);
        if (this.myInput.toString().length > 1) {
            this.searchdataarray = this.searchdataarray.filter((item) => {
                return item.PilotFname.indexOf(this.myInput) > -1 || item.PilotLname.indexOf(this.myInput) > -1;
            });
            this.events.publish('searchdata', this.searchdataarray);
            this.app.getRootNav().getActiveChildNav().select(5);
        }
        else if (this.myInput.toString().length < 1) {
        }
    }

    async presentActionSheet() {
        const image = await Camera.getPhoto({
            quality: 50,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        });
        // image.webPath will contain a path that can be set as an image src. 
        // You can access the original file using image.path, which can be 
        // passed to the Filesystem API to read the raw data of the image, 
        // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
        console.log(image);
        var imageUrl = image.dataUrl;
        console.log(imageUrl);
        let string = imageUrl.split(',');
        let img = string[1];
        this.provider.setloading();
        this.provider.uploadUserProfilePic(this.id, img).subscribe(res => {
            this.newuserprofilepic = res;
            this.userprofilepic = this.newuserprofilepic.data.Pilot.PhotoPath;
            this.storage.set("userprofilepic", this.userprofilepic);
            this.provider.dismissloading();
        })
        // let actionSheet = this.actionSheetCtrl.create({
        //     buttons: [
        //         {
        //             text: 'Gallery',
        //             handler: () => {
        //                 this.takePicture(1);
        //                 //this.takePicture(this.Cam.PictureSourceType.PHOTOLIBRARY);
        //             }
        //         },
        //         {
        //             text: 'Camera',
        //             handler: () => {
        //                 this.takePicture(2);
        //                 //this.takePicture(this.camera.PictureSourceType.CAMERA);
        //             }
        //         },
        //         {
        //             text: 'Cancel',
        //             role: 'cancel'
        //         }
        //     ]
        // });
        // actionSheet.present();
    }

    async takePicture(sourceType) {
        // Create options for the Camera Dialog

        if (sourceType == 1) {


        }
        else {
            const image = await Camera.getPhoto({
                quality: 50,
                allowEditing: true,
                resultType: CameraResultType.Base64
            });
            // image.webPath will contain a path that can be set as an image src. 
            // You can access the original file using image.path, which can be 
            // passed to the Filesystem API to read the raw data of the image, 
            // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
            console.log(image);
            var imageUrl = image.base64String;
            console.log(imageUrl);
            let string = imageUrl.split(',');
            let img = string[1];
            this.provider.setloading();
            this.provider.uploadUserProfilePic(this.id, img).subscribe(res => {
                this.newuserprofilepic = res;
                this.userprofilepic = this.newuserprofilepic.data.Pilot.PhotoPath;
                this.storage.set("userprofilepic", this.userprofilepic);
                this.provider.dismissloading();
            })
            // Can be set to the src of an image now
        }

        // var options = {
        //     quality: 50,
        //     sourceType: sourceType,
        //     saveToPhotoAlbum: false,
        //     correctOrientation: true
        // };

        // // Get the data of an image
        // this.camera.getPicture(options).then((imagePath) => {
        //     // Special handling for Android library
        //     if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        //         this.filePath.resolveNativePath(imagePath)
        //             .then(filePath => {
        //                 let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
        //                 let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
        //             });
        //     } else {
        //         var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        //         var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        //         this.file.readAsDataURL(correctPath, currentName)
        //             .then(base64File => {
        //                 let string = base64File.split(',');
        //                 let img = string[1];
        //                 this.provider.setloading();
        //                 this.provider.uploadUserProfilePic(this.id, img).subscribe(res => {
        //                     this.newuserprofilepic = res;
        //                     this.userprofilepic = this.newuserprofilepic.data.Pilot.PhotoPath;
        //                     this.storage.set("userprofilepic", this.userprofilepic);
        //                     this.provider.dismissloading();
        //                 })
        //             })
        //             .catch(() => {
        //                 this.provider.dismissloading();
        //             })
        //     }
        // }, (err) => {
        //     this.presentToast('Error while selecting image.');
        // });
    }
    private presentToast(text) {
        let toast = this.toastCtrl.create({
            message: text,
            duration: 3000,
            position: 'top'
        });
        toast.present();
    }


    formnotification(data) {
        //console.log('function call...');
        //console.log("data",data);
        //console.log("body",data.body);
        //console.log("id",data.gcm.message_id);
        LocalNotifications.schedule({
            notifications: [
                {
                    title: data.title,
                    body: data.body,
                    id: 1,
                    schedule: { at: new Date(Date.now() + 1000 * 1) },
                    sound: 'default',
                    attachments: null,
                    actionTypeId: "",
                    extra: data
                }
            ]
        });
        // LocalNotifications.schedule({
        //     notifications: [
        //       {
        //         title: "Fltjob",
        //         body: "Body",
        //         id: 1,
        //         schedule: { at: new Date(Date.now() + 1000 * 5) },
        //         sound: 'default',
        //         attachments: null,
        //         actionTypeId: "",
        //         extra: null
        //       }
        //     ]
        //   });
        // let notification = {
        //     id: data.id,
        //     text: data.body,
        //     sound: 'default',
        //     foreground: true,
        //     data: data
        // }
        // this.localNotifications.schedule(notification);
    }

    geocodeLatLng(geocoder, latlng) {
        var latlngStr = latlng.split(',', 2);
        var latlng1 = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
        // var latlng1 = {lat: parseFloat('55.585901'), lng: parseFloat('-105.750596')};
        geocoder.geocode({ 'location': latlng1 }, function (results, status) {
            console.log("Geolocation" + status)

            if (status === 'OK') {
                //    console.log("results"+JSON.stringify(results));
                //    var a= JSON.stringify(results);
                //    console.log(JSON.parse(a))
                console.log(results);
                var countryname = results[6].formatted_address.toString();
                console.log(countryname);
                // if(countryname == undefined){
                // this.storage.set("country", countryname);
                localStorage.setItem("country", countryname);
                // }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    }

}

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
    utype: any;
    pencount: any = "";
    mcount: any = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public provider: AuthproviderProvider, public app: App, public alertCtrl: AlertController, public storage: Storage, public actionSheetCtrl: ActionSheetController, public platform: Platform, public toastCtrl: ToastController, public file: File, public filePath: FilePath, public googlePlus: GooglePlus, public firebase: Firebase, public socket: Socket, public geolocation: Geolocation, public modalCtrl: ModalController) {

        // get conn tab count badge
        this.events.subscribe('pencount', val => {
            this.pencount = val;
            if (this.pencount == 0) {
                this.pencount = "";
            }
        })

        // get msg tab count badge
        this.events.subscribe('mcount', val => {
            this.mcount = val;
            if (this.mcount == 0) {
                this.mcount = "";
            }
        })

        // get user type to display slides screen as per user type
        this.storage.get('usertype').then(usertype => {

            storage.get('introslidelogin1').then(val => {
                this.intro = val;
                if (usertype == 'Owner Operator') {
                    if (this.intro == null || this.intro == undefined || this.intro == "") {
                        console.log("operator slide call");
                        this.storage.set("introslidelogin1", true);
                        let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1", user: usertype });
                        profileModal.present();
                    }
                }
                else if (usertype == 'Pilot') {
                    setTimeout(() => {
                        storage.get('introslidelogin5').then(val => {
                            if (val == null || val == undefined || val == "") {
                                console.log("login 5 slides call");
                                let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1", user: usertype });
                                profileModal.present();
                                this.storage.set('introslidelogin5', true);


                            }

                        })
                    }, 5000);

                }

                else if (usertype == 'Flight Attendant') {
                    setTimeout(() => {
                        storage.get('introslidelogin6').then(val => {
                            if (val == null || val == undefined || val == "") {
                                console.log("login 5 slides call");
                                let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1", user: usertype });
                                profileModal.present();
                                this.storage.set('introslidelogin6', true);


                            }

                        })
                    }, 5000);

                }
                else if (usertype == 'Instructor') {
                    setTimeout(() => {
                        storage.get('introslidelogin7').then(val => {
                            if (val == null || val == undefined || val == "") {
                                console.log("login 5 slides call");
                                let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1", user: usertype });
                                profileModal.present();
                                this.storage.set('introslidelogin7', true);


                            }

                        })
                    }, 5000);

                }

                else if (usertype == 'Second In Command') {
                    setTimeout(() => {
                        storage.get('introslidelogin8').then(val => {
                            if (val == null || val == undefined || val == "") {
                                console.log("login 5 slides call");
                                let profileModal = this.modalCtrl.create("IntroductionPage", { slidename: "login1", user: usertype });
                                profileModal.present();
                                this.storage.set('introslidelogin8', true);


                            }

                        })
                    }, 5000);

                }




            })
            this.utype = usertype;
            console.log(this.utype);

        })
        platform.ready().then(() => {
            //LocalNotifications.requestPermissions();

            //get search data to perform search operation
            this.events.subscribe('refreshsearchdata', val => {
                this.searchres = val;
                this.searchdataarray = this.searchres.data.Pilots;
                console.log(this.searchdataarray);
                this.tempdataarray = this.searchdataarray;
            })


            // get current position
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

                // get availabilitydata
                this.events.subscribe('available', val => {
                    // location.reload();
                    this.availabilitydata = val;

                })

                this.storage.get('usertype').then(res => {
                    console.log(res);
                    if (res == "Owner Operator") {
                        this.isOwner = false;
                    }
                    else {
                        this.isOwner = true;
                    }

                })


                // get google login data
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

                // if availability upadte then get availability data
                this.events.subscribe('updatedavailability', res => {
                    this.availabilitydata = res;
                })


                // get id of login user to perform search operation
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

                    })


                })

                // set focus on search box to perform search

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

                })

            }

            // local notification action perform

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


            // decide when to send push notification or local notification for chat

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

                    }

                }
            );
        })
    }

    // method for click on profile tab

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

    // method for click on home tab
    homeclick() {

        console.log('click home');
        this.events.publish('member', this.masterdata);
    }

    // method for clik on search box
    searchclick() {
        this.events.publish('searchdata', this.searchdata);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TabpagePage');
    }

    // open mutiuser login/logout modal
    logout() {
        let modaloption = {
            cssClass: "modal-fullscreen"
        }
        let usermodal = this.modalCtrl.create("UsermodalPage", {}, modaloption);
        usermodal.present();
        // this.showAlert();
    }

    // method is used when click on manage availability
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

    // method for click on prfile page
    profile() {
        this.navCtrl.push('FavuserPage');
    }

    // when user focus lost from search box

    onfocuslost() {
        this.myInput = "";
    }
    onfocus() {
        this.app.getRootNav().getActiveChildNav().select(5);
    }

    // when user focus to search box and start typing
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

    // method is used when user click on profile pic

    async presentActionSheet() {
        const image = await Camera.getPhoto({
            quality: 50,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        });

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

    }

    async takePicture(sourceType) {


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


    }



    // create local notification
    formnotification(data) {

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

    }


    // get current lat and long

    geocodeLatLng(geocoder, latlng) {
        var latlngStr = latlng.split(',', 2);
        var latlng1 = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
        // var latlng1 = {lat: parseFloat('55.585901'), lng: parseFloat('-105.750596')};
        geocoder.geocode({ 'location': latlng1 }, function (results, status) {
            console.log("Geolocation" + status)

            if (status === 'OK') {

                console.log(results);
                var countryname = results[6].formatted_address.toString();
                console.log(countryname);

                localStorage.setItem("country", countryname);
                // }
            } else {
                console.log('Geocoder failed due to: ' + status);
            }
        });
    }

}

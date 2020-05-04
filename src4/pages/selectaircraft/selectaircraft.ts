import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar, Events } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { AuthproviderProvider } from '../../providers/authprovider/authprovider';
/**
 * Generated class for the SelectaircraftPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  priority: 'high'
})
@Component({
  selector: 'page-selectaircraft',
  templateUrl: 'selectaircraft.html',
})

export class SelectaircraftPage {
  @ViewChild('navbar') navBar: Navbar;
  aircrafts: any;
  name: any;
  aircraftname: any;
  listaircraft: any[] = [];
  listtrainaircraft: any[] = [];
  type: any;
  islanguage: boolean = false;
  selectedaircraft: string[] = [];
  selectedtrainaircraft: string[] = [];
  selectedaircraftname: string[] = [];
  selectedtrainaircraftname: string[] = [];
  defaultaircraft: string[] = [];
  languages: any[] = [];
  lanname: any;
  languagelist: any[] = [];
  aircraftnamereturn: any;
  aircrafttrainnamereturn: any;
  languagename: any;
  selectedlanguage: string[] = [];
  selectedlanguagename: string[] = [];
  searchcode: any;
  tempdata: any;
  title: any;
  templanguage: any;
  index: any;
  count: any;
  totalcount: any;
  lang: any;
  trainaircrafts:any;
  traintempdata:any;
  public date: string = new Date().toISOString();
  constructor(public navCtrl: NavController, public navParams: NavParams, public event: Events, public provider: AuthproviderProvider) {
    this.provider.setloading();
  }
  ischeckboxselected(name) {
    console.log(name);
  }

  onInput() {
    if (this.type == 'aircraft' || this.type == 'singleaircraft') {
      if (this.searchcode.toString().length >= 2) {
        this.aircrafts = this.aircrafts.filter((item) => {
          console.log(this.searchcode);
          return item.AircraftType.indexOf(this.searchcode) > -1;
        });
      }
      else if (this.searchcode.toString().length < 2) {
        this.aircrafts = this.tempdata;
      }
    }
    else if (this.type == 'language') {
      if (this.searchcode.toString().length >= 2) {
        this.languages = this.languages.filter((item) => {
          console.log(this.searchcode);
          return item.LanguageName.indexOf(this.searchcode) > -1;
        });
      }
      else if (this.searchcode.toString().length < 2) {
        this.languages = this.templanguage;
      }
    }
  }

  onCancel() {
    console.log('call cancel');
  }

  doInfinite(infiniteScroll) {
    this.index = this.count;
    this.count = parseInt(this.count) + 100;

    setTimeout(() => {
      if (this.count <= this.totalcount) {
        for (let i = this.index; i < this.count; i++) {
          this.languages.push(this.lang.data.Languages[i]);
        }
        infiniteScroll.complete();
        // })
      }

      console.log('Async operation has ended');

    }, 1000);
  }

  ionViewDidEnter() {
    this.count = 100;
    this.type = this.navParams.get('type');
    this.islanguage = false;
    if (this.type == 'aircraft' || this.type == 'singleaircraft' || this.type == "trainaircraft") {
      this.title = "Select Aircraft";
      var aircraft = this.provider.getmasterdata();
      this.aircrafts = aircraft.data.AirCraft;
      this.trainaircrafts = aircraft.data.AirCraft;
      //this.aircrafts = this.navParams.get('aircraftdata');
      this.tempdata = this.aircrafts;
      this.traintempdata = this.trainaircrafts;
      this.provider.dismissloading();
      this.aircraftname = this.navParams.get('selectedaircraft');
    }
    else if (this.type == 'language') {
      this.title = "Select Language";
      this.islanguage = true;
      this.lang = this.provider.getmasterdata();
      this.templanguage = this.lang.data.Languages;
      for (let i = 0; i < 100; i++) {
        this.languages.push(this.lang.data.Languages[i]);
      }
      this.totalcount = this.lang.data.Languages.length;

      console.log(this.languages);
      //this.languages = this.navParams.get('languagedata');
      //this.templanguage = this.languages;
      this.provider.dismissloading();
      this.lanname = this.navParams.get('selectedlanguage');
    }
    console.log('ionViewDidLoad SelectaircraftPage');
    this.navBar.backButtonClick = () => {
      this.selectedaircraft = [];
      this.selectedtrainaircraft=[];
      this.selectedlanguage = [];
      if (this.type == 'aircraft' || this.type == 'singleaircraft') {
        //this.aircrafts = this.tempdata;
        for (let i = 0; i < this.tempdata.length; i++) {
          if (this.tempdata[i].checked == true) {
            this.listaircraft.push(this.tempdata[i]);
            console.log('aircraftlist' + this.listaircraft);
          }
        }
        if (this.listaircraft !== undefined) {
          for (let i = 0; i < this.listaircraft.length; i++) {
            if (this.listaircraft[i].checked == true) {
              this.selectedaircraft.push(this.listaircraft[i].pkAircraftId);
              this.selectedaircraftname.push(this.listaircraft[i].AircraftType);
              this.aircraftnamereturn = this.selectedaircraftname.join();
            }
          }
          console.log(this.aircraftnamereturn);
          if (this.selectedaircraft.length > 0) {
            this.event.publish('selectdata', this.aircraftnamereturn);
          }
          else {
            this.event.publish('selectdata', "");
          }

          this.navCtrl.pop({ animate: false });
          console.log('back done');
        }

      }
      if(this.type == "trainaircraft"){
     
        for (let i = 0; i < this.traintempdata.length; i++) {
          if (this.traintempdata[i].checked == true) {
            this.listtrainaircraft.push(this.traintempdata[i]);
            console.log('aircraftlist' + this.listtrainaircraft);
          }
        }
        if (this.listtrainaircraft !== undefined) {
          for (let i = 0; i < this.listtrainaircraft.length; i++) {
            if (this.listtrainaircraft[i].checked == true) {
              this.selectedtrainaircraft.push(this.listtrainaircraft[i].pkAircraftId);
              this.selectedtrainaircraftname.push(this.listtrainaircraft[i].AircraftType);
              this.aircrafttrainnamereturn = this.selectedtrainaircraftname.join();
            }
          }
          console.log(this.aircrafttrainnamereturn);
          if (this.selectedtrainaircraft.length > 0) {
            this.event.publish('selecttraindata', this.aircrafttrainnamereturn);
          }
          else {
            this.event.publish('selecttraindata', "");
          }

          this.navCtrl.pop({ animate: false });
          console.log('back done');
        }


      }

      if (this.type == 'language') {
        console.log(this.templanguage);
        //this.languages = this.templanguage;
        for (let i = 0; i < this.templanguage.length; i++) {
          if (this.templanguage[i].checked == true) {
            this.languagelist.push(this.templanguage[i]);
            console.log(this.languagelist);
          }
        }
        if (this.languagelist !== undefined) {
          for (let i = 0; i < this.languagelist.length; i++) {
            if (this.languagelist[i].checked == true) {
              this.selectedlanguage.push(this.languagelist[i].pkLanguageId);
              this.selectedlanguagename.push(this.languagelist[i].LanguageName);
              this.languagename = this.selectedlanguagename.join();
              console.log(this.languagename)
            }
          }
          if (this.selectedlanguage.length > 0) {
            this.event.publish('languagedata', this.languagename);
          }
          else {
            this.event.publish('languagedata', "");
          }

          console.log(this.languagename);
          this.navCtrl.pop({ animate: false });
          console.log('back done');
        }

      }

     
    };

  }

  ionViewDidLoad() {

  }

  checkboxselectaircraft(data, event) {
    if (event.checked == false) {
      this.listaircraft.splice(data);
      this.listtrainaircraft.splice(data);
    }
  }

  checkboxselectlanguage(data, event) {
    if (event.checked == false) {
      this.languagelist.splice(data);
    }
    //this.languagelist = <Array<any>>(<Object>this.languages);
  }

  listselect(aircraftname, id) {
    this.event.publish('aircraftname', [aircraftname, id]);
    this.navCtrl.pop();
  }
}

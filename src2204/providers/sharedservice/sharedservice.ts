import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the SharedserviceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SharedserviceProvider {


  constructor(public http: HttpClient) {
    console.log('Hello SharedserviceProvider Provider');
  }

  getaircraftchklist(_aircraftlist, aircraftexp) {

    console.log(aircraftexp);

    var a = aircraftexp;
    if (a.includes(",")) {
      var b = a.split(",");
    }
    else {
      var b = a;
    }

    _aircraftlist.forEach(element => {
      element.checked = false;
      if (b.indexOf(element.AircraftType) != -1) {
        element.checked = true;
      }
    });
    console.log(_aircraftlist);


  }

  gettrainaircraftchklist(_aircraftlisttrain, aircraftexp) {
    console.log(_aircraftlisttrain);
    console.log(aircraftexp);
    var a = aircraftexp;
    if (a.includes(",")) {
      var b = a.split(",");
    }
    else {
      var b = a;
    }

    _aircraftlisttrain.forEach(element => {
      element.checked = false;
      if (b.indexOf(element.AircraftType) != -1) {
        element.checked = true;
      }
    });

  }

  getavionicschklist(avionicslist, avionicsexp) {

    var c = avionicsexp;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    avionicslist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.AvionicsExperienceType) != -1) {
        element.checked = true;
      }
    });
  }

  getlanguagelist(languagelist, selectedlanguage) {
    var c = selectedlanguage;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    languagelist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.LanguageName) != -1) {
        element.checked = true;
      }
    });
  }

  getcountrylist(countrylist, selectedcountry) {
    var c = selectedcountry;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    countrylist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.CountryName) != -1) {
        element.checked = true;
      }
    });
  }

  getcontinentlist(continentlist, selectedcontinent) {
    var c = selectedcontinent;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    continentlist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.name) != -1) {
        element.checked = true;
      }
    });
  }
  getoceaniclist(oceaniclist, selectedoceanic) {
    var c = selectedoceanic;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    oceaniclist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.name) != -1) {
        element.checked = true;
      }
    });
  }

  getairportlist(airlist, selectedair) {
    var c = selectedair;
    if (c.includes(",")) {
      var d = c.split(",");
    }
    else {
      var d = c;
    }
    airlist.forEach(element => {
      element.checked = false;
      if (d.indexOf(element.AirportCode) != -1) {
        element.checked = true;
      }
    });

  }

}

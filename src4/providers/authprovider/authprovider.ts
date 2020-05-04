import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import * as xml2js from "xml2js";
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the AuthproviderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthproviderProvider {
  header: any;
  url: any;
  FCMToken: any;
  paymenturl: any;
  masterdata: any;
  loading: any;
  username: any;
  isescrowskip: any;
  currentuserdata: any;
  oppositeid: any;
  constructor(public http: HttpClient, public storage: Storage, public loadingCtrl: LoadingController) {
    console.log('Hello AuthproviderProvider Provider');
    this.url = "http://pilot2.itsguru.com/API/Pilot";
    this.paymenturl = "http://pilotescrow.itsguru.com/EscowService.asmx"
    // this.header = new HttpHeaders();
    // this.header.append('Content-Type', 'application/json');
    // this.header.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // this.header.append('Access-Control-Allow-Origin', '*');

    // this.header.append('Access-Control-Allow-Headers', 'Content-Type');eaders', 'Content-Type');

  }
  doLogin(email, password, devicetype) {
    let logindata = {
      "EmailId": email,
      "NewPassword": password,
      "DeviceType": devicetype,
      "DeviceToken": this.FCMToken
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/getLoginData", logindata, { headers: header });
  }


  getallmasterdata() {
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.get(this.url + '/getAllMasterData', { headers: header });
  }

  getAirportCode(limit) {
    let aircodedata = {
      "Limit": limit
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getAllAirportCode', aircodedata, { headers: header })
  }

  updateowenerop(id, fname, lname, location, country, memberid, cname, photo) {
    let updateowener = {
      "pkPilotId": id,
      "PilotFname": fname,
      "PilotLname": lname,
      "CurrentLocation": location,
      "CuLocCountry": country,
      "fkMemberShipId": memberid,
      "CompanyName": cname,
      "Photo": photo
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/UpdateOwnerOpr", updateowener, { headers: header });
  }

  updateinstructor(id, fname, lname, memberid, phno, totaltime, timeofinstruct, mclass, mdate, aircraftid, avionicsid, passfail, instrumentins, mutliengineins, complextime, highperformtime, tailwheelinsructor, acroinstructor, dpdrate, dphrate, ipdrate, iphrate, photo,pictime) {
    let updateins = {
      "pkPilotId": id,
      "PilotFname": fname,
      "PilotLname": lname,
      "fkMemberShipId": memberid,
      "cellNumber": phno,
      "TotalTime": totaltime,
      "TotalPICTime":pictime,
      "TimeOfInstruct": timeofinstruct,
      "FAAMedical": mclass,
      "FAAMedicalDate": mdate,
      "fkAircraftId": aircraftid,
      "fkAvionicsExperienceId": avionicsid,
      "PassOrFail": passfail,
      "InstrumentInstructor": instrumentins,
      "MulEngInstructor": mutliengineins,
      "complexTimeReq": complextime,
      "highPerfomanceTime": highperformtime,
      "tailWheelInsrtuctor": tailwheelinsructor,
      "acrobaticsInstructor": acroinstructor,
      "DomPDRate": dpdrate,
      "DomPHRate": dphrate,
      "InterPDRate": ipdrate,
      "InterPHRate": iphrate,
      "Photo": photo
    }


    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/UpdateInstructor", updateins, { headers: header });
  }

  updatepilot(id, fname, lname, nname, location, country, memberid, phno, ttime, mclass, mdate, passport, passportno, passportexpirydate, citizencountry, exptype, continents, oceans, aircraft, avionics, notes, ms, photo,pictime) {
    let updatepil = {
      "pkPilotId": id,
      "PilotFname": fname,
      "PilotLname": lname,
      "PilotNname": nname,
      "CurrentLocation": location,
      "CuLocCountry": country,
      "fkMemberShipId": memberid,
      "cellNumber": phno,
      "WorkNumber": "",
      "TotalTime": ttime,
      "TotalPICTime":pictime,
      "FAAMedical": mclass,
      "FAAMedicalDate": mdate,
      "HavePassport": passport,
      "PassportNo": passportno,
      "PassportExpDate": passportexpirydate,
      "CitizenCountry": citizencountry,
      "fkExperianceId": exptype,
      "Continent": continents,
      "OceanicExp": oceans,
      "fkAircraftId": aircraft,
      "fkCategoryId": "",
      "fkClassId": "",
      "Avionics": avionics,
      "IsLoginWithGoogle": "",
      "OtherNotes": notes,
      "DomPDRate": "",
      "DomPHRate": "",
      "DomNegotiate": "",
      "InterPDRate": "",
      "InterPHRate": "",
      "InterNegotiate": "",
      "rating": "",
      "RatingAirCraftType": "",
      "IsReqPrev12MonthTraining": false,
      "Photo": photo
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/UpdatePilot", updatepil, { headers: header });
  }
  updateflightatt(id, memberid, fname, lname, regionexp, unrestricteduspass, ivisa, cprtraining, aircraft, cullinarytraining, language, continents, specialtrained, req12omonths, exp, passport, aircraftspecifictraining, dpdrate, ipdrate, photo, phno) {
    let updatepil = {
      "pkPilotId": id,
      "fkMemberShipId": memberid,
      "PilotFname": fname,
      "PilotLname": lname,
      "InternationalExperience": regionexp,
      "CurrentUnrestrictedUSPass": unrestricteduspass,
      "InternationalVisas": ivisa,
      "CPRTraining": cprtraining,
      "fkAircraftId": aircraft,
      "CullinaryTraining": cullinarytraining,
      "LanguagesSpoken": language,
      "Continent": continents,
      "IsSpecialTrained": specialtrained,
      "IsReqPrev12MonthTraining": req12omonths,
      "yearOfExperiance": exp,
      "validPassport": passport,
      "isAircraftSpecificTraining": aircraftspecifictraining,
      "DomPDRate": dpdrate,
      "DomPHRate": "",
      "InterPDRate": ipdrate,
      "InterPHRate": "",
      "Photo": photo,
      "cellNumber": phno
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/UpdateFlightAttendant", updatepil, { headers: header });
  }

  getContinents() {
    return this.http.get('assets/data/continents.json');
  }

  createtrip(id, tripname, dairportcode, enairportcode, captain, scommand, fatt, fins, destairportcode, tripsdate, tripedate, nearme, aircraft) {

    let tripdata = {
      "loggedinid": id,
      "TripName": tripname,
      "DepartureCode": dairportcode,
      "enroute_airportCode": enairportcode,
      "DepaLocaton": "",
      "DestLocation": "",
      "Captain": captain,
      "SecondInCommand": scommand,
      "FlightAttendant": fatt,
      "FlightInstructor": fins,
      "DestinationCode": destairportcode,
      "tripStartDate": tripsdate,
      "tripEndDate": tripedate,
      "nearMeCaptain": nearme,
      "fkAircraftId": aircraft
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/inserttrip", tripdata, { headers: header });
  }

  searchairportcode(airportcode) {

    let keyword = {
      "AirportCode": airportcode
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/searchAllAirportCode", keyword, { headers: header });
  }

  filtercaptain(id, totaltime, totaltimetype, pictime, pictimetype, mclass, passport, ratingcertificate, aircraftname, continent, strain, tripid, rate, oceexp, rating,isnearest,isfavouite,isavailable) {
    let fcaptain = {
      "loggedinpilotid": id,
      "TotalTime": totaltime,
      "fkAircraftId1": totaltimetype,
      "picktime": pictime,
      "picktimeaircraftid": pictimetype,
      "FAAMedical": mclass,
      "HavePassport": passport,
      "rating": ratingcertificate,
      "RatingAirCraftType": aircraftname,
      "Continent": continent,
      "IsReqPrev12MonthTraining": strain,
      "tripid": tripid,
      "rate": rate,
      "OceanicExp": oceexp,
      "ratingCount": rating,
      "isNearest":isnearest,
      "isFavrouite":isfavouite,
      "IsAvailable":isavailable
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/filterPilot", fcaptain, { headers: header });
  }

  filtersic(id, totaltime, totaltimetype, mclass, passport, ratingcertificate, aircraftname, continent, strain, tripid, rate, rating,isnearest,isfavouite,isavailable) {
    let fsic = {
      "loggedinpilotid": id,
      "TotalTime": totaltime,
      "fkAircraftId1": totaltimetype,
      "FAAMedical": mclass,
      "HavePassport": passport,
      "rating": ratingcertificate,
      "RatingAirCraftType": aircraftname,
      "Continent": continent,
      "IsReqPrev12MonthTraining": strain,
      "tripid": tripid,
      "rate": rate,
      "ratingCount": rating,
      "isNearest":isnearest,
      "isFavrouite":isfavouite,
      "IsAvailable":isavailable
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/filterSecondInCommand", fsic, { headers: header });
  }

  filterflightattendant(id, exp, passport, continents, aircrafttraining, language, showpic, tripid, rate, rating,isnearest,isfavouite,isavailable) {

    let ffa = {
      "loggedinpilotid": id,
      "yearOfExperiance": exp,
      "HavePassport": passport,
      "Continent": continents,
      "isAircraftSpecificTraining": aircrafttraining,
      "LanguagesSpoken": language,
      "onlyshowprofwithpic": showpic,
      "tripid": tripid,
      "rating": rate,
      "ratingCount": rating,
      "isNearest":isnearest,
      "isFavrouite":isfavouite,
      "IsAvailable":isavailable
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/filterFlightAttedant", ffa, { headers: header });
  }

  filterflightinstructor(id, totaltime, timeofinstruct, instrumentinstructor, multenginstructor, complextime, highperformtime, tailwheelinstructor, acrobaticinstructor, tripid, rate, rating,isnearest,isfavouite,isavailable) {

    let ffi = {
      "loggedinpilotid": id,
      "TotalTime": totaltime,
      "TimeOfInstruct": timeofinstruct,
      "InstrumentInstructor": instrumentinstructor,
      "MulEngInstructor": multenginstructor,
      "complexTimeReq": complextime,
      "highPerfomanceTime": highperformtime,
      "tailWheelInsrtuctor": tailwheelinstructor,
      "acrobaticsInstructor": acrobaticinstructor,
      "tripid": tripid,
      "rating": rate,
      "ratingCount": rating,
      "isNearest":isnearest,
      "isFavrouite":isfavouite,
      "IsAvailable":isavailable
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/filterFlightInstructor", ffi, { headers: header });
  }


  getCurrenttrip(id) {
    let currenttrip = {
      "loggedinid": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/forCurrenttrip", currenttrip, { headers: header });
  }
  getFuturetrip(id) {
    let futuretrip = {
      "loggedinid": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/forFutuertrip", futuretrip, { headers: header });
  }
  getHistorytrip(id) {
    let historytrip = {
      "loggedinid": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/forHistorytrip", historytrip, { headers: header });
  }
  getPendingtrip(id) {
    let pendingtrip = {
      "loggedinid": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/forPendingtrip", pendingtrip, { headers: header });
  }

  Insertavailability(id, comment, fromdate, todate, city, isavailability) {
    let availability = {
      "fkPilotid": id,
      "Comment": comment,
      "FromDate": fromdate,
      "ToDate": todate,
      "City": city,
      "IsAvailability": isavailability
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/insertAvailability", availability, { headers: header });

  }

  // updateavailability(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate, City, IsAvailability, isupdate, isdelete) {
  //   let availability = {
  //     "pkAvailabilityId": pkAvailabilityId,
  //     "fkPilotid": fkPilotid,
  //     "Comment": Comment,
  //     "FromDate": FromDate,
  //     "ToDate": ToDate,
  //     "City": City,
  //     "IsAvailability": IsAvailability,
  //     "IsUpdate": isupdate,
  //     "IsDelete": isdelete
  //   }
  //   let header = new HttpHeaders();
  //   header.append('Content-Type', 'application/json');
  //   return this.http.post(this.url + "/UpdateAvailability", availability, { headers: header });

  // }

  // Deleteavailability(pkAvailabilityId, fkPilotid, Comment, FromDate, ToDate, City, IsAvailability) {
  //   let availability = {
  //     "pkAvailabilityId": pkAvailabilityId,
  //     "fkPilotid": fkPilotid,
  //     "Comment": Comment,
  //     "FromDate": FromDate,
  //     "ToDate": ToDate,
  //     "City": City,
  //     "IsAvailability": IsAvailability,
  //     "IsUpdate": "false",
  //     "IsDelete": "true"
  //   }
  //   let header = new HttpHeaders();
  //   header.append('Content-Type', 'application/json');
  //   return this.http.post(this.url + "/UpdateAvailability", availability, { headers: header });
  // }

  getavailability(id, date) {
    let available = {
      "loggedinid": id,
      "EntryDate": date
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/getAllAvailable", available, { headers: header });
  }

  search(term, id) {

    let searchdata = {
      "name": term,
      "pkPilotId": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/search", searchdata, { headers: header });
  }

  sendnotification(pkid, id, tripid, rate) {

    let notificationdata = {
      "pkPilotId": pkid,
      "loggedinpilotid": id,
      "tripid": tripid,
      "rate": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/sendNotification", notificationdata, { headers: header });
  }

  tripuserwisenotification(tripid, id) {

    let tripnotificationdata = {
      "fkTripId": tripid,
      "loggedinid": id
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/tripUserWiseNotification", tripnotificationdata, { headers: header });
  }

  tripallnotification(tripid) {

    let allnotificationdata = {
      "fkTripId": tripid
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/tripAllNotification", allnotificationdata, { headers: header });
  }

  gettripdetail(tripid, id) {
    let tripdata = {
      "pkTripId": tripid,
      "loggedinid": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/getTripDetail", tripdata, { headers: header });
  }
  acceptoffer(oppositeid, id, tripid, rate) {

    let acceptdata = {
      "oppositid": oppositeid,
      "loggedinid": id,
      "pkTripId": tripid,
      "amount": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/acceptOffer", acceptdata, { headers: header });

  }

  acceptrejecttrip(tripid, oppositeid, isacceptreject, rate) {
    let acceptrejectdata = {
      "fkTripId": tripid,
      "Oppositeid": oppositeid,
      "acceptReject": isacceptreject,
      "amount": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/acceptRejectTrip", acceptrejectdata, { headers: header });

  }

  negotiate(oppositeid, id, tripid, rate) {

    let negotiatedata = {
      "oppositid": oppositeid,
      "loggedinid": id,
      "pkTripId": tripid,
      "amount": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/negotiation", negotiatedata, { headers: header });

  }

  acceptrejectfromowner(tripid, id, oppositeid, isacceptreject, rate) {
    let acceptrejectowner = {
      "fkTripId": tripid,
      "TripcreaterId": id,
      "Oppositeid": oppositeid,
      "acceptReject": isacceptreject, // 0=False and 1=True
      "amount": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/acceptRejectfromOwner", acceptrejectowner, { headers: header });

  }

  createTransaction(tripid, id, oppositeid, rate, date) {
    let createTransaction = {
      "tripid": tripid,
      "ownerId": id,
      "oppositeid": oppositeid,
      "entrydate": date,
      "amount": rate
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.paymenturl + "/createTransaction", createTransaction, { headers: header });

  }

  paymentrelease(tripid) {
    let paymentdata =
    {
      "pkTripId": tripid
    }


    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/completeTrip", paymentdata, { headers: header });
  }

  getmessagelist(id) {

    let msglist = {
      "pilotid": id
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getMessageList', msglist, { headers: header });

  }

  sendmessage(id, oppositeid, msgtype, msg) {

    let sendmsgdata = {
      "loggedinpilotid": id,
      "oppositepilotid": oppositeid,
      "MessageType": msgtype,
      "message": msg
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/', sendmsgdata, { headers: header });

  }

  deletemessage(id, oppositeid) {
    let msgdata = {
      "loggedinpilotid": id,
      "oppositepilotid": oppositeid
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/deleteConversation', msgdata, { headers: header });

  }

  join(fname, lname, mname, clocation, country, mid, email, oldpass, newpass, devicetype, cname) {
    let joindata = {
      "PilotFname": fname,
      "PilotLname": lname,
      "PilotMname": mname,
      "CurrentLocation": clocation,
      "CuLocCountry": country,
      "fkMemberShipId": mid,
      "EmailId": email,
      "OldPssword": oldpass,
      "NewPassword": newpass,
      "DeviceType": devicetype,
      "DeviceToken": this.FCMToken,
      "CompanyName": cname,
      "Photo": "http://www.blueboxinfosoft.com/apps/momentshare/uploads/20190102115342IMG_20190102_171849_18373576074998577.jpg"
    }


    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/InsertPilot", joindata, { headers: header });
  }



  requestsend(oppositeid, id) {
    let reqdata = {
      "oppositepilotid": oppositeid,
      "loggedinpilotid": id
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/sendRequest', reqdata, { headers: header });
  }

  getratingcerti(id) {
    let certidata = {
      "fkPilotid": id
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getRatingCerti', certidata, { headers: header });
  }

  getusermsgs(id, oppositeid) {
    let userdata = {
      "loggedinpilotid": id,
      "oppositepilotid": oppositeid
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/viewConversation', userdata, { headers: header });
  }

  sendNewMsg(SendMessage, loggedinpilotid, oppositepilotid, MessageType) {
    let usermsg = {
      "loggedinpilotid": loggedinpilotid,
      "oppositepilotid": oppositepilotid,
      "MessageType": MessageType,
      "message": SendMessage
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/insertMessage', usermsg, { headers: header });
  }

  insertratingcerti(certiid, id, catid, classid, airid, hours, pic, mrate, current, cdate, ms) {
    let certidata = {
      "RatingCertification": certiid,
      "fkPilotid": id,
      "fkCategoryId": catid,
      "fkClassId": classid,
      "AirCraftType": airid,
      "Hours": hours,
      "PIC": pic,
      "MinimumRate": mrate,
      "CurrentInType": current,
      "EntryDate": cdate,
      "IsReqPrev12MonthTraining": ms
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/insertRatingCerti', certidata, { headers: header });
  }
  getNotification(fkPilotId) {
    let notificationdata = {
      "fkPilotId": fkPilotId
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/Notification', notificationdata, { headers: header });
  }

  getRecentMsgList(fkToPilotId) {
    let msgdata = {
      "fkToPilotId": fkToPilotId
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getMessageList', msgdata, { headers: header });
  }

  getAllRequest(pkpilotid) {
    let reqdata = {
      "pkpilotid": pkpilotid
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getAllRequest', reqdata, { headers: header });
  }

  requestreject(pkRequestId) {
    let reqdata = {
      "pkRequestId": pkRequestId
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/RequestReject', reqdata, { headers: header });
  }

  acceptreject(pkRequestId) {
    let reqdata = {
      "pkRequestId": pkRequestId
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/RequestAccept', reqdata, { headers: header });
  }

  doGoogleLogin(EmailId, PilotFname, PilotLname, PhotoPath, devicetype) {

    let reqdata = {
      "EmailId": EmailId,
      "PilotFname": PilotFname,
      "PilotLname": PilotLname,
      "PhotoPath": PhotoPath,
      "DeviceType": devicetype,
      "DeviceToken": this.FCMToken
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/LogingWithGoogle', reqdata, { headers: header });
  }




  uploadUserProfilePic(id, img) {
    let reqdata = {
      "pkPilotId": id,
      "PhotoPath": img
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/updateProfileImage', reqdata, { headers: header });
  }

  viewprofile(id, oppositeid) {
    let profiledata = {
      "loggedinpilotid": id,
      "pkPilotId": oppositeid
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/viewProfile', profiledata, { headers: header });
  }

  updatefavorite(id, oppositeid, isfav) {
    let favdata = {
      "fkUserID": id,
      "fkPilotid": oppositeid,
      "isFavourite": isfav
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/insertupdateFavourite', favdata, { headers: header });
  }

  insertratingcomment(tripid, id, oppositeid, comment, ratingcount) {
    let rcdata = {
      "fkTripid": tripid,
      "loggedinid": id,
      "ratingforid": oppositeid,
      "comment": comment,
      "ratingCount": ratingcount
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/insertRatingComment', rcdata, { headers: header });
  }

  updateavaialbility(availableid, id, comment, fromdate, todate, city, isupdate, isdelete) {

    let updatedata = {
      "pkAvailabilityId": availableid,
      "fkPilotid": id,
      "Comment": comment,
      "FromDate": fromdate,
      "ToDate": todate,
      "City": city,
      "IsAvailability": true,
      "IsUpdate": isupdate,
      "IsDelete": isdelete
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/UpdateAvailability', updatedata, { headers: header });
  }

  getallavailable(id) {

    let allavailabledata = {
      "loggedinid": id,
      "EntryDate": ""
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/getAllAvailable', allavailabledata, { headers: header });
  }

  updateratingcerti(cid, certiid, id, catid, classid, airid, hours, pic, mrate, current, cdate, ms) {
    let updatecertidata = {
      "pkRatingCertiId": cid,
      "RatingCertification": certiid,
      "fkPilotid": id,
      "fkCategoryId": catid,
      "fkClassId": classid,
      "AirCraftType": airid,
      "Hours": hours,
      "PIC": pic,
      "MinimumRate": mrate,
      "CurrentInType": current,
      "EntryDate": cdate,
      "IsReqPrev12MonthTraining": ms
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + '/updateRatingCerti', updatecertidata, { headers: header });
  }

  addbankdetail(pilotid, countryCode, currancy, bankname, accountName, bicCode, accountNumber, IFSCCode,ier,ispartial,tripid) {
    let acceptrejectdata = {
      "pilotid": pilotid,
      "countryCode": countryCode,
      "curr": currancy,
      "bankname": bankname,
      "accountName": accountName,
      "bicCode": bicCode,
      "accountNumber": accountNumber,
      "IFSCCode": IFSCCode,
      "partialAmt":ier,
      "IsPartial":ispartial,
      "tripId":tripid
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.paymenturl + "/addBankDetail", acceptrejectdata, { headers: header });

  }

  setmasterdata(value) {
    this.masterdata = value;
  }
  getmasterdata() {
    return this.masterdata;
  }

  setloading() {
    this.loading = this.loadingCtrl.create({
      content: ''
    });
    this.loading.present();
  }

  dismissloading() {
    this.loading.dismissAll();
  }

  setusername(username) {
    this.username = username;
  }
  getusername() {
    return this.username;
  }

  setescrowskip(value) {
    this.isescrowskip = value;
  }
  getescrowskip() {
    return this.isescrowskip;
  }

  releasepayment(pilotid, tripid) {
    let paymentdata = {
      "pilotid": pilotid,
      "tripid": tripid
    }

    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.paymenturl + "/ReleasePayment", paymentdata, { headers: header });
  }


  settoken(token) {
    console.log(token);
    this.FCMToken = token;
    this.storage.set('token', token);
    //alert(this.FCMToken);
  }

  deletecertificate(id) {

    let certificatedata = {
      "pkRatingCertiId": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/deleteCertificate", certificatedata, { headers: header });
  }

  canceltrip(id) {
    let tripdata = {
      "pkTripId": id
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/cancelTrip", tripdata, { headers: header });
  }

  paymentoption(id, pid, oid, isaccept, edate) {
    let tripdata = {
      "fktripid": id,
      "fkPilotid": pid,
      "fkOppPilotid": oid,
      "IsEscrow": isaccept,
      "EntryDate": edate
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/paymentoption", tripdata, { headers: header });
  }

  canceltripbypilot(tripid, loginid, date) { //call when owner not accept

    let pilotcanceltrip = {
      "fkTripId": tripid,
      "Oppositeid": loginid,
      "EntryDate": date
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/cancelTripbyOnlyPilot", pilotcanceltrip, { headers: header });
  }

  insertReasonforCancel(tripid, loginid, reason) {
    let cancelreason = {
      "fkTripId": tripid,
      "fkPilotid": loginid,
      "Reason": reason
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/insertReasonforCancel", cancelreason, { headers: header });
  }

  getReasonforCancel(tripid, oppositeid) {
    let reasondata = {
      "fkTripId": tripid,
      "fkPilotid": oppositeid,
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/getReasonforCancel", reasondata, { headers: header });
  }

  canceltripbyboth(tripid, loginid, date) { // call when for both owner and pilot accept trip
    let canceltripdata = {
      "fkTripId": tripid,
      "Oppositeid": loginid,
      "EntryDate": date
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/cancelTripOnlyPilot", canceltripdata, { headers: header });
  }

  AcceptRejectCancellation(tripid, oppositeid, date, acceptreject) {
    let accrejdata = {
      "fkTripId": tripid,
      "Oppositeid": oppositeid,
      "EntryDate": date,
      "acceptReject": acceptreject
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/AcceptRejectCancellation", accrejdata, { headers: header });
  }

  canceltripowner(tripid, date) {
    let cancelownertripdata = {
      "fkTripId": tripid,
      "EntryDate": date
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/cancelTripOnlyOwner", cancelownertripdata, { headers: header });
  }

  AcceptRejectCancellationPilot(tripid, oppositeid, date, acceptreject) {
    let accrejdatapilot = {
      "fkTripId": tripid,
      "Oppositeid": oppositeid,
      "EntryDate": date,
      "acceptReject": acceptreject
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/AcceptRejectCancellationPilot", accrejdatapilot, { headers: header });
  }

  copletetrip(tripid) {
    let completetripdata = {
      "pkTripId": tripid
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/completeTrip", completetripdata, { headers: header });
  }

  updatePosition(pilotid, latlong) {
    let completetripdata = {
      "pkPilotid": pilotid,
      "latlong": latlong
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/updatePosition", completetripdata, { headers: header });
  }

  ForgotPassword(email) {
    let data = {
      "EmailId": email
    }
    let header = new HttpHeaders();
    header.append('Content-Type', 'application/json');
    return this.http.post(this.url + "/VarifyEmail ", data, { headers: header });
  }

  savecurrentuserdata(data) {
    this.currentuserdata = data;
  }
  getcurrentuserdata() {
    return this.currentuserdata;
  }
  setoppositeid(id) {
    this.oppositeid = id;
  }
  getoppositeid() {
    return this.oppositeid;
  }
}

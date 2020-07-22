import { Component,Input } from '@angular/core';
declare var jQuery: any;
declare var $: any;
import { IonicPage, NavController,Content,ModalController, NavParams, Events, App,Platform, ToastController,ActionSheetController, AlertController } from 'ionic-angular';
import {GalleryModal} from 'ionic-gallery-modal';
/**
 * Generated class for the ProfileComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'profile',
  templateUrl: 'profile.html'
})
export class ProfileComponent {
  @Input() profiledata:any;
  text: string;
  cloc:any;
  passport:any;
  airexp:any;
  astrainingyes:any;
  InternationalVisas1: any;
  astrainingno:any;
  uspass:any;
  cprt:any;
  cult:any;
  st:any;
  mstrainingyes : any;
  mstrainingno : any;
  rate: any=0;
  disableonactive: boolean = true;
  iinstructoryes: boolean = false;
  iinstructorno: boolean = false;
  meinstructoryes: boolean = false;
  meinstructorno: boolean = false;
  twinstructoryes: boolean = false;
  twinstructorno: boolean = false;
  ainstructoryes: boolean = false;
  ainstructorno: boolean = false;
  unrestricteduspass:any;
  captureDataUrl1 : any;
  captureDataUrl2:any;
  captureDataUrl3 : any;
  captureDataUrl4:any;
  captureDataUrl5:any;
  captureDataUrl6:any;
  private photos: any[] = [];
  faimages:any[]=[];
  dummyJson = {
    onoff: [
      { description: 'On' },
      { description: 'Off' }
    ],
    yesno: [
      { description: 'Yes' },
      { description: 'No' }
    ],
    mclass: [
      { description: '1' },
      { description: '2' },
      { description: '3' }
    ],
    experience: [
      { description: 'International' },
      { description: 'Domestic' }
    ],
    mtype: [
      { description: 'Owner Operator', id: '1' },
      { description: 'Instructor', id: '2' },
      { description: 'Pilot', id: '3' },
      { description: 'Flight Attendant', id: '4' }
      // { description: 'Second In Command', id: '5' }
    ],
    gendertype: [
      { description: 'Male'},
      { description: 'Female' }
    ],
  }
  constructor(private modalCtrl: ModalController) {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
   


  }
  ngOnInit(){
    this.rate = this.profiledata.ExtraField1;
  }

  ngAfterViewInit() {
    
    var that = this;
    // jQuery("#rateYo").rateYo({
    //   starWidth: "20px",
    //   halfStar: true,
    //   spacing: "13px",
    //   rating: that.profiledata.ExtraField1
    // })

    // jQuery("#rateYo3").rateYo({
    //   starWidth: "20px",
    //   halfStar: true,
    //   spacing: "13px",
    //   rating: that.profiledata.ExtraField1
    // })
    // jQuery("#rateYo2").rateYo({
    //   starWidth: "20px",
    //   halfStar: true,
    //   spacing: "13px",
    //   rating: that.profiledata.ExtraField1
    // })
    // jQuery("#rateYo4").rateYo({
    //   starWidth: "20px",
    //   halfStar: true,
    //   spacing: "13px",
    //   rating: that.profiledata.ExtraField1
    // })

    // setTimeout(() => {
      // if(that.profiledata.CurrentLocation == "true"){
      //   that.cloc = 'On';
      // }
      // else{
      //   that.cloc = 'Off';
      // }

      console.log(this.profiledata);
      if(this.profiledata.FAImage1 != ""){
        this.faimages.push(this.profiledata.FAImage1);
        this.captureDataUrl1 = this.profiledata.FAImage1;
       }
       if(this.profiledata.FAImage2 != ""){
         this.faimages.push(this.profiledata.FAImage2);
         this.captureDataUrl2 = this.profiledata.FAImage2;
       }
       if(this.profiledata.FAImage3 != ""){
         this.faimages.push(this.profiledata.FAImage3);
         this.captureDataUrl3 = this.profiledata.FAImage3;
       }
       if(this.profiledata.FAImage4 != ""){
         this.faimages.push(this.profiledata.FAImage4);
         this.captureDataUrl4 = this.profiledata.FAImage4;
       }
       if(this.profiledata.FAImage5 != ""){
         this.faimages.push(this.profiledata.FAImage5);
         this.captureDataUrl5 = this.profiledata.FAImage5;
       }
       if(this.profiledata.FAImage6 != ""){
        this.faimages.push(this.profiledata.FAImage6);
        this.captureDataUrl6 = this.profiledata.FAImage6;
      }

      this.unrestricteduspass = this.profiledata.CurrentUnrestrictedUSPass;
          if (this.unrestricteduspass == true) {
            this.unrestricteduspass = this.dummyJson.yesno[0].description;
          }
          else {
            this.unrestricteduspass = this.dummyJson.yesno[1].description;
          }
      if (this.profiledata.InstrumentInstructor) {
        this.iinstructoryes = true;
      }
      else {
        this.iinstructorno = true;
      }
      if (this.profiledata.MulEngInstructor) {
        this.meinstructoryes = true;
      }
      else {
        this.meinstructorno = true;
      }
      if (this.profiledata.tailWheelInsrtuctor) {
        this.twinstructoryes = true;
      }
      else {
        this.twinstructorno = true;
      }
      if (this.profiledata.acrobaticsInstructor) {
        this.ainstructoryes = true;
      }
      else {
        this.ainstructorno = true;
      }
        if (that.profiledata.CurrentLocation == "true") {
          that.cloc = "Yes";
        }
        else {
          that.cloc = "No";
        }

      if(that.profiledata.HavePassport == true){
        that.passport = "Yes";
      }
      else{
        that.passport = "No";
      }
      if(that.profiledata.isAircraftSpecificTraining == true){
        that.astrainingyes = true;
      }
      else{
        that.astrainingno = true;
      }
      if(that.profiledata.InternationalVisas == "true"){
        that.InternationalVisas1 = "Yes";
      }
      else{
        that.InternationalVisas1 = "No";
      }
      if(that.profiledata.InternationalExperience == "true"){
         that.airexp = "Yes";
      }
      else{
        that.airexp = "No";
      }
      if(that.profiledata.CurrentUnrestrictedUSPass == "true"){
         that.uspass = "Yes";
      }
      else{
        that.uspass = "No";
      }
      if(that.profiledata.CPRTraining == "true"){
       that.cprt = "Yes";
      }
      else{
        that.cprt = "No";
      }
      if(that.profiledata.CullinaryTraining == "true"){
        that.cult = "Yes";
      }
      else{
        that.cult = "No";
      }
      if(that.profiledata.IsSpecialTrained == true){
        that.st = "Yes";
      }
      else{
       that.st = "No";
      }
      if(that.profiledata.IsReqPrev12MonthTraining == "true"){
        that.mstrainingyes = true;
      }
      else{
       that.mstrainingno = true;
      }
    // }, 200);
    
  }
  getimg(index) {
   if(this["captureDataUrl"+index] != undefined){
     console.log(this["captureDataUrl"+index]);
    index = index - 1;
    this.createphotos();
    let modal = this.modalCtrl.create(GalleryModal, {
      photos: this.photos,
      initialSlide: index
    });
    modal.present();
  }
  }
  
  createphotos() {
    console.log(this.faimages.length);
    if(this.faimages.length != 0){
    for (let i = 0; i < this.faimages.length; i++) {
      this.photos.push({
        url: this.faimages[i],
      });
    }
    console.log(this.photos);
    this.faimages = [];
  }
  else{
  
  }
  }


}

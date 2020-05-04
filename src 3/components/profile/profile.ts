import { Component,Input } from '@angular/core';
declare var jQuery: any;
declare var $: any;
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
  astrainingno:any;
  uspass:any;
  cprt:any;
  cult:any;
  st:any;
  mstrainingyes : any;
  mstrainingno : any;
  disableonactive: boolean = true;
  constructor() {
    console.log('Hello ProfileComponent Component');
    this.text = 'Hello World';
   


  }

  ngAfterViewInit() {
    
    var that = this;
    jQuery("#rateYo").rateYo({
      starWidth: "20px",
      halfStar: true,
      spacing: "13px",
      rating: that.profiledata.ExtraField1
    })

    jQuery("#rateYo3").rateYo({
      starWidth: "20px",
      halfStar: true,
      spacing: "13px",
      rating: that.profiledata.ExtraField1
    })
    jQuery("#rateYo2").rateYo({
      starWidth: "20px",
      halfStar: true,
      spacing: "13px",
      rating: that.profiledata.ExtraField1
    })
    jQuery("#rateYo4").rateYo({
      starWidth: "20px",
      halfStar: true,
      spacing: "13px",
      rating: that.profiledata.ExtraField1
    })

    setTimeout(() => {
      if(that.profiledata.CurrentLocation == "true"){
        that.cloc = 'On';
      }
      else{
        that.cloc = 'Off';
      }

      if(that.profiledata.HavePassport == "true"){
        that.passport = "Yes";
      }
      else{
        that.passport = "No";
      }
      if(that.profiledata.isAircraftSpecificTraining == "true"){
        that.astrainingyes = true;
      }
      else{
        that.astrainingno = true;
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
      if(that.profiledata.IsSpecialTrained == "true"){
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
    }, 100);
    
  }


}

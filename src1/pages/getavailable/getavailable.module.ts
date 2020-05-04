import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetavailablePage } from './getavailable';
//import { NgCalendarModule } from 'ionic2-calendar';
//import { CalendarModule } from 'ion2-calendar';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    GetavailablePage,
  ],
  imports: [
    IonicPageModule.forChild(GetavailablePage),
    //NgCalendarModule,
    //CalendarModule,
    StarRatingModule,
  ],
})
export class GetavailablePageModule { }

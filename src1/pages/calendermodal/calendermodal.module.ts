import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalendermodalPage } from './calendermodal';
//import { DatePickerModule } from 'ionic-calendar-date-picker';

@NgModule({
  declarations: [
    CalendermodalPage,
  ],
  imports: [
    IonicPageModule.forChild(CalendermodalPage),
    //DatePickerModule
  ],
})
export class CalendermodalPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Calendarmodal1Page } from './calendarmodal1';
import { DatePickerModule } from 'ionic-calendar-date-picker';

@NgModule({
  declarations: [
    Calendarmodal1Page,
  ],
  imports: [
    IonicPageModule.forChild(Calendarmodal1Page),
    DatePickerModule
  ],
})
export class Calendarmodal1PageModule {}

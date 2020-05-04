import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TripsummaryPage } from './tripsummary';

@NgModule({
  declarations: [
    TripsummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(TripsummaryPage),
  ],
})
export class TripsummaryPageModule {}

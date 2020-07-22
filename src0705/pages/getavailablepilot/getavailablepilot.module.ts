import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GetavailablepilotPage } from './getavailablepilot';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    GetavailablepilotPage,
  ],
  imports: [
    IonicPageModule.forChild(GetavailablepilotPage),
    StarRatingModule
  ],
})
export class GetavailablepilotPageModule { }

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterflightattendantPage } from './filterflightattendant';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    FilterflightattendantPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterflightattendantPage),
    StarRatingModule
  ],
})
export class FilterflightattendantPageModule {}

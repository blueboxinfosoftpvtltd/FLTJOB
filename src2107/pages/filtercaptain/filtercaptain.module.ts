import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltercaptainPage } from './filtercaptain';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    FiltercaptainPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltercaptainPage),
    StarRatingModule
  ],
})
export class FiltercaptainPageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterflightinstructorPage } from './filterflightinstructor';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    FilterflightinstructorPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterflightinstructorPage),
    StarRatingModule
  ],
})
export class FilterflightinstructorPageModule {}

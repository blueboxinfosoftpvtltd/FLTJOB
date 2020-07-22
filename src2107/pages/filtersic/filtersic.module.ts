import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FiltersicPage } from './filtersic';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    FiltersicPage,
  ],
  imports: [
    IonicPageModule.forChild(FiltersicPage),
    StarRatingModule
  ],
})
export class FiltersicPageModule {}

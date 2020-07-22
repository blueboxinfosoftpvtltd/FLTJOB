import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavuserPage } from './favuser';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    FavuserPage,
  ],
  imports: [
    IonicPageModule.forChild(FavuserPage),
    StarRatingModule
  ],
})
export class FavuserPageModule {}

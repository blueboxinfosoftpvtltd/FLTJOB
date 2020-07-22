import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserrattingPage } from './userratting';
import { StarRatingModule } from 'ionic3-star-rating';
// import { StarRatingModule } from 'ionic3-star-rating';
// import { IonicRatingModule } from 'ionic-rating';
// import { Ionic2RatingModule } from 'ionic2-rating';



@NgModule({
  declarations: [
    UserrattingPage,
  ],
  imports: [
    // StarRatingModule,
    // IonicRatingModule ,
    // Ionic2RatingModule,
    StarRatingModule,
    IonicPageModule.forChild(UserrattingPage),
  ],
})
export class UserrattingPageModule {}

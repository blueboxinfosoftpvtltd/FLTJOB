import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { TextMaskModule } from 'angular2-text-mask';
import { StarRatingModule } from 'ionic3-star-rating';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TextMaskModule,
    StarRatingModule
  ],
})
export class ProfilePageModule {}

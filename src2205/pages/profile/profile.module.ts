import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { TextMaskModule } from 'angular2-text-mask';
import { StarRatingModule } from 'ionic3-star-rating';
import * as ionicGalleryModal from 'ionic-gallery-modal';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
//import { IonicImageViewerModule } from 'ionic-img-viewer';
@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    TextMaskModule,
    StarRatingModule,
    ionicGalleryModal.GalleryModalModule
   // IonicImageViewerModule
  ],
  // providers: [
  //   {
  //     provide: HAMMER_GESTURE_CONFIG,
  //     useClass: ionicGalleryModal.GalleryModalHammerConfig,
  //   },
  
  // ],
})
export class ProfilePageModule {}

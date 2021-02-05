import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestProfilePage } from './request-profile';

@NgModule({
  declarations: [
    RequestProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestProfilePage),
  ],
})
export class RequestProfilePageModule {}

import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CountryselectPage } from './countryselect';

@NgModule({
  declarations: [
    CountryselectPage,
  ],
  imports: [
    IonicPageModule.forChild(CountryselectPage),
  ],
})
export class CountryselectPageModule {}

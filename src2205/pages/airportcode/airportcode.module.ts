import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AirportcodePage } from './airportcode';

@NgModule({
  declarations: [
    AirportcodePage,
  ],
  imports: [
    IonicPageModule.forChild(AirportcodePage),
  ],
})
export class AirportcodePageModule {}

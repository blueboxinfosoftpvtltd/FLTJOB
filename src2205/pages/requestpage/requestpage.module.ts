import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RequestpagePage } from './requestpage';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    RequestpagePage,
  ],
  imports: [
    IonicPageModule.forChild(RequestpagePage),
    ComponentsModule
  ],
})
export class RequestpagePageModule {}

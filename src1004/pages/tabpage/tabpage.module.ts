import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabpagePage } from './tabpage';
import { ComponentsModule } from '../../components/components.module';
@NgModule({
  declarations: [
    TabpagePage,
  ],
  imports: [
    IonicPageModule.forChild(TabpagePage),
    ComponentsModule
  ],
})
export class TabpagePageModule { }

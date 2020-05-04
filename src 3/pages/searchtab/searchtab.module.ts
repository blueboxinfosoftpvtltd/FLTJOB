import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchtabPage } from './searchtab';

@NgModule({
  declarations: [
    SearchtabPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchtabPage),
  ],
})
export class SearchtabPageModule {}

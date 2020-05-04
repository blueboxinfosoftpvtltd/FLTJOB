import { NgModule } from '@angular/core';
import { CurrentComponent } from './current/current';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FutureComponent } from './future/future';
import { HistoryComponent } from './history/history';
import { PendingComponent } from './pending/pending';
import { SearchComponent } from './search/search';
import { ProfileComponent } from './profile/profile';
@NgModule({
	declarations: [CurrentComponent,
    FutureComponent,
    HistoryComponent,
    PendingComponent,
    SearchComponent,
    ProfileComponent],
	imports: [IonicModule],
	exports: [CurrentComponent,
    FutureComponent,
    HistoryComponent,
    PendingComponent,
    SearchComponent,
    ProfileComponent]
})
export class ComponentsModule { }

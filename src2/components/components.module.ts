import { NgModule } from '@angular/core';
import { CurrentComponent } from './current/current';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FutureComponent } from './future/future';
import { HistoryComponent } from './history/history';
import { PendingComponent } from './pending/pending';
import { SearchComponent } from './search/search';
@NgModule({
	declarations: [CurrentComponent,
    FutureComponent,
    HistoryComponent,
    PendingComponent,
    SearchComponent],
	imports: [IonicModule],
	exports: [CurrentComponent,
    FutureComponent,
    HistoryComponent,
    PendingComponent,
    SearchComponent]
})
export class ComponentsModule { }

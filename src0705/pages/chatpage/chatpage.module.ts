import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChatpagePage } from './chatpage';
//import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
@NgModule({
  declarations: [
    ChatpagePage,
  ],
  imports: [
    IonicPageModule.forChild(ChatpagePage),
    //NgxEmojiPickerModule,
  ],
})
export class ChatpagePageModule { }

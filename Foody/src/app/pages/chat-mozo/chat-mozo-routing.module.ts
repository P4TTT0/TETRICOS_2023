import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatMozoPage } from './chat-mozo.page';

const routes: Routes = [
  {
    path: '',
    component: ChatMozoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatMozoPageRoutingModule {}

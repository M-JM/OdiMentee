import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadChildren: () => import('../tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'studentlist',
        loadChildren: () => import('../pages/studentlist/studentlist.module').then(m => m.StudentlistPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'chats',
        loadChildren: () => import('../pages/chatlist/chatlist.module').then(m => m.ChatlistPageModule)
      },
      {
        path: 'inbox',
        loadChildren: () => import('../pages/inbox/inbox.module').then(m => m.InboxPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/studentlist',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}

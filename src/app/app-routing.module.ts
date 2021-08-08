import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo} from '@angular/fire/auth-guard';
import { AuthGuard } from './guards/auth.guard';
import { IntroGuard } from './guards/intro.guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['register']);
const redirectLoggedInUserTo = () => redirectLoggedInTo(['loggedIn']);


const routes: Routes = [
  {path:'',redirectTo:'login', pathMatch:'full'},
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard],
    data: {
      role: 'USER'
    },
    canLoad: [IntroGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then( m => m.IntroPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'inbox',
    loadChildren: () => import('./pages/inbox/inbox.module').then( m => m.InboxPageModule)
  },
  // {
  //   path: 'studentlist',
  //   loadChildren: () => import('./pages/studentlist/studentlist.module').then( m => m.StudentlistPageModule)
  // },
  {
    path: ':student-detail/:id',
    loadChildren: () => import('./pages/student-detail/student-detail.module').then( m => m.StudentDetailPageModule)
  },
  {
    path: 'invitation-modal',
    loadChildren: () => import('./pages/invitation-modal/invitation-modal.module').then( m => m.InvitationModalPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./pages/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'chatlist',
    loadChildren: () => import('./pages/chatlist/chatlist.module').then( m => m.ChatlistPageModule)
  },
  {
    path: 'invitation-reply-modal',
    loadChildren: () => import('./pages/invitation-reply-modal/invitation-reply-modal.module').then( m => m.InvitationReplyModalPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

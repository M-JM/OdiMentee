import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StudentlistPage } from './studentlist.page';

const routes: Routes = [
  {
    path: '',
    component: StudentlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StudentlistPageRoutingModule {}

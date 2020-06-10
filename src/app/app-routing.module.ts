import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainAdminComponent} from "./administration/components/main-admin/main-admin.component";


const routes: Routes = [

  {path: '/administration', loadChildren: [
      {path: '', component: MainAdminComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

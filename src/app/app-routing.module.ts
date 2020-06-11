import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainAdminComponent} from './administration/components/main-admin/main-admin.component';
import {MainWebComponent} from './website/components/main-web/main-web.component';


const routes: Routes = [
  /*Роутеры для сайта*/
  {path: '', component: MainWebComponent},
  /*Роутеры для Администрирования сайта*/
  {path: 'administration', children: [
      {path: '', redirectTo: 'orders/orders', pathMatch: 'full'},
      {path: 'orders', redirectTo: 'orders/orders', pathMatch: 'full'},
      {path: 'orders/orders', component: MainAdminComponent},
      {path: 'category', redirectTo: 'category/category', pathMatch: 'full'},
      {path: 'category/category', component: MainAdminComponent},
      {path: 'category/subcategory', component: MainAdminComponent},
      {path: 'goods', redirectTo: 'goods/goods', pathMatch: 'full'},
      {path: 'goods/goods', component: MainAdminComponent},
      {path: 'clients', redirectTo: 'clients/clients', pathMatch: 'full'},
      {path: 'clients/clients', component: MainAdminComponent},
      {path: 'setting', redirectTo: 'setting/setting', pathMatch: 'full'},
      {path: 'setting/setting', component: MainAdminComponent},
      {path: 'setting/administrators', component: MainAdminComponent},
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

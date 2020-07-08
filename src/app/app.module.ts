import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { TransferHttpCacheModule } from '@nguniversal/common'; // HERE
import { QuillModule } from 'ngx-quill';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeadAdminComponent } from './administration/components/head-admin/head-admin.component';
import { MainAdminComponent } from './administration/components/main-admin/main-admin.component';
import { FooterAdminComponent } from './administration/components/footer-admin/footer-admin.component';
import { NavigationAdminComponent } from './administration/components/navigation-admin/navigation-admin.component';
import { PageAdminComponent } from './administration/components/page-admin/page-admin.component';
import { CountstrAdminComponent } from './administration/components/countstr-admin/countstr-admin.component';
import { TabsAdminComponent } from './administration/components/tabs-admin/tabs-admin.component';
import { ButtonsAdminComponent } from './administration/components/buttons-admin/buttons-admin.component';
import { AuthorizationAdminComponent } from './administration/components/authorization-admin/authorization-admin.component';
import { AuthenticationAdminComponent } from './administration/components/authentication-admin/authentication-admin.component';
import { HeadWebComponent } from './website/components/head-web/head-web.component';
import { NavigationWebComponent } from './website/components/navigation-web/navigation-web.component';
import { MainWebComponent } from './website/components/main-web/main-web.component';
import { TableWebComponent } from './website/components/table-web/table-web.component';
import { FooterWebComponent } from './website/components/footer-web/footer-web.component';
import { CabinetWebComponent } from './website/components/cabinet-web/cabinet-web.component';
import { TableAdminComponent } from './administration/components/table-admin/table-admin.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ModalAdminComponent } from './administration/components/modal-admin/modal-admin.component';
import { TranslitDirective } from './administration/directeves/translit.directive';



@NgModule({
  declarations: [
    AppComponent,
    HeadAdminComponent,
    MainAdminComponent,
    FooterAdminComponent,
    NavigationAdminComponent,
    PageAdminComponent,
    CountstrAdminComponent,
    TabsAdminComponent,
    ButtonsAdminComponent,
    AuthorizationAdminComponent,
    AuthenticationAdminComponent,
    HeadWebComponent,
    NavigationWebComponent,
    MainWebComponent,
    TableWebComponent,
    FooterWebComponent,
    CabinetWebComponent,
    TableAdminComponent,
    ModalAdminComponent,
    TranslitDirective
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule, // AND HERE
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  exports: [
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

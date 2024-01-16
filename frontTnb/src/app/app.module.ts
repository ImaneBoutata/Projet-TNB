
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { TerrainComponent } from './terrain/terrain.component';
import { TaxeTnbComponent } from './taxe-tnb/taxe-tnb.component';
import { TaxeTnbListComponent } from './taxe-tnb-list/taxe-tnb-list.component';
import { RedevableComponent } from './redevable/redevable.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import { TerrainSpecialComponent } from './terrain-special/terrain-special.component';
import { TaxeSpecialComponent } from './taxe-special/taxe-special.component';
import {SearchComponent} from "./search/search.component";


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    TerrainComponent,
    TaxeTnbComponent,
    TaxeTnbListComponent,
    RedevableComponent,
    TerrainSpecialComponent,
    TaxeSpecialComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule

  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

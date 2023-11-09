import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MapComponent } from './components/map/map.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AddShelterComponent } from './pages/add-shelter/add-shelter.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AddAuthTokenInterceptor } from './services/add-auth-token-interceptor.service';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    HomeComponent,
    NavbarComponent,
    AddShelterComponent,
    LoadingComponent,
    UnauthorizedComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    LeafletModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddAuthTokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

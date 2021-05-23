import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';
import { MapComponent } from 'src/app/pages/map/map.component';

import { FormsModule } from '@angular/forms';
import { ComponentsModule } from './components/components.module';
import { AboutComponent } from './pages/about/about.component';
import { ResourcesComponent } from './pages/resources/resources.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MapComponent,
    AboutComponent,
    ResourcesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeatMapComponent } from '../heat-map/heat-map.component';
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HeatMapComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

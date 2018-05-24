import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './components/app/app.component';
import { PlotlyModule } from '@n-fuse/ng-plotly';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PlotlyModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

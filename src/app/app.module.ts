import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule,
 MatCheckboxModule,
 MatCardModule,
MatToolbarModule,MatIconModule} from '@angular/material';
import { CardComponent } from './card/card.component';
import { DataServiceService } from './data-service.service';

@NgModule({
  imports:      [ BrowserModule, 
  FormsModule,
  BrowserAnimationsModule,
  MatToolbarModule,
  MatCardModule,
  MatProgressBarModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule ],
  declarations: [ AppComponent, HelloComponent, CardComponent ],
  bootstrap:    [ AppComponent ],
  providers: [DataServiceService]
})
export class AppModule { }

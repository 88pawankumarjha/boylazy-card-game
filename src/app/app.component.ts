import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  firstLoad=true;
  showOtherCard=false;
  toggleCard(){
    this.firstLoad=!this.firstLoad;this.showOtherCard=false;
  }
  toggleOtherCard(){
    this.showOtherCard=!this.showOtherCard;
  }
}

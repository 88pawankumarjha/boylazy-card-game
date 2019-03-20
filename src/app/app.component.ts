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
  myCard;
  otherCard;
  constructor(private dataServiceService: DataServiceService){
  }
  showCard(){
    this.firstLoad=false;
    this.showOtherCard=false;
  }
  hideCard(){
    this.firstLoad=true;
    this.showOtherCard=false;
  }

  toggleOtherCard(index){
    
    this.showOtherCard=true;
    setTimeout(() => {
        if(this.dataServiceService.myCard[index].split(":")[0] != "Rank") {
          if(+this.dataServiceService.myCard[index].split(":")[1] >= +this.dataServiceService.otherCard[index].split(":")[1]) {
            alert(this.dataServiceService.myCard[index].split(":")[0]+ " " + this.dataServiceService.myCard[index].split(":")[1]+ " WIN " + this.dataServiceService.otherCard[index].split(":")[1]);
          }else{
            alert(this.dataServiceService.myCard[index].split(":")[0]+ " " + this.dataServiceService.myCard[index].split(":")[1]+ " LOST " + this.dataServiceService.otherCard[index].split(":")[1])
          }
        } else{
          if(+this.dataServiceService.myCard[index].split(":")[1] >= +this.dataServiceService.otherCard[index].split(":")[1]) {
            alert(this.dataServiceService.myCard[index].split(":")[0]+ " " + this.dataServiceService.myCard[index].split(":")[1]+ " LOST " + this.dataServiceService.otherCard[index].split(":")[1]);
          }else{
            alert(this.dataServiceService.myCard[index].split(":")[0]+ " " + this.dataServiceService.myCard[index].split(":")[1]+ " WIN " + this.dataServiceService.otherCard[index].split(":")[1])
          }
        }
        
    }, 1000);
    setTimeout(() => {
      this.hideCard();
    }, 2000);

  }
}

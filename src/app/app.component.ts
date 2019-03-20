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
    this.myCard = this.dataServiceService.myCard;
    this.otherCard = this.dataServiceService.otherCard;
  }
  toggleCard(){
    this.firstLoad=!this.firstLoad;
    this.showOtherCard=false;
  }

  toggleOtherCard(index){
    
    this.showOtherCard=true;
setTimeout(() => {
    if(this.myCard[index].split(":")[0] != "Rank") {
    if(this.myCard[index].split(":")[1] > this.otherCard[index].split(":")[1]) {
      alert(this.myCard[index].split(":")[1]+ " WIN " + this.otherCard[index].split(":")[1]);
    }else{
      alert(this.myCard[index].split(":")[1]+ " LOST " + this.otherCard[index].split(":")[1])
    }

    } else{
      if(this.myCard[index].split(":")[1] > this.otherCard[index].split(":")[1]) {
      alert(this.myCard[index].split(":")[1]+ " LOST " + this.otherCard[index].split(":")[1]);
    }else{
      alert(this.myCard[index].split(":")[1]+ " WIN " + this.otherCard[index].split(":")[1])
    }
    }
    
    }, 1000);
    setTimeout(() => {
      this.toggleCard();
    }, 2000);

    

  }
}

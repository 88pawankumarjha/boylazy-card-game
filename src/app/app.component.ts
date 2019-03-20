import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  
  theResult;
  resultMessage;
  firstLoad=true;
  showOtherCard=false;
  myCard;
  otherCard;
  constructor(private dataServiceService: DataServiceService, private toastr: ToastrService){
  }

  showSuccess() {
    this.toastr.success(this.resultMessage, 'You\'re the winner!!',
    {timeOut: 2000, positionClass: 'toast-center-center' });
  }
  showError() {
    this.toastr.error(this.resultMessage, 'You lose.', {
    timeOut: 2000, positionClass: 'toast-center-center' })
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
    
    const myCardLabel = this.dataServiceService.myCard[index].split(":")[0];
    const myCardValue = this.dataServiceService.myCard[index].split(":")[1];
    const otherCardValue = this.dataServiceService.otherCard[index].split(":")[1];

    this.showOtherCard=true;
    setTimeout(() => {
        if(myCardLabel != "Rank") {
          +myCardValue >= +otherCardValue?
            this.announceResult(1, myCardLabel, myCardValue, otherCardValue):
            this.announceResult(2, myCardLabel, myCardValue, otherCardValue)
        } else{
          +myCardValue >= +otherCardValue?
            this.announceResult(2, myCardLabel, myCardValue, otherCardValue):
            this.announceResult(1, myCardLabel, myCardValue, otherCardValue)
        }
    }, 1000);

    setTimeout(() => {
      this.hideCard();
    }, 2000);

  }
  
  announceResult(number, label, v1, v2){
    if(number==1){
      this.theResult=0;
      this.resultMessage = label+ " " + v1+ " WIN " + label+ " " +v2;
      this.showSuccess();
    }else{
      this.theResult=1
      this.resultMessage = label+ " " + v1+ " LOST " + label+ " " + v2;
      this.showError();
    }
  }
}

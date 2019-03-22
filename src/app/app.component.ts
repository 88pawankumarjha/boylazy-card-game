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
  myScore=0;
  otherScore=0;
  resultMessage;
  firstLoad=true;
  showOtherCard=false;
  myCard;
  otherCard;
  constructor(private dataServiceService: DataServiceService, private toastr: ToastrService){
    
  }

  showSuccess() {
    this.myScore++;
    this.toastr.success(this.resultMessage, 'You\'re the winner!!',
    {timeOut: 2000, positionClass: 'toast-center-center' });
    this.checkResult();
  }
  showError() {
    this.otherScore++;
    this.toastr.error(this.resultMessage, 'You lose.', {
    timeOut: 2000, positionClass: 'toast-center-center' });
    this.checkResult();
  }
  checkResult(){
    if(this.myScore + this.otherScore == this.dataServiceService.half_length){
      if(this.myScore >= this.otherScore){
        this.toastr.success(this.myScore +' out of '+this.dataServiceService.half_length + ' fights won.','You have won the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: 10000, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.refreshApp());
        return;
        }else{
          alert("done4");
          this.toastr.error(this.myScore +' out of '+this.dataServiceService.half_length + ' fights lost.','You have lost the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: 10000, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.refreshApp());
        return;
        }
      }
  }
  showCard(){
    this.checkResult();

    this.firstLoad=false;
    this.showOtherCard=false;
  }
  hideCard(){
    this.firstLoad=true;
    this.showOtherCard=false;
  }

  toggleOtherCard(index){
    let myCardLabel = "";
    switch (index) {
    case 1:
        myCardLabel="Rank"
        break;
    case 2:
        myCardLabel="Height"
        break;
    case 3:
        myCardLabel="Weight"
        break;
    case 4:
        myCardLabel="WinPercentage"
        break;
    default:
        myCardLabel="Rank"
        break;
    }
    const myStr = "this.dataServiceService.myArrCards[0]."+myCardLabel;
    const otherStr = "this.dataServiceService.otherArrCards[0]."+myCardLabel;
    const myCardValue = eval(myStr);
    const otherCardValue = eval(otherStr);

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
    }, 200);

    setTimeout(() => {
      this.hideCard();
    }, 2000);

  }
  
  announceResult(number, label, v1, v2){
    if(number==1){
      this.theResult=0;
      this.resultMessage = "Your "+label+ " is better.";
      this.showSuccess();
    }else{
      this.theResult=1
      this.resultMessage = "Your "+label+ " was not good enough.";
      this.showError();
    }
  }

  refreshApp(){
    location.reload();
  }
}

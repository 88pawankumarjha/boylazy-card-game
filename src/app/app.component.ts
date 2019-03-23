import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {

  theResult;
  showOverlay=false;
  myScore=0;
  otherScore=0;
  resultMessage;
  firstLoad=true;
  showOtherCard=false;
  myCard;
  otherCard;
  dataServiceService;
  constructor(private dataServiceServiceInstance: DataServiceService, private toastr: ToastrService){
    this.dataServiceService = dataServiceServiceInstance;
  }

  resetApp(){
    this.theResult=-1;
    this.showOverlay=false;
    this.myScore=0;
    this.otherScore=0;
    this.resultMessage="";
    this.firstLoad=true;
    this.showOtherCard=false;
    this.myCard;
    this.otherCard;
    this.dataServiceService.initApp();
  }

  showSuccess() {
    this.myScore++;
    this.toastr.success(this.resultMessage, 'You\'re the winner!!',
    {timeOut: 2000, positionClass: 'toast-bottom-center' });
    
    setTimeout(() => {
      this.checkResult()
    }, 2000);
  }
  showError() {
    this.otherScore++;
    this.toastr.error(this.resultMessage, 'You lose.', {
    timeOut: 2000, positionClass: 'toast-bottom-center' });
    
    setTimeout(() => {
      this.checkResult()
    }, 2000);
  }
  checkResult(){
    if(this.myScore + this.otherScore == this.dataServiceService.half_length){
      if(this.myScore >= this.otherScore){
        this.toastr.info(this.myScore +' out of '+this.dataServiceService.half_length + ' fights won.','You have won the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: 10000, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.resetApp());
        return true;
        }else{
          this.toastr.warning(this.myScore +' out of '+this.dataServiceService.half_length + ' fights lost.','You have lost the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: 10000, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.resetApp());
        return true;
        }
      }
  }
  showCard(){
    if(!this.checkResult()){
      this.firstLoad=false;
      this.showOtherCard=false;
    }
  }
  hideCard(){
    this.firstLoad=true;
    this.showOtherCard=false;
  }

  stopDoubleClick(){
    this.showOverlay = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, 2000);
  }

  toggleOtherCard(index){
    // stop double click
    this.stopDoubleClick();
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
        myCardLabel="WinPercent"
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

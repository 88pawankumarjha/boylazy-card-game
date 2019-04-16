import { Component } from '@angular/core';
import { DataServiceService } from './data-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'sg-my-app',
  styleUrls: [ './app.component.css' ],
  templateUrl: './app.component.html',
})
export class AppComponent  {

  private static minusOne = -1;
  private static zero = 0;
  private static one = 1;
  private static two = 2;
  private static three = 3;
  private static four = 4;
  private static twoH = 200;
  private static twoK = 2000;
  private static tenK = 10000;
  private theResult: number= AppComponent.minusOne;
  private showOverlay: boolean=false;
  private myScore: number=AppComponent.zero;
  private otherScore: number=AppComponent.zero;
  private resultMessage: string="";
  private firstLoad: boolean=true;
  private showOtherCard: boolean=false;
  private dataServiceService: DataServiceService;
  constructor(private dataServiceServiceInstance: DataServiceService, private toastr: ToastrService){
    this.dataServiceService = dataServiceServiceInstance;
  }

  private resetApp(): void{
    this.theResult=AppComponent.minusOne;
    this.showOverlay=false;
    this.myScore=AppComponent.zero;
    this.otherScore=AppComponent.zero;
    this.resultMessage="";
    this.firstLoad=true;
    this.showOtherCard=false;
    this.dataServiceService.initApp();
  }

  private showSuccess(): void{
    this.myScore++;
    this.toastr.success(this.resultMessage, 'You\'re the winner!!',
    {positionClass: 'toast-bottom-center', timeOut: AppComponent.twoK });
    
    setTimeout(() => {
      this.checkResult()
    }, AppComponent.twoK);
  }
  private showError(): void{
    this.otherScore++;
    this.toastr.error(this.resultMessage, 'You lose.', {
    positionClass: 'toast-bottom-center', timeOut: AppComponent.twoK });
    
    setTimeout(() => {
      this.checkResult()
    }, AppComponent.twoK);
  }
  private checkResult(): boolean{
    if(this.myScore + this.otherScore == this.dataServiceService.half_length){
      if(this.myScore >= this.otherScore){
        this.toastr.info(this.myScore +' out of '+this.dataServiceService.half_length + ' fights won.',
        'You have won the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: AppComponent.tenK, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.resetApp());
        return true;
        }else{
          this.toastr.warning(this.myScore +' out of '+this.dataServiceService.half_length + ' fights lost.',
          'You have lost the battle!! CLICK HERE to restart the battle.',
    {closeButton: true, timeOut: AppComponent.tenK, positionClass: 'toast-center-center' }).onTap
    .subscribe(() => this.resetApp());
        return true;
        }
      }
  }
  private showCard(): void{
    if(!this.checkResult()){
      this.firstLoad=false;
      this.showOtherCard=false;
    }
  }
  private hideCard(): void{
    this.firstLoad=true;
    this.showOtherCard=false;
  }

  private stopDoubleClick(): void{
    this.showOverlay = true;
    setTimeout(() => {
      this.showOverlay = false;
    }, AppComponent.twoK);
  }

  private toggleOtherCard(index): void{
    // stop double click
    this.stopDoubleClick();
    let myCardLabel = "";
    switch (index) {
    case AppComponent.one:
        myCardLabel="Rank"
        break;
    case AppComponent.two:
        myCardLabel="Height"
        break;
    case AppComponent.three:
        myCardLabel="Weight"
        break;
    case AppComponent.four:
        myCardLabel="WinPercent"
        break;
    default:
        myCardLabel="Rank"
        break;
    }
    const myStr = "this.dataServiceService.myArrCards[AppComponent.zero]."+myCardLabel;
    const otherStr = "this.dataServiceService.otherArrCards[AppComponent.zero]."+myCardLabel;
    const myCardValue = eval(myStr);
    const otherCardValue = eval(otherStr);

    this.showOtherCard=true;
    setTimeout(() => {
        if(myCardLabel != "Rank") {
          +myCardValue >= +otherCardValue?
            this.announceResult(1, myCardLabel):
            this.announceResult(2, myCardLabel)
        } else{
          +myCardValue >= +otherCardValue?
            this.announceResult(2, myCardLabel):
            this.announceResult(1, myCardLabel)
        }
    }, AppComponent.twoH);

    setTimeout(() => {
      this.hideCard();
    }, AppComponent.twoK);

  }
  
  private announceResult(number, label): void{
    if(number==1){
      this.theResult=AppComponent.zero;
      this.resultMessage = "Your "+label+ " is better.";
      this.showSuccess();
    }else{
      this.theResult=1
      this.resultMessage = "Your "+label+ " was not good enough.";
      this.showError();
    }
  }
}

import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class DataServiceService {

  private zero:number = 0;
  private selCardField:number = 0;
  private myCard:String[] = ['Name:RomanReigns', 'Rank:1', 'Height:6.3', 'Weight:250', 'Fights Won:235'];
  private otherCard:String[] = ['Name:SamoaJoe', 'Rank:2', 'Height:6.3', 'Weight:350', 'Fights Won:95'];
  private arrCards:String[];
  private myCard1:String[];
  private otherCard1:String[];
  private myArrCards:String[];
  private otherArrCards:String[];
  private half_length = 0;

  constructor(private httpService: HttpClient) {
    this.initApp();
  }
  private initApp() {
    this.httpService.get('./assets/cards.json').subscribe(
      data => {
        this.arrCards = data as string[];
        this.shuffleAndDistributeCards();
      },
      (err: HttpErrorResponse) => {
        console.log(err.message);
      },
    )
  }
  private setSelCardField(index:number) {
    this.selCardField = index;
    setTimeout(() => {
      this.selCardField = 0;
      this.myArrCards.splice(0, 1);
      this.otherArrCards.splice(0, 1);
    }, 2000);
  }
  private getSelCardField() {
    return this.selCardField;
  }

  private fetchMyCard() {
    if (undefined != this.myArrCards && this.myArrCards.length != this.zero)
      return this.myArrCards[this.zero].URL;
    else
      return "#";
  }
  private fetchOtherCard() {
    if (undefined != this.otherArrCards && this.otherArrCards.length != this.zero)
      return this.otherArrCards[this.zero].URL;
    else
      return
      "https://bit.ly/2U5IUkj"
  }

  private getMyCard() {
    return this.myCard1;
  }
  private getOtherCard() {
    return this.otherCard1;
  }

  private shuffleAndDistributeCards() {
    this.myArrCards = this.shuffle(this.arrCards);
    this.half_length = Math.ceil(this.myArrCards.length / 2);
    this.otherArrCards = this.myArrCards.splice(this.zero, this.half_length);
  }

  private shuffle(array:Array<number>) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (this.zero !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  private openURL(stringURL:string) {
    window.open(stringURL, "_blank");
  }


}
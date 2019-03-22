import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  
  selCardField =0;
  myCard = ['Name:RomanReigns', 'Rank:1', 'Height:6.3', 'Weight:250', 'Fights Won:235'];
  otherCard = ['Name:SamoaJoe', 'Rank:2', 'Height:6.3', 'Weight:350', 'Fights Won:95'];
  arrCards: string [];
  myCard1;
  otherCard1;
  myArrCards;
  otherArrCards;
  half_length:0;
  constructor (private httpService: HttpClient) { 
    this.httpService.get('./assets/cards.json').subscribe(
      data => {
        this.arrCards = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  alert(this.arrCards[1].Name);
        // this.myCard1 = this.arrCards[0];
        // this.otherCard1 = this.arrCards[1];
        this.shuffleAndDistributeCards();
      },
      (err: HttpErrorResponse) => {
        console.log (err.message);
      }
    )
  }
  setSelCardField(index){
    this.selCardField = index;
    setTimeout(() => {
      this.selCardField = 0;
      this.myArrCards.splice(0,1);
      this.otherArrCards.splice(0,1);
    }, 2000);
  }
  getSelCardField(){
    return this.selCardField;
  }
  
  fetchMyCard(){
    if(undefined != this.myArrCards &&this.myArrCards.length != 0 )
    return this.myArrCards[0].URL;
    else 
    return "https://shop.wwe.com/on/demandware.static/-/Sites-wwe-us-navigation/default/dwb8d1545f/images/superstar-thumb-300/RomanReignsNEW.jpg";
  
  }
  fetchOtherCard(){
    if(undefined != this.otherArrCards &&this.otherArrCards.length != 0)
    return this.otherArrCards[0].URL;
    else 
    return "https://shop.wwe.com/on/demandware.static/-/Sites-wwe-us-navigation/default/dwb8d1545f/images/superstar-thumb-300/RomanReignsNEW.jpg"
  }
  
  getMyCard(){
    return this.myCard1;
  }
  getOtherCard(){
    return this.otherCard1;
  }

  shuffleAndDistributeCards(){
    this.myArrCards = this.shuffle(this.arrCards);
    this.half_length = Math.ceil(this.myArrCards.length / 2);    
    this.otherArrCards = this.myArrCards.splice(0,this.half_length);
  }

shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;  
  while (0 !== currentIndex) {
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


}
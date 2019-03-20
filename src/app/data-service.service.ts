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
  constructor (private httpService: HttpClient) { 
    this.httpService.get('./assets/cards.json').subscribe(
      data => {
        this.arrCards = data as string [];	 // FILL THE ARRAY WITH DATA.
        //  alert(this.arrCards[1].Name);
        this.myCard1 = this.arrCards[0];
        this.otherCard1 = this.arrCards[1];

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
    }, 2000);
  }
  getSelCardField(){
    return this.selCardField;
  }
  ngOnInit () {
  }
  fetchMyCard(){
    this.myCard1 = this.arrCards[0];
  }
  fetchOtherCard(){
    this.otherCard1 = this.arrCards[1];
  }
  
  getMyCard(){
    return this.myCard1;
  }
  getOtherCard(){
    return this.otherCard1;
  }

}
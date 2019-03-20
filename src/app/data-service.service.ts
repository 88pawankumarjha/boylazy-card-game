import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  
  myCard = ['Name:RomanReigns', 'Rank:1', 'Height:6.3', 'Wight:250', 'Fights Won:235'];
  otherCard = ['Name:SamoaJoe', 'Rank:2', 'Height:6.1', 'Wight:350', 'Fights Won:95'];
  
  constructor() { }

}
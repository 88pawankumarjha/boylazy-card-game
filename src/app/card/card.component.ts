import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { AppComponent } from '../app.component'

@Component({
  selector: 'sg-app-card',
  styleUrls: ['./card.component.css'],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() cardNumber: string;
  @Input() card: string [];

  constructor(public dataServiceService: DataServiceService, public appComponent: AppComponent){
  }
  private getKeys(map): Array<any>{
      return Array.from(map.keys());
  }
  ngOnInit() {
  }
  private heightConverter(n): string{
      var realFeet = ((n*0.393700) / 12);
      var feet = Math.floor(realFeet);
      var inches = Math.round((realFeet - feet) * 12);
      return feet + "\'" + inches;
  }
}
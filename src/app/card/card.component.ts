import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { AppComponent } from '../app.component'

@Component({
  selector: 'sg-app-card',
  styleUrls: ['./card.component.css'],
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() private cardNumber: string;
  @Input() private card: string [];

  constructor(public dataServiceService: DataServiceService, public appComponent: AppComponent){
  }
  
  public ngOnInit() {
  }
  private heightConverter(n: number): string{
      const realFeet = ((n*0.393700) / 12);
      const feet = Math.floor(realFeet);
      const inches = Math.round((realFeet - feet) * 12);
      return feet + "\'" + inches;
  }
}

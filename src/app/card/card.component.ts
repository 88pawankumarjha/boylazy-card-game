import { Component, OnInit, Input } from '@angular/core';
import { DataServiceService } from '../data-service.service';
import { AppComponent } from '../app.component'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() cardNumber: string;
  @Input() card: Array<String>;
  myCard = [];
  otherCard = [];
  
  constructor(private dataServiceService: DataServiceService, private appComponent: AppComponent){ 
    // this.myCard = this.dataServiceService.myCard;
    this.otherCard = this.dataServiceService.otherCard;
  }
  getKeys(map){
      return Array.from(map.keys());
  }
  ngOnInit() {
  }

}
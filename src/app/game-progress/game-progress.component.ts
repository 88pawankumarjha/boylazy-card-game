import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component'


@Component({
  selector: 'app-game-progress',
  templateUrl: './game-progress.component.html',
  styleUrls: ['./game-progress.component.css']
})
export class GameProgressComponent {
  @Input() myProgressValue: string;
  @Input() otherProgressValue: string;
  
  constructor(appComponent: AppComponent) { }

}
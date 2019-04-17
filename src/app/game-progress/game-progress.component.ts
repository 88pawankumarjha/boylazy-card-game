import { Component, Input } from '@angular/core';
import { AppComponent } from '../app.component'


@Component({
  selector: 'app-game-progress',
  styleUrls: ['./game-progress.component.css'],
  templateUrl: './game-progress.component.html',
})
export class GameProgressComponent {
  @Input() private myProgressValue: string;
  @Input() private otherProgressValue: string;
  
  constructor(appComponent: AppComponent) { }

}

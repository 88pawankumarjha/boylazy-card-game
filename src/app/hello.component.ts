import { Component, Input } from '@angular/core';

@Component({
  selector: 'hello',
  styles: [`h1 { font-family: Lato; }`],
  template: `<h1>Hello {{name}}!</h1>`,
})
export class HelloComponent  {
  @Input() private name: string;
}

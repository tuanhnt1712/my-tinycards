import { Component, Input }  from '@angular/core';

import { LessonContentComponent } from './lesson-content.component';
import { LessonComponent } from './lesson.component';

@Component({
  template: `
      <div class="containerr">
        <div class="ct-card" (click)="flipped($event)" [class.flipped]="menuOpen">
          <div class="item-card front" style="border-radius: 15px;">
            <span> {{data.current_card.front}} </span>
          </div>
          <div class="item-card back">
            <span> {{data.current_card.back}} </span>
          </div>
        </div>
      </div>
      <button (click)="continue()">continue</button>
  `,
  styleUrls: ['./lesson.component.css']
})
export class RememberCardComponent implements LessonContentComponent {
  @Input() data: any;
  parent: any;
  menuOpen = false;
  flipped($event){
    this.menuOpen = !this.menuOpen;
  }

  continue(){
    this.parent.nextCard();
  }
}

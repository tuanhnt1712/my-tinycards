import { Component, Input }  from '@angular/core';

import { LessonContentComponent } from './lesson-content.component';
import { LessonComponent } from './lesson.component';

@Component({
  template: `
    <div class="les-wrapper">
      <div class="les-card">
        <p class="title">New Card</p>
        <div class="containerr" style="margin-bottom: 35px">
          <div class="ct-card" (click)="flipped($event)" [class.flipped]="menuOpen">
            <div class="item-card front" style="width: 100%;border-radius: 15px;">
              <span> {{data.current_card.front}} </span>
            </div>
            <div class="item-card back">
              <span> {{data.current_card.back}} </span>
            </div>
          </div>
        </div>
        <button type="button" class="btn-continue" (click)="continue()">Continue <i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i></button>
      </div>
    </div>
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

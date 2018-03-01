import { Component, Input, OnInit }  from '@angular/core';

import { LessonContentComponent } from './lesson-content.component';

@Component({
  template: `
    <div class="les-wrapper"> 
      <div class="les-choice">
		    <div class="row">
          <div class="col-md-4">
            <div class="containerr" style="margin-bottom: 35px">
              <div class="ct-card">
                <div class="front" style="border-radius: 15px;">
                  <span> {{data.current_card.front}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="answers">
              <ul>
                <input type="text" name="answer" id="write-answer">
              </ul>
            </div>
          </div>
       	</div>
       	<div class="les-card">
        	<button type="button" class="btn-continue" (click)="continue(answer)">Continue <i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i><i class="fa fa-angle-double-right"></i></button>
       	</div>
      </div>
    </div>
  `,
  styleUrls: ['./lesson.component.css']
})
export class MapQuestionAnswerComponent implements LessonContentComponent, OnInit {
  @Input() data: any;
  parent: any;
  cards = [];
  current_card: any;
  answers = [];

  ngOnInit() {
    this.current_card = this.data.current_card
    this.cards = this.data.cards
  }

  continue(answer){
  	answer = (<HTMLInputElement>document.getElementById('write-answer')).value
    if (this.current_card.back == answer) {
      console.log("Right");
      this.parent.nextCard();
    }else {
      console.log("Wrong");
    }
  }
}

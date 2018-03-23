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
                  <div>
                <img src="{{data.current_card.picture.url}}" style="width: 75%;margin-top: 15px;margin-bottom: 8px;">
              </div>
              <span> {{data.current_card.front}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-8">
            <div class="txt-answers">
              <div class="ct-answers">
                <input type="text" class="txt-answer" placeholder="Enter the answer" name="answer" id="write-answer">
                <button type="button" class="btn-continue" (click)="continue(answer)">
                <i class="fa fa-arrow-circle-right"></i></button>
              </div>
            </div>
          </div>
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
      this.parent.point++;
      this.parent.nextCard();
    }else {
      console.log("Wrong");
      this.parent.point--;
      this.parent.current_card_index--;
    }
  }
}

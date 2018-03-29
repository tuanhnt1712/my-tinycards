import { Component, Input, OnInit }  from '@angular/core';
import * as _ from "lodash";
import { LessonContentComponent } from './lesson-content.component';

@Component({
  template: `
    <div class="les-wrapper">
      <div class="les-choice">
		    <div class="row">
          <div class="col-xs-12 col-md-4">
            <div class="containerr" style="margin-bottom: 35px">
              <div class="ct-card">
                <div class="front" id="animation1" style="border-radius: 15px;">
                  <div>
                    <img src="{{data.current_card.picture.url}}" onError="this.src='./assets/images/card-demo.jpg';" style="width: 75%;margin-top: 15px;margin-bottom: 8px;">
                  </div>
                  <span> {{data.current_card.front}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-8">
            <div class="txt-answers">
              <div class="ct-answers">
                <input type="text" class="txt-answer" placeholder="Enter the answer" name="answer" id="write-answer">
                <button type="button" class="btn-continue" (click)="continue(answer)">
                <i class="fa fa-arrow-circle-right"></i></button>
              </div>
              <div class="ct-hint">{{hint}}</div>
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
  current_card: any;
  answers = [];
  hint: string;

  ngOnInit() {
    this.current_card = this.data.current_card
  }

  continue(answer){
  	answer = (<HTMLInputElement>document.getElementById('write-answer')).value
    if (_.isEqual(_.words(_.toLower(this.current_card.back)), _.words(_.toLower(answer))) ) {
      console.log("Right")
      document.getElementById('animation1').classList.add("true-animation");
      this.parent.lessonPracticeService.map_question_success(this.data.current_card);
    }else {
      document.getElementById('animation1').classList.add("false-animation");
      this.hint = this.current_card.back
      this.parent.lessonPracticeService.reset_card(this.data.current_card);
      console.log("Wrong");
    }
    _.delay(this.parent.nextCard.bind(this.parent), 1000);
  }
}

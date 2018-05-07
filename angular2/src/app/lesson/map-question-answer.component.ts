import { Component, Input, OnInit }  from '@angular/core';
import * as _ from "lodash";
import { LessonContentComponent } from './lesson-content.component';

@Component({
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  },
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
                  <div style="overflow:auto;height: 82px;">
                    <span style="word-wrap: break-word;"> {{data.current_card.back}} </span>
                  </div>
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
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.continue();
      return;
    }
  }
  ngAfterViewInit() {
    (<HTMLInputElement>document.getElementById('write-answer')).focus();
  }
  continue() {
    let answer = (<HTMLInputElement>document.getElementById('write-answer')).value
    answer = _.trim(answer)
    if (answer === null || answer === '') {
      return;
    }
    if (_.isEqual(_.words(_.toLower(this.current_card.front)), _.words(_.toLower(answer))) ) {
      console.log("Right")
      document.getElementById('animation1').classList.add("true-animation");
      this.parent.lessonPracticeService.map_question_success(this.data.current_card);
      _.delay(this.parent.nextCard.bind(this.parent), 1000);
      return;
    }
    document.getElementById('animation1').classList.add("false-animation");
    this.hint = this.current_card.front
    console.log("Wrong");
    _.delay(this.parent.nextCard.bind(this.parent), 3000);
  }
}

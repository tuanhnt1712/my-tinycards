import { Component, Input, OnInit }  from '@angular/core';
import { LessonContentComponent } from './lesson-content.component';
import * as _ from "lodash";

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
                <div class="front back-card" id="animation2" style="border-radius: 15px;overflow:auto">
                  <span style="word-wrap: break-word;"> {{data.current_card.back}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-8 img-answ">
            <div class="image-answers">
              <ul style="list-style-type: decimal;">
                <li class="list-ans" *ngFor="let card_answer of card_answers" >
                  <button (click)="continue(card_answer)">
                    <div style="flex:5">
                      {{card_answer.front}}
                    </div>
                    <div>
                      <img src="{{card_answer.picture.url}}" onError="this.src='./assets/images/card-demo.jpg';">
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./lesson.component.css']
})
export class SingleChoiceImageQuestionComponent implements LessonContentComponent, OnInit {
  @Input() data: any;
  parent: any;
  lessons = [];
  cards = [];
  current_card: any;
  card_answers = [];

  ngOnInit() {
    this.current_card = this.data.current_card
    this.cards =  _.cloneDeep(this.data.cards);
    this.card_answers = this.randomAnswers(this.current_card, this.cards);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (/[1-9]/.test(event.key)) {
      event.preventDefault();
      let answer = this.card_answers[_.toNumber(event.key) - 1];
      if (typeof answer !== 'undefined') {
        this.continue(answer);
      }
    }
  }

  continue(card_answer){
    console.log(this.card_answers);
    if (this.current_card.id == card_answer.id) {
      console.log("Right");
      document.getElementById('animation2').classList.remove("false-animation");
      document.getElementById('animation2').classList.add("true-animation");
      this.parent.lessonPracticeService.single_question_success(this.current_card);
      _.delay(this.parent.nextCard.bind(this.parent), 1000);
    } else {
      document.getElementById('animation2').classList.add("false-animation");
      _.delay(function () {
        document.getElementById('animation2').classList.remove("false-animation")
      }, 1000, 'later');
      console.log("Wrong");
    }
  }

  randomAnswers(card, cards){
    var card_answers = []
    if (cards.length == 2) {
      var otherCard =  _.find(cards, function(o) { return card !=o ; });
      card_answers.push(otherCard);
    }
    if (cards.length >= 3) {
      var other_cards = _.reject(cards, function(o) { return o.id == card.id; });
      var limited = _.sampleSize(other_cards, 2);
      card_answers = limited;
    }
    card_answers.push(card)
    return _.shuffle(card_answers)
  }
}

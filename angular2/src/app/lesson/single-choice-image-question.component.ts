import { Component, Input, OnInit }  from '@angular/core';
import { LessonContentComponent } from './lesson-content.component';
import * as _ from "lodash";

@Component({
  template: `
    <div class="les-wrapper">
      <div class="les-choice">
        <div class="row">
          <div class="col-xs-12 col-md-4">
            <div class="containerr" style="margin-bottom: 35px">
              <div class="ct-card">
                <div class="front back-card" id="animation2" style="border-radius: 15px;">
                  <span> {{data.current_card.back}} </span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-md-8 img-answ">
            <div class="image-answers">
              <ul style="list-style-type: decimal;">
                <li class="list-ans" *ngFor="let card_answer of card_answers" >
                  <button (click)="continue(card_answer)">
                    {{card_answer.front}}
                    <img src="{{card_answer.picture.url}}" onError="this.src='./assets/images/card-demo.jpg';">
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

  continue(card_answer){
    if (this.current_card.front == card_answer.front) {
      console.log("Right");
      document.getElementById('animation2').classList.add("true-animation");
      this.parent.lessonPracticeService.single_question_success(this.current_card);
      _.delay(this.parent.nextCard.bind(this.parent), 1000);
    }else {
      document.getElementById('animation2').classList.add("false-animation");
      this.parent.lessonPracticeService.reset_card(this.current_card);
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

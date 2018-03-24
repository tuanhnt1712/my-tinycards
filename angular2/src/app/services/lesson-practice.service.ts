import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as _ from "lodash";

@Injectable()
export class LessonPracticeService {
  types = {
    SINGLE_QUESTION: "single_question",
    SINGLE_IMAGE_QUESTION: "single_image_question",
    MAP_QUESTION: "map_question",
  }
  cards = [];
  learning_cards = [];
  progress = 0;
  constructor(){}
  public progressStateSource = new Subject<number>();
  progressState$ = this.progressStateSource.asObservable();

  initialize(cards){
    var self = this;
    self.cards = cards;
    this.learning_cards = cards.map(card => {
      return {...card, remembered: false, exercises: [
        self.types['SINGLE_QUESTION'],
        self.types['SINGLE_IMAGE_QUESTION'],
        self.types['MAP_QUESTION']
        ]};
    });
  }

  finished(){
    return this.learning_cards.length == 0
  }

  continue(remember_card, single_question, single_image_question, map_question){
    var learning_card = _.sample(this.learning_cards);
    if (learning_card.remembered) {
      var exercise = _.sample(learning_card.exercises)
      if (exercise == this.types['SINGLE_QUESTION']) {
        single_question(learning_card, this.learning_cards)
      } else if (exercise == this.types['SINGLE_IMAGE_QUESTION']) {
        single_image_question(learning_card, this.learning_cards)
      } else if (exercise == this.types['MAP_QUESTION']) {
        map_question(learning_card)
      }
    } else {
      remember_card(learning_card);
    }
  }

  caculate_progress() {
    var total = _.size(this.types) * this.cards.length;

    var remain = 0
    _.forEach(this.learning_cards, function(learning_card) {
      remain += _.size(learning_card.exercises);
    });

    var progress = (total - remain)*100/total;
    this.progressStateSource.next(progress);
    console.log(progress)
    return progress;
  }

  remembered_card(card) {
    card.remembered = true;
    return card;
  }

  reset_card(card) {
    card.remembered = false,
    card.exercises = [
             this.types['SINGLE_QUESTION'],
             this.types['SINGLE_IMAGE_QUESTION'],
             this.types['MAP_QUESTION']
            ]
    this.caculate_progress();
    return card;
  }

  map_question_success(card) {
    this.removeObjectRemove(this.types['MAP_QUESTION'], card.exercises)
    if (card.exercises.length == 0) {
      this.removeObjectRemove(card, this.learning_cards)
    }
    this.caculate_progress();
    return true
  }

  single_question_success(card) {
    this.removeObjectRemove(this.types['SINGLE_QUESTION'], card.exercises)
    if (card.exercises.length == 0) {
      this.removeObjectRemove(card, this.learning_cards)
    }
    this.caculate_progress();
    return true
  }

  single_image_question_success(card) {
    this.removeObjectRemove(this.types['SINGLE_IMAGE_QUESTION'], card.exercises)
    if (card.exercises.length == 0) {
      this.removeObjectRemove(card, this.learning_cards)
    }
    this.caculate_progress();
    return true
  }

  getRandomObject(items) {
    return items[Math.floor(Math.random()*items.length)];
  }

  removeObjectRemove(item, items) {
    items.splice(items.indexOf(item), 1);
    return item
  }
}

import { Component, ViewChild, OnInit, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { Lesson } from '../lesson';
import { FormWizardModule } from 'angular2-wizard';

import { LessonContentDirective } from './lesson-content.directive';
import { LessonContentItem }      from './lesson-content-item';
import { LessonContentComponent } from './lesson-content.component'
import { RememberCardComponent } from './remember-card.component'
import { SingleChoiceQuestionComponent } from './single-choice-question.component';
import { MapQuestionAnswerComponent } from './map-question-answer.component';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements AfterViewInit {
  sub: any;
	menuOpen = false;
  lessons = [];
  cards = [];
  point: number = 0;
  current_card_index: number = -1;

  @ViewChild(LessonContentDirective) lessonContentHost: LessonContentDirective;

  constructor(private decksService: DecksService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  nextCard(){
    if (this.point == 5) {
      alert(this.point);
      this.router.navigate(['decks/']);
    }
    this.current_card_index = Math.floor(Math.random() * this.cards.length);
    let rand = Math.floor(Math.random() * 3);

    if (rand == 0){
      this.loadRememberCardComponent(this.current_card_index)
    } else if(rand == 1) {
      this.loadSingleChoiceQuestionComponent(this.current_card_index)
    } else {
      this.loadMapQuestionAnswerComponent(this.current_card_index)
    }
  }

  delay(ms) {
    ms += new Date().getTime();
    while (new Date() < ms){}
  }

  ngAfterViewInit(){
    const self = this;
    this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
         this.decksService
          .get_lesson(id)
          .subscribe(function(p){
            self.cards = p.cards;
            self.nextCard();
          })
      return self.cards;
    });
  }

  loadRememberCardComponent(current_card_index) {
    let lcItem = new LessonContentItem(RememberCardComponent, {current_card: this.cards[current_card_index]})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadSingleChoiceQuestionComponent(current_card_index) {
    let lcItem = new LessonContentItem(SingleChoiceQuestionComponent, {current_card: this.cards[current_card_index], cards: this.cards})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadMapQuestionAnswerComponent(current_card_index) {
    let lcItem = new LessonContentItem(MapQuestionAnswerComponent, {current_card: this.cards[current_card_index]})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  ok(id, model) {
    this.decksService.create_user_lesson(model["value"]).subscribe(
      data => {
        this.router.navigate(['decks/']);
        return true;
    });
  }
}

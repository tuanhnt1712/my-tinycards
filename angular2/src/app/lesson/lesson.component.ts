import { Component, ViewChild, OnInit, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { Lesson } from '../lesson';
import { FormWizardModule } from 'angular2-wizard';

import { LessonContentDirective } from './lesson-content.directive';
import { LessonContentItem }      from './lesson-content-item';
import { LessonContentComponent } from './lesson-content.component'
import { RememberCardComponent } from './remember-card.component'
import { SingleChoiceQuestionComponent } from './single-choice-question.component'

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
  current_card_index: number = -1;

  @ViewChild(LessonContentDirective) lessonContentHost: LessonContentDirective;

  constructor(private decksService: DecksService,
              private route: ActivatedRoute,
              private router: Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  nextCard(){
    if (this.current_card_index == this.cards.length - 1) {
      this.router.navigate(['decks/']);
    }
    this.current_card_index++;
    let rand = Math.floor(Math.random() * 5);
    if (rand % 2 == 0){
      this.loadRememberCardComponent()
    } else {
      this.loadSingleChoiceQuestionComponent()
    }
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

  loadRememberCardComponent() {
    let lcItem = new LessonContentItem(RememberCardComponent, {current_card: this.cards[this.current_card_index]})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadSingleChoiceQuestionComponent() {
    let lcItem = new LessonContentItem(SingleChoiceQuestionComponent, {current_card: this.cards[this.current_card_index], cards: this.cards})
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

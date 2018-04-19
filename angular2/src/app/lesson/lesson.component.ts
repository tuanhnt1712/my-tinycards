import { Component, ViewChild, OnInit, AfterViewInit, ComponentFactoryResolver } from '@angular/core';
import { Observable }    from 'rxjs/Observable';

import { ActivatedRoute, Router } from '@angular/router';
import { DecksService } from '../services/decks.service';
import { DialogService } from '../dialog/dialog.service';
import { LessonPracticeService } from '../services/lesson-practice.service';
import { Lesson } from '../lesson';
import { FormWizardModule } from 'angular2-wizard';

import { LessonContentDirective } from './lesson-content.directive';
import { LessonContentItem }      from './lesson-content-item';
import { LessonContentComponent } from './lesson-content.component'
import { RememberCardComponent } from './remember-card.component'
import { SingleChoiceQuestionComponent } from './single-choice-question.component';
import { SingleChoiceImageQuestionComponent } from './single-choice-image-question.component';
import { MapQuestionAnswerComponent } from './map-question-answer.component';
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})

export class LessonComponent implements AfterViewInit {
  sub: any;
	menuOpen = false;
  progress = 0;
  lesson: any;
  cards = [];
  forceQuit = false;

  @ViewChild(LessonContentDirective) lessonContentHost: LessonContentDirective;

  constructor(private decksService: DecksService,
              private route: ActivatedRoute,
              private router: Router,
              public lessonPracticeService: LessonPracticeService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private dialogService: DialogService) { }

  ngOnInit() {
    const self = this;
    this.lessonPracticeService.progressState$.subscribe(
      state => {
        this.progress = state
      }
    );
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (!this.forceQuit) {
      return this.dialogService.confirm({title: "Confirm", message: "Are you sure?"})
    }
    return true;
  }

  nextCard(){
    if (this.lessonPracticeService.finished()) {
      this.finish_lesson(this.lesson);
    } else {
      this.lessonPracticeService.continue(
        this.loadRememberCardComponent.bind(this),
        this.loadSingleChoiceQuestionComponent.bind(this),
        this.loadSingleChoiceImageQuestionComponent.bind(this),
        this.loadMapQuestionAnswerComponent.bind(this),
      );
    }
  }

  ngAfterViewInit(){
    const self = this;
    this.sub = this.route.params.subscribe(params => {
        let id = Number.parseInt(params['id']);
         this.decksService
          .get_lesson(id)
          .subscribe(function(p){
            self.lesson = p;
            self.cards = p.cards;
            self.lessonPracticeService.initialize(p.cards);
            self.nextCard();
          })
      return self.cards;
    });
  }

  loadRememberCardComponent(learning_card) {
    let lcItem = new LessonContentItem(RememberCardComponent, {current_card: learning_card})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadSingleChoiceQuestionComponent(learning_card, learning_cards) {
    let lcItem = new LessonContentItem(SingleChoiceQuestionComponent,
      {current_card: learning_card, cards: this.cards});
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadSingleChoiceImageQuestionComponent(learning_card, learning_cards) {
    let lcItem = new LessonContentItem(SingleChoiceImageQuestionComponent,
      {current_card: learning_card, cards: this.cards});
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  loadMapQuestionAnswerComponent(learning_card) {
    let lcItem = new LessonContentItem(MapQuestionAnswerComponent, {current_card: learning_card})
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(lcItem.component);

    let viewContainerRef = this.lessonContentHost.viewContainerRef;
    viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<LessonContentComponent>componentRef.instance).data = lcItem.data;
    (<LessonContentComponent>componentRef.instance).parent = this;
  }

  finish_lesson(lesson) {
    this.decksService.create_user_lesson({lesson_id: lesson.id}).subscribe(
      data => {
        this.forceQuit = true;
        this.router.navigate(['/decks', lesson.deck_id]);
    });
  }

  quit_lesson() {
    this.router.navigate(['/decks', this.lesson.deck_id]);
  }
}

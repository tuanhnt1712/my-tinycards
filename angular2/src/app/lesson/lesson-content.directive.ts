import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[lesson-content]',
})
export class LessonContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

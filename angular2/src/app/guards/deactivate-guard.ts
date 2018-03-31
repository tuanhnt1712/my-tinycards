import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import {LessonComponent} from '../lesson/lesson.component';

@Injectable()
export class DeactivateGuard implements CanDeactivate<LessonComponent> {
  canDeactivate(component: LessonComponent) {
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}

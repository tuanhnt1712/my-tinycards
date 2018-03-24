import { Card } from './card'
import { UserLesson } from './user_lesson'

export interface Lesson {
  id: number,
  deck_id: number,
  percent: number,
  cards: Card[],
  current_user_lesson: UserLesson,
}

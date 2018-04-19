import { Deck } from './deck'
import { Card } from './card'
import { UserLesson } from './user_lesson'

export interface Lesson {
  id: number,
  deck_id: number,
  deck: Deck,
  percent: number,
  cards: Card[],
  current_user_lesson: UserLesson,
}

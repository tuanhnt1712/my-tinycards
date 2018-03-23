import { Card } from './card'
import { Lesson } from './lesson'

export interface Deck {
	id: number,
	user_id: number,
  title: string,
	user_name: string,
	description: string,
  cover_image: string,
  favorite_count: number,
  favorited: boolean,
  cards: Card[],
  lessons: Lesson[],
}

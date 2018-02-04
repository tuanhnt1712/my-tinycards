export interface Deck {
	id: number,
	user_id: number,
	title: string,
	description: string,
  cards: Card[],
  lessons: Lesson[]
}

export interface Lesson {
  id: number,
  cards: Card[]
}

export interface Card {
  id: number,
  deck_id: number,
  lesson_id: number,
  front: string,
  back: string
}

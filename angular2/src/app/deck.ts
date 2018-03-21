export interface Deck {
	id: number,
	user_id: number,
  title: string,
	user_name: string,
	description: string,
  cover_image: string,
  cards: Card[],
  lessons: Lesson[],
  favorite_count: number,
  favorited: boolean
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
  back: string,
  picture: string
}

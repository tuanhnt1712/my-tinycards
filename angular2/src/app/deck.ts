export interface Deck {
	id: number,
	user_id: number,
	title: string,
	description: string,
  cards_attributes: Card[]
}

export interface Card {
  id: number,
  deck_id: number,
  lesson_id: number,
  front: string,
  back: string
}

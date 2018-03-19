import { Deck } from './deck'

export interface User {
	id: number,
  name: string,
  email: string;
  password: string,
  password_confirmation: string,
  bio: string,
  avatar: string,
  decks: Deck[],
  followed: boolean,
  follower_number: number,
  following: User[],
  followers: User[],
  following_number: number,
}

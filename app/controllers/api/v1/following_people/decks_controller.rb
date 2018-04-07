class Api::V1::FollowingPeople::DecksController < Api::V1::AuthorizeController
	def index
		decks = Deck.by_following_people_of(current_user).page(params[:page])
		render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
	end	
end

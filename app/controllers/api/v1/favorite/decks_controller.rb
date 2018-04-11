class Api::V1::Favorite::DecksController < Api::V1::AuthorizeController
	def index
		decks = Deck.favorite_by(current_user).page(params[:page])
		render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
	end	
end

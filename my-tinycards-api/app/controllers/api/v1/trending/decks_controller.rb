class Api::V1::Trending::DecksController < Api::V1::AuthorizeController
	def index
		decks = Deck.trending(current_user).page(params[:page])
		render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
	end	
end

class Api::V1::Search::DecksController < Api::V1::AuthorizeController
	def index
		decks = Deck.search_deck(params[:key]).page(params[:page])
		render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
	end	
end

class Api::V1::DecksController < Api::V1::AuthorizeController
	def index
		decks = Deck.all.page(params[:page])
		render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
	end	

	def show
		@deck = Deck.find params[:id]
		render_success data: Api::V1::DeckSerializer.new(@deck)
	end

	def create
		@deck = ::CreateDeckService.new.perform(User.first, deck_params)
    render_success data: Api::V1::DeckSerializer.new(@deck)
	end

	private

	def deck_params
		params.require(:deck).permit Deck::ATTRIBUTE_PARAMS
	end
end

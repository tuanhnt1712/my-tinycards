class Api::V1::DecksController < Api::V1::AuthorizeController
	def index
		# deck = Deck.all.page(params[:page])
		# render_success data: ::ListNoticeSerializer.new(notices: deck).generate
	end	

	def show
		@deck = Deck.find params[:id]
		cards = deck.cards
		render_success data: Api::V1::DeckSerializer.new(@deck)
	end

	def create
		@deck = Deck.create! deck_params
    render_success data: Api::V1::DeckSerializer.new(@deck)
	end

	private
	def deck_params
		params.require(:deck).permit Deck::ATTRIBUTE_PARAMS
	end
end

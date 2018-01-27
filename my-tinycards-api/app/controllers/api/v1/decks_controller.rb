class Api::V1::DecksController < Api::V1::AuthorizeController
  def show
    @deck = Deck.find params[:id]
    render_success data: Api::V1::DeckSerializer.new(@deck)
  end
end

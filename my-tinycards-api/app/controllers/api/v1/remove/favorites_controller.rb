class Api::V1::Remove::FavoritesController < Api::V1::AuthorizeController
	def create
	  @favorite = current_user.favorites.find_by! favorite_params
	  @favorite.destroy!
	  deck = Deck.find favorite_params[:deck_id]
 	  render_success data: Api::V1::DeckDetail::DeckDetailSerializer.new(deck, scope: current_user)
	end

	private

	def favorite_params
	  params.permit :deck_id
	end
end

class Api::V1::Remove::FavoritesController < Api::V1::AuthorizeController
	def create
	  @favorite = current_user.favorites.find_by! favorite_params
	  @favorite.destroy!
 	  render_success
	end

	private

	def favorite_params
	  params.permit :deck_id
	end
end

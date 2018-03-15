class Api::V1::FavoritesController < Api::V1::AuthorizeController
	def create
	  @favorite = current_user.favorites.create! favorite_params
 	  render_success
	end

	private

	def favorite_params
	  params.permit :deck_id
	end
end

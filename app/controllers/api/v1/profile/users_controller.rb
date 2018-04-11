class Api::V1::Profile::UsersController < Api::V1::AuthorizeController
	def show
	  @user = User.find params[:id]
	  render_success data: Api::V1::Profile::UserSerializer.new(@user, scope: current_user)
	end
end

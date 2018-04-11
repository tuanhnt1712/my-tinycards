class Api::V1::RelationshipsController < Api::V1::AuthorizeController
  def create
    @user = User.find_by(id: params[:follower_id])
    current_user.follow @user
    render_success data: Api::V1::Profile::UserSerializer.new(@user, scope: current_user)
  end
end

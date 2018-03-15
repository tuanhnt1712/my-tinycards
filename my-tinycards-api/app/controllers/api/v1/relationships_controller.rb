class Api::V1::RelationshipsController < Api::V1::AuthorizeController
  def create
    @user = User.find_by(id: params[:follower_id])
    current_user.follow @user
    render_success
  end

  def destroy
  	@user = Relationship.find(params[:id]).followed
  	current_user.unfollow @user
  	render_success
  end
end

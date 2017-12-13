class UsersController < ApplicationController
  load_and_authorize_resource only: [:index]
  before_action :load_user, except: [:index, :new, :create]

  def index
    user_selects = User.select(:id, :name, :email, :avatar, :bio).order_by_id
    @users = user_selects.page(params[:page]).per Settings.users.per_page
  end

end

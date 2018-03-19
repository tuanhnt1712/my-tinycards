class Api::V1::Auth::UsersController < Api::V1::BaseController
  validate_params on: :create, require: User::SIGN_UP_REQUIRE_PARAMS

  def create
    user = Authenticates::SignUpService.new(user_params: user_params).perform
    render_success data: Authenticates::LoginService.new(user: user).perform
  end

  def show
    @user = User.find_by! id: params[:id]
    render_success data: Api::V1::UserSerializer.new(@user)
  end

  def edit
    @user = User.find_by! id: params[:id]
    render_success data: Api::V1::UserSerializer.new(@user)
  end

  def update
    @user = User.find_by! id: params[:id]
    Authenticates::UpdateService.new(user_params: user_update_params, user: @user).perform
    render_success data: Api::V1::UserSerializer.new(@user)
  end

  private

  def user_params
    params.permit User::ATTRIBUTES_PARAMS
  end

  def user_update_params
    params.permit User::UPDATE_PARAMS
  end

  def invalid_confirmation_token! user
    raise APIError::Authorize::InvalidConfirmationToken if user.confirmation_token != params[:confirmation_token]
  end

  def user_activated! user
    raise APIError::Authorize::UserActivated if user.confirmed?
  end
end

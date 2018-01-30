class Api::V1::Auth::ResetPasswordController < Api::V1::BaseController
  include Document::Auth::ResetPasswordDoc
  include Document::Auth::ValidateResetPasswordTokenDoc
  validate_params on: :update, require: User::RESET_PASSWORD_REQUIRE_PARAMS
  before_action :load_user, only: [:validate_token, :update]

  def validate_token
    render_success data: @user.reset_password_token
  end

  def update
    @user.update_attributes! reset_password_user_params
    Authenticates::RevokeAccessService.new(user: @user).perform
    render_success
  end

  private
  def load_user
    @user = User.without_deleted.token_not_nil.unexpired_token.find_by! reset_password_token: params[:token]
  end

  def reset_password_user_params
    params.permit User::RESET_PASSWORD_PARAMS
  end
end

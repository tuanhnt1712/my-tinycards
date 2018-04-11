class Api::V1::Auth::SendResetPasswordTokenController < Api::V1::BaseController
  validate_params on: :update, require: [:email]

  def update
    user = User.without_deleted.find_by! email: params[:email]
    if ::Authenticates::SendPasswordResetTokenService.new(user).perform
      render_success
    end
  end

  private
  def user_params
    params.require(:email)
  end
end

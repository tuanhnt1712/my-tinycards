class Api::V1::Auth::ChangePasswordController < Api::V1::AuthorizeController
  validate_params on: :update, require: User::CHANGE_PASSWORD_PARAMS

  def update
    if current_user.update_with_password change_password_params
      Authenticates::RevokeAccessService.new(user: current_user).perform
      render_success data: Authenticates::LoginService.new(user: current_user).perform
    else
      raise ActiveRecord::RecordInvalid.new current_user
    end
  end

  private
  def change_password_params
    params.permit User::CHANGE_PASSWORD_PARAMS
  end
end

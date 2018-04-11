class Api::V1::Auth::LogoutController < Api::V1::AuthorizeController
  include Api::V1::Auth::DoorkeeperAuthorize
  validate_params on: :revoke, require: [:device_id]

  def revoke
    revoke_token if authorized?
    Authenticates::DestroyDeviceTokenService.new(current_user_profile, params[:device_id]).perform
    render_success
  end
end

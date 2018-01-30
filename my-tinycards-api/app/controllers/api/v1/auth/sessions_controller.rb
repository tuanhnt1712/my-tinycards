class Api::V1::Auth::SessionsController < Api::V1::BaseController
  include Api::V1::Auth::DoorkeeperAuthorize
  include Api::V1::Auth::DeviceToken

  def create
    if authorize_response.status == :unauthorized
      raise APIError::Authorize::Unauthorized
    end

    # authorize_response_with_confirmed!

    # save_device_token current_resouce.user_profile, params[:device_id], current_language
    render_success data: Api::V1::Auth::LoginSerializer.new(current_resouce, authorize_response.token).generate

  rescue Doorkeeper::Errors::DoorkeeperError => e
    raise APIError::Authorize::DoorkeeperError
  end

  private
  def current_resouce
    @current_resouce ||= User.find authorize_response.token.resource_owner_id
  end

  def authorize_response_with_confirmed!
    raise APIError::Authorize::UserInactive unless current_resouce.confirmed?
  end
end

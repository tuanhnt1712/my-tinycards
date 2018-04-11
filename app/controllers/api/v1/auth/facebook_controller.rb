class Api::V1::Auth::FacebookController < Api::V1::BaseController
  validate_params on: :facebook, require: [:access_token, :device_id]

  def facebook
    data = Authenticates::LoginViaFacebookService.new(access_token: params[:access_token],
      location_params: location_params, device_id: params[:device_id], language: current_language).perform
    render_success data: data
  end

  private
  def location_params
    params.permit :latitude, :longitude
  end
end

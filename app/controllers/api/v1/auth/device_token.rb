module Api::V1::Auth::DeviceToken
  def save_device_token user_profile, device_id, language
    Authenticates::SaveDeviceTokenService.new(user_profile: user_profile, token: device_id, language: language).perform
  end
end

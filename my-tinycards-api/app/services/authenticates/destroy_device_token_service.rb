class Authenticates::DestroyDeviceTokenService
  attr_reader :user_profile, :data, :token

  def initialize user_profile, token
    @user_profile = user_profile
    @token = token
  end

  def perform
    device_tokens = @user_profile.device_tokens.where token: token
    device_tokens.destroy_all
  end
end

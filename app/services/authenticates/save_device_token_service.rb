class Authenticates::SaveDeviceTokenService
  attr_reader :user_profile, :token, :language

  def initialize args
    @user_profile = args[:user_profile]
    @token = args[:token]
    @language = args[:language]
  end

  def perform
    device_tokens = DeviceToken.where token: token
    ActiveRecord::Base.transaction do
      device_tokens.destroy_all
      user_profile.device_tokens.create! token: token, language: language
    end
  end
end

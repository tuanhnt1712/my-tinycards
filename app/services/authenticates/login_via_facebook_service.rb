class Authenticates::LoginViaFacebookService
  require "api_error/base"
  include Api::V1::Auth::DeviceToken
  attr_reader :access_token, :location_params, :data, :device_id, :language

  def initialize args
    @access_token = args[:access_token]
    @location_params = args[:location_params]
    @device_id = args[:device_id]
    @language = args[:language]
  end

  def perform
    user_info = Authenticates::GetInfoFromFacebookService.new(access_token: access_token).perform
    birthday = Date.strptime(user_info["birthday"], "%m/%d/%Y") if user_info["birthday"].present?
    user_profile_attributes = {name: user_info["name"], gender: user_info["gender"], birth_year: birthday}.merge(location_params)
    user = User.find_by email: user_info["email"]
    raise ::APIError::Authorize::Unauthorized if user.present? && user.deleted?
    ActiveRecord::Base.transaction do
      if user.present? && user.facebook_id.nil?
        user.assign_attributes facebook_id: user_info["id"]
      else
        user = User.find_or_initialize_by(facebook_id: user_info["id"])
        user.assign_attributes email: user_info["email"], password: Devise.friendly_token[0,20], confirmed_at: Time.zone.now
      end
      update_or_create_profile user, user_profile_attributes
      user.save!
      user.user_profile.create_user_profile_setting! if user.user_profile.user_profile_setting.nil?
      user.user_profile.create_user_profile_asset! if user.user_profile.user_profile_asset.nil?
      token = Doorkeeper::AccessToken.create resource_owner_id: user.id,
        refresh_token: Doorkeeper::AccessToken.generate_unique_secure_token,
        expires_in: Doorkeeper.configuration.access_token_expires_in
      save_device_token user.user_profile, device_id, language
      @data = Api::V1::Auth::LoginSerializer.new(user, token).generate
    end
  end

  private
  def update_or_create_profile user, attributes
    if user.user_profile
      user.user_profile.assign_attributes attributes
    else
      user.create_user_profile attributes
    end
  end
end

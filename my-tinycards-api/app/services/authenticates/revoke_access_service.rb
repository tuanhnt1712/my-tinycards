class Authenticates::RevokeAccessService
  attr_reader :user, :device_token

  def initialize args
    @user = args[:user]
    @device_token = args[:device_token]
  end

  def perform
    ActiveRecord::Base.transaction do
      Doorkeeper::AccessToken.where(resource_owner_id: user.id).each do |token|
        token.revoke
      end
      user.user_profile.device_tokens.without_token(device_token).each do |token|
        token.destroy!
      end
    end
  end
end

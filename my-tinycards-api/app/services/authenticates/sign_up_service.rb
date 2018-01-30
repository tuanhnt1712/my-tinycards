class Authenticates::SignUpService
  attr_reader :user_params

  def initialize args
    @user_params = args[:user_params]
  end

  def perform
    user_params.merge! confirmation_token: SecureRandom.hex(Settings.active_user.token_number_char)
    user = nil
    ActiveRecord::Base.transaction do
      user = User.create! user_params
      user.user_profile.create_user_profile_setting!
      user.user_profile.create_user_profile_asset!
    end
    UserMailer.active_user(user).deliver_later
    user
  end
end

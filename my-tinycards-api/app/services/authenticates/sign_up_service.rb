class Authenticates::SignUpService
  attr_reader :user_params

  def initialize args
    @user_params = args[:user_params]
  end

  def perform
    # user_params.merge! confirmation_token: SecureRandom.hex(32)
    user = nil
    binding.pry
    ActiveRecord::Base.transaction do
      user = User.create! user_params
    end
    # UserMailer.active_user(user).deliver_later
    user
  end
end

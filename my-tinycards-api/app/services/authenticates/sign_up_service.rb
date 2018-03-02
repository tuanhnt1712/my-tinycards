class Authenticates::SignUpService
  attr_reader :user_params, :user

  def initialize args
    @user_params = args[:user_params]
  end

  def perform
    ActiveRecord::Base.transaction do
      @user = User.create! user_params
    end
    user
  end
end

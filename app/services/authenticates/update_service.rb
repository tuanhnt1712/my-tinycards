class Authenticates::UpdateService
  attr_reader :user_params, :user

  def initialize args
    @user_params = args[:user_params]
    @user = args[:user]
  end

  def perform
    ActiveRecord::Base.transaction do
      user.update_attributes! user_params
    end
    user
  end
end

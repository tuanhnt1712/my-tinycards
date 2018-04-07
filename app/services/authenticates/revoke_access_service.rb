class Authenticates::RevokeAccessService
  attr_reader :user

  def initialize args
    @user = args[:user]
  end

  def perform
    ActiveRecord::Base.transaction do
      Doorkeeper::AccessToken.where(resource_owner_id: user.id).each do |token|
        token.revoke
      end
    end
  end
end

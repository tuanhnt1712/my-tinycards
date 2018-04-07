class Authenticates::LoginService
  attr_reader :user, :data

  def initialize args
    @user = args[:user]
  end

  def perform
    token = Doorkeeper::AccessToken.create resource_owner_id: user.id,
      refresh_token: Doorkeeper::AccessToken.generate_unique_secure_token,
      expires_in: Doorkeeper.configuration.access_token_expires_in
    @data = Api::V1::Auth::LoginSerializer.new(user, token).generate
  end
end

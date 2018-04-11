class Api::V1::Auth::LoginSerializer
  attr_reader :user, :token

  def initialize user, token
    @user = user
    @token = token
  end

  def generate
    {
      token: token.token,
      refresh_token: token.refresh_token,
      expires_in: token.expires_in,
      created_at: token.created_at,
      user_id: user.id,
      user_email: user.email,
      name: user.name
    }
  end
end

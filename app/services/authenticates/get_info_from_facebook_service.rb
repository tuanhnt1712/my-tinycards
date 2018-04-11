class Authenticates::GetInfoFromFacebookService
  attr_reader :access_token
  ATTRIBUTES = "id,name,email,picture,gender,birthday"
  KOALA_PARAM = "me?fields=#{ATTRIBUTES}"

  def initialize args
    @access_token = args[:access_token]
  end

  def perform
    Koala::Facebook::API.new(access_token).get_object(KOALA_PARAM)
  rescue Koala::Facebook::AuthenticationError
    raise APIError::Client::InvalidAccessToken
  rescue Koala::Facebook::ClientError
    raise APIError::Client::InvalidAccessToken
  end
end

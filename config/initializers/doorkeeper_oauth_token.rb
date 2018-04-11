Doorkeeper::OAuth::Token.module_eval do
  class << self
    def from_request(request, *methods)
      methods.inject(nil) do |credentials, method|
        method = self.method(method) if method.is_a?(Symbol)
        credentials = method.call(request)
        break credentials unless credentials.blank?
      end
    end

    def authenticate(request, *methods)
      if token = from_request(request, *methods)
        access_token = Doorkeeper::AccessToken.by_token(token)
        access_token.revoke_previous_refresh_token! if access_token
        access_token
      end
    end

    def from_bearer_authorization(request)
      pattern = /^Bearer /i
      header  = request.headers[:HTTP_DOORKEEPER_TOKEN]
      token_from_header(header, pattern) if match?(header, pattern)
    end

    private
    def token_from_header(header, pattern)
      header.gsub pattern, ''
    end

    def match?(header, pattern)
      header && header.match(pattern)
    end
  end
end

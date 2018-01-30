module Api::V1::Auth::DoorkeeperAuthorize
  MODULES = [
      ActionController::Instrumentation,
      AbstractController::Rendering,
      ActionController::Rendering,
      ActionController::Renderers::All,
      Doorkeeper::Helpers::Controller
    ].freeze

  def self.included base
    MODULES.each do |mod|
      base.class_eval do
        include mod
      end
    end
  end

  ActiveSupport.run_load_hooks(:doorkeeper_metal_controller, self)

  private

  # OAuth 2.0 Section 2.1 defines two client types, "public" & "confidential".
  # Public clients (as per RFC 7009) do not require authentication whereas
  # confidential clients must be authenticated for their token revocation.
  #
  # Once a confidential client is authenticated, it must be authorized to
  # revoke the provided access or refresh token. This ensures one client
  # cannot revoke another's tokens.
  #
  # Doorkeeper determines the client type implicitly via the presence of the
  # OAuth client associated with a given access or refresh token. Since public
  # clients authenticate the resource owner via "password" or "implicit" grant
  # types, they set the application_id as null (since the claim cannot be
  # verified).
  #
  # https://tools.ietf.org/html/rfc6749#section-2.1
  # https://tools.ietf.org/html/rfc7009
  def authorized?
    if token.present?
      # Client is confidential, therefore client authentication & authorization
      # is required
      if token.application_id?
        # We authorize client by checking token's application
        server.client && server.client.application == token.application
      else
        # Client is public, authentication unnecessary
        true
      end
    end
  end

  def revoke_token
    if token.accessible?
      token.revoke
    end
  end

  def token
    @token ||= ::Doorkeeper::AccessToken.by_token(request.POST['token']) ||
      ::Doorkeeper::AccessToken.by_refresh_token(request.POST['token'])
  end

  def strategy
    @strategy ||= server.token_request params[:grant_type]
  end

  def authorize_response
    @authorize_response ||= strategy.authorize
  end
end

Doorkeeper::Config.class_eval do
  def client_credentials_methods
    @client_credentials ||= [:from_params]
  end
end

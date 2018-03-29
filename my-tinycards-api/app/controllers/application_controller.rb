class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def after_sign_in_path_for resource
    admins_root_url
  end
end

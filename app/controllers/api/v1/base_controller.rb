class Api::V1::BaseController < ActionController::API
  include AbstractController::Translation
  respond_to :json
  include Api::V1::ExceptionRescue
  include ParamsValidator

  before_action :set_locale, :validate_newest_app_version

  private
  def render_success response_params = {}
    render json: {success: true, data: response_params[:data]},  status: 200
  end

  def render_error response_params = {}
    render json: {success: false, errors: response_params[:errors]}, status: 200
  end

  def set_locale
    I18n.locale = current_language
  end

  def current_language
    if params[:language].present?
      params[:language].in?(Settings.accepted_languages) ? params[:language] : Settings.api.default_language
    else
      Settings.api.default_language
    end
  end

  def validate_newest_app_version
    return unless ENV["APP_VERSION"]
    raise APIError::Client::AppExpired unless request.headers["app-version"].in?(ENV["APP_VERSION"].split "|")
  end
end

module BaseAPI
  extend ActiveSupport::Concern

  included do
    prefix "api"
    format :json
    formatter :json, Grape::Formatter::ActiveModelSerializers
    error_formatter :json, ErrorFormatter
    default_format :json

    rescue_from Grape::Exceptions::ValidationErrors, ActiveRecord::RecordNotUnique do
      error!({error_code: Settings.error_formatter.error_codes.validation_errors,
              message: I18n.t("api_error.validation_errors")},
        Settings.error_formatter.http_code.validation_errors)
    end

    rescue_from APIError::Base do |e|
      error_key = e.class.name.split("::").drop(1).map(&:underscore).first
      error_code = Settings.error_formatter.error_codes.public_send error_key
      http_code = Settings.error_formatter.http_code.public_send error_key
      error!({error_code: error_code, message: e.message}, http_code)
    end

    rescue_from ActiveRecord::UnknownAttributeError, ActiveRecord::RecordInvalid, ActiveRecord::StatementInvalid,
      JSON::ParserError do |e|
      error!({error_code: Settings.error_formatter.error_codes.data_operation, message: e.message},
        Settings.error_formatter.http_code.data_operation)
    end

    rescue_from ActiveRecord::RecordNotFound do
      error!({error_code: Settings.error_formatter.error_codes.record_not_found,
              message: I18n.t("api_error.not_found")},
        Settings.http_code.code_404)
    end

    helpers do
      def authenticate!
        raise APIError::Unauthenticated unless current_user
      end

      def current_user
        @current_user ||= User.from_access_token access_token_header
      end

      def access_token_header
        headers[Settings.access_token_header]
      end
    end
  end
end

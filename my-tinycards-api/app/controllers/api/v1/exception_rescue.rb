module Api::V1::ExceptionRescue
  extend ActiveSupport::Concern

  included do
    rescue_from ActiveRecord::RecordInvalid, with: :render_invalidation_response
    rescue_from ActiveRecord::RecordNotFound, with: :render_record_not_found_response
    rescue_from APIError::Base, with: :render_api_error_response
    rescue_from APIError::Params::Missing, with: :render_params_error_response
   end

  def render_invalidation_response exception
    render json: exception.record, serializer: Api::V1::Errors::ValidationErrorsSerializer, status: :bad_request
  end

  def render_record_not_found_response exception
    render json: exception, scope: self.controller_path.underscore.gsub(%r{\/}, "."),
      serializer: Api::V1::Errors::RecordNotFoundSerializer, status: :bad_request
  end

  def render_api_error_response exception
    render json: exception, serializer: Api::V1::Errors::ApiErrorsSerializer,
      status: :bad_request
  end

  def render_params_error_response exception
    render json: exception, serializer: Api::V1::Errors::ParamsErrorsSerializer, status: :bad_request
  end
end

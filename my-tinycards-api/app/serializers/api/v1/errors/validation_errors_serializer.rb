class Api::V1::Errors::ValidationErrorsSerializer < Api::V1::Errors::BaseErrorsSerializer
  def errors
    object.errors.details.map do |field, details|
      details.map.with_index do |error_details, index|
        Api::V1::Errors::EachValidationErrorSerializer.new(
          object, field, error_details, object.errors[field][index]).generate
      end
    end.flatten
  end
end

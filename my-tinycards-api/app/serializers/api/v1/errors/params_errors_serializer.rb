class Api::V1::Errors::ParamsErrorsSerializer < Api::V1::Errors::BaseErrorsSerializer
  def errors
    object.error_fields.map do |error_field|
      Api::V1::Errors::EachParamsErrorSerializer.new(object, error_field).generate
    end
  end
end

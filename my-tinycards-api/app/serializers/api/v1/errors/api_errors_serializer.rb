class Api::V1::Errors::ApiErrorsSerializer < Api::V1::Errors::BaseErrorsSerializer
  def errors
    [{code: object.code, message: object.message}]
  end
end

class Api::V1::Errors::RecordNotFoundSerializer < Api::V1::Errors::BaseErrorsSerializer
  def errors
    [{code: 404, message: message}]
  end

  private
  def message
    I18n.t "serializers.#{scope}.record_not_found", default: object.message
  end
end

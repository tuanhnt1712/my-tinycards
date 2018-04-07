class Api::V1::Errors::BaseErrorsSerializer < ActiveModel::Serializer
  attribute :success
  attribute :errors

  def success
    false
  end
end

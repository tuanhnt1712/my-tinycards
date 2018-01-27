class Api::V1::Errors::EachParamsErrorSerializer
  attr_reader :object, :error_field

  def initialize object, error_field
    @object = object
    @error_field = error_field
  end

  def generate
    {
      code: object.code,
      message: object.message,
      error_field: error_field
    }
  end
end

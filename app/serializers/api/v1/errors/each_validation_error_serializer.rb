class Api::V1::Errors::EachValidationErrorSerializer
  def initialize record, error_field, details, message
    @record = record
    @error_field = error_field
    @details = details
    @message = message
  end

  def generate
    {
      resource: resource,
      field: field,
      code: code,
      message: @message,
      full_message: full_message
    }
  end

  private
  def resource
    I18n.t(
      underscored_resource_name,
      scope: [:api_validation, :resources]
    )
  end

  def field
     I18n.t(
      @error_field,
      scope: [:api_validation, :fields, underscored_resource_name]
    )
  end

  def code
    I18n.t(
      @details[:error],
      scope: [:api_validation, :codes]
    )
  end

  def full_message
     I18n.t(
      @error_field,
      scope: [:api_validation, :full_messages, underscored_resource_name],
      default: nil
    )
  end

  def underscored_resource_name
    @record.class.to_s.gsub("::", "").underscore
  end
end

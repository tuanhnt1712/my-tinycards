module UploaderFilename
  def filename
    if original_filename
      if model && model.read_attribute(mounted_as).present? && !model.attribute_changed?(mounted_as)
        model.read_attribute(mounted_as)
      else
        new_filename
      end
    end
  end

  def new_filename
    "#{secure_token}.#{file.extension}" if original_filename.present?
  end

  protected
  def secure_token
    var = :"@#{mounted_as}_secure_token"
    model.instance_variable_get(var) or model.instance_variable_set(var, SecureRandom.uuid)
  end
end

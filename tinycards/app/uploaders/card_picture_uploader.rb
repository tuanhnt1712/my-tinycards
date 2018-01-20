class CardPictureUploader < CarrierWave::Uploader::Base

  include CarrierWave::MiniMagick
  process resize_to_limit: [800, 800]

  storage :file

  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  def extension_white_list
    %w(jpg jpeg gif png)
  end
end

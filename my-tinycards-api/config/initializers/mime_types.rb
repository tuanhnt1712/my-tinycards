MIME::Types.add(
  MIME::Type.new('application/icml').tap do |type|
    type.add_extensions 'icml'
  end
)
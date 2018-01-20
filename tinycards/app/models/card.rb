class Card < ApplicationRecord
  belongs_to :deck, optional: true

  mount_uploader :picture, CardPictureUploader
end

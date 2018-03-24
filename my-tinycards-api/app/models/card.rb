class Card < ApplicationRecord
  belongs_to :deck, optional: true
  belongs_to :lesson, optional: true

  mount_base64_uploader :picture, CardUploader
  scope :no_lesson, -> {where lesson: nil}
end

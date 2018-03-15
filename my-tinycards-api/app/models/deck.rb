class Deck < ApplicationRecord
  belongs_to :user

  has_many :cards, dependent: :destroy
  has_many :lessons, dependent: :destroy
  has_many :favorites, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :description, presence: true, length: {maximum: 250}

  accepts_nested_attributes_for :cards

  scope :favorite_by, -> user {
    joins(:favorites).where(favorites: {user: user})
  }

  ATTRIBUTE_PARAMS = [
  	:user_id,
    :title,
    :description,
    :cover_image,
    cards_attributes: [
      :id,
      :front,
      :back,
      :picture
    ]
  ].freeze

  mount_base64_uploader :cover_image, DeckUploader
end

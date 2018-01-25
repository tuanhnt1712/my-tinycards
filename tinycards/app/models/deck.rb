class Deck < ApplicationRecord
  belongs_to :user

  has_many :cards, dependent: :destroy
  has_many :lessons, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :description, presence: true, length: {maximum: 250}

  accepts_nested_attributes_for :cards

  ATTRIBUTE_PARAMS = [
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

  mount_uploader :cover_image, DeckUploader

  scope :feed_sort, ->{order created_at: :desc}
end

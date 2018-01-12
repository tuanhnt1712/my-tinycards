class Deck < ApplicationRecord
  belongs_to :user

  has_many :cards, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :description, presence: true, length: {maximum: 250}

  accepts_nested_attributes_for :cards, :reject_if => lambda { |a| a[:content].blank? }, :allow_destroy => true

  ATTRIBUTE_PARAMS = [
    :title,
    :description,
    :cover_image,
    card_attributes: [
      :id,
      :front,
      :back
    ]
  ].freeze

  mount_uploader :cover_image, DeckUploader

  scope :feed_sort, ->{order created_at: :desc}
end

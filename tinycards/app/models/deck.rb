class Deck < ApplicationRecord
  belongs_to :user

  has_many :cards, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :description, presence: true, length: {maximum: 250}

  mount_uploader :cover_image, DeckUploader

  scope :feed_sort, ->{order created_at: :desc}
end

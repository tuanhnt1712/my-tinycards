class Deck < ApplicationRecord
  belongs_to :user

  has_many :cards, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validates :description, presence: true, length: {maximum: 250}
end

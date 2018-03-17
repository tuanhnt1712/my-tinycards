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
  scope :by_following_people_of, -> user {
    where user: user.following
  }
  scope :trending, -> user {
    left_joins(:favorites).group(:id).order("COUNT(favorites.id) DESC")
  }

  delegate :name, to: :user, prefix: true, allow_nil: true
  
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

class Deck < ApplicationRecord
  include CreatedAtDay

  belongs_to :user

  has_many :cards, dependent: :destroy
  has_many :no_lesson_cards, -> {no_lesson}, dependent: :destroy, class_name: Card
  has_many :lessons, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :feed_backs, dependent: :destroy

  validates :title, presence: true, length: {maximum: 100}
  validate :at_least_three_cards

  accepts_nested_attributes_for :cards, allow_destroy: true

  scope :favorite_by, -> user {
    joins(:favorites).where(favorites: {user: user})
  }
  scope :by_following_people_of, -> user {
    where user: user.following
  }
  scope :trending, -> user {
    left_joins(:favorites).group(:id).order("COUNT(favorites.id) DESC")
  }

  scope :search_deck, -> key {
    where("title like ? OR description like ?", "%#{key}%", "%#{key}%")
  }

  delegate :name, to: :user, prefix: true, allow_nil: true

  ATTRIBUTE_PARAMS = [
  	:user_id,
    :title,
    :description,
    :cover_image,
    :is_advance,
    cards_attributes: [
      :id,
      :_destroy,
      :front,
      :back,
      :picture
    ]
  ].freeze

  mount_base64_uploader :cover_image, DeckUploader

  def self.to_csv options = {}
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |deck|
        csv << deck.attributes.values_at(*column_names)
      end
    end
  end

  private

  def at_least_three_cards
     return errors.add :base, "Must have at least three Card" unless cards.length > 2
     return errors.add :base, "Must have at least three Card" if cards.reject{|card| card._destroy == true}.length < 3
  end
end

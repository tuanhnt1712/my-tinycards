class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :decks, dependent: :destroy

  scope :order_by_id, ->{order :id}
  validates :name, presence: true
end

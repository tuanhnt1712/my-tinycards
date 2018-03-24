class Lesson < ApplicationRecord
  belongs_to :deck

  has_many :cards, dependent: :destroy
  has_many :user_lessons, dependent: :destroy
end

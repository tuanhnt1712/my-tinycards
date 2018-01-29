class Card < ApplicationRecord
  belongs_to :deck, optional: true
  belongs_to :lesson, optional: true
end

class Card < ApplicationRecord
  belongs_to :deck, optional: true
end

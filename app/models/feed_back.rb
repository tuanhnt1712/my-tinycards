class FeedBack < ApplicationRecord
  belongs_to :deck
  belongs_to :user

  enum status: %i(not_interested an_error inappropriate infringes_copyright)
end

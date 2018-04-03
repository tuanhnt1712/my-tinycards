class Notification < ApplicationRecord
  enum status: [:read, :unread]
  belongs_to :admin
  belongs_to :feed_back
end

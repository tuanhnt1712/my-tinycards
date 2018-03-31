class User < ApplicationRecord
  include CreatedAtDay

  has_many :decks, dependent: :destroy
  has_many :user_lessons, dependent: :destroy
  has_many :favorites, dependent: :destroy
  has_many :active_relationships, class_name: Relationship.name,
    foreign_key: :follower_id, dependent: :destroy
  has_many :passive_relationships, class_name: Relationship.name,
    foreign_key: :followed_id, dependent: :destroy

  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower

  has_many :feed_backs, dependent: :destroy

  mount_base64_uploader :avatar, AvatarUploader

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ATTRIBUTES_PARAMS = [
  	:name,
  	:email,
  	:password,
  	:password_confirmation
  ].freeze

  SIGN_UP_REQUIRE_PARAMS = [
  	:name,
  	:email,
  	:password,
  	:password_confirmation
  ].freeze

  UPDATE_PARAMS = [
    :name,
    :email,
    :bio,
    :avatar
  ]

  CHANGE_PASSWORD_PARAMS = [
    :password,
    :password_confirmation,
    :current_password
  ]

  def follow other_user
    following << other_user
  end

  def unfollow other_user
    following.delete other_user
  end

  def self.to_csv options = {}
    CSV.generate(options) do |csv|
      csv << column_names
      all.each do |user|
        csv << user.attributes.values_at(*column_names)
      end
    end
  end
end

class User < ApplicationRecord
  has_many :decks, dependent: :destroy
  has_many :user_lessons, dependent: :destroy
  has_many :active_relationships, class_name: Relationship.name,
    foreign_key: :follower_id, dependent: :destroy
  has_many :passive_relationships, class_name: Relationship.name,
    foreign_key: :followed_id, dependent: :destroy
  has_many :following, through: :active_relationships, source: :followed
  has_many :followers, through: :passive_relationships, source: :follower


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

  def follow other_user
    following << other_user
  end

  def unfollow other_user
    following.delete other_user
  end
end

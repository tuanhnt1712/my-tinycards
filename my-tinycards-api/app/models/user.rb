class User < ApplicationRecord
  has_many :decks, dependent: :destroy

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
end

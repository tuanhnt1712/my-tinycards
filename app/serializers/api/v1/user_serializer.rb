class Api::V1::UserSerializer < ActiveModel::Serializer
	attributes :id, :name, :email, :bio, :avatar, :follower_number, :following_number,
	  :followed
	has_many :decks, serializer: Api::V1::DeckSerializer

	def follower_number
	  object.followers.size	
	end	

	def following_number
	  object.following.size	
	end

	def followed
	  if scope.present?
	  	scope.following.exists? id: object.id
	  end	
	end
end
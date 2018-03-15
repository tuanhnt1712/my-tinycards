class Api::V1::UserSerializer < ActiveModel::Serializer
	attributes :id, :name, :email, :bio, :avatar
	has_many :decks, serializer: Api::V1::DeckSerializer
end
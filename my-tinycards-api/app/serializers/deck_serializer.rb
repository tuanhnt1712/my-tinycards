class DeckSerializer < ActiveModel::Serializer
	attributes :id, :user_id, :title, :description
end
class Api::V1::DeckSerializer < ActiveModel::Serializer
	attributes :id, :user_id, :title, :description, :cover_image
	has_many :cards, serializer: Api::V1::CardSerializer
	has_many :lessons, serializer: Api::V1::LessonSerializer
end

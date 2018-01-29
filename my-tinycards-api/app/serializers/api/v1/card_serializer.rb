class Api::V1::CardSerializer < ActiveModel::Serializer
	attributes :id, :back, :front
	has_many :lessons, serializer: Api::V1::LessonSerializer
end
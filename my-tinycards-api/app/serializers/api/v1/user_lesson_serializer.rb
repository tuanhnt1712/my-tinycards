class Api::V1::UserLessonSerializer < ActiveModel::Serializer
	attributes :id, :user_id, :lesson_id
end

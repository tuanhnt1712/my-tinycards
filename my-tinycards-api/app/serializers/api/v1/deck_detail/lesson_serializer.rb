class Api::V1::DeckDetail::LessonSerializer < Api::V1::LessonSerializer
	attributes :id, :deck_id, :current_user_lesson
  has_many :cards, serializer: Api::V1::CardSerializer

  def current_user_lesson
    user_lesson = object.user_lessons.find_by(user: scope)
    user_lesson && Api::V1::UserLessonSerializer.new(user_lesson).serializable_hash
  end
end

class Api::V1::UserLessonsController < Api::V1::AuthorizeController
	def create
		@user_lesson = current_user.user_lessons.create! params_user_lesson
		render_success data: Api::V1::UserLessonSerializer.new(@user_lesson)
	end

	private

	def params_user_lesson
		params.permit UserLesson::ATTRIBUTE_PARAMS
	end
end

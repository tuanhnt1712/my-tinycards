class Api::V1::UserLessonsController < Api::V1::AuthorizeController
  def create
    @user_lesson = current_user.user_lessons.find_or_initialize_by params_user_lesson
    @user_lesson.update! practice_at: Time.zone.now
    render_success data: Api::V1::UserLessonSerializer.new(@user_lesson)
  end

  private

  def params_user_lesson
    params.permit UserLesson::ATTRIBUTE_PARAMS
  end
end

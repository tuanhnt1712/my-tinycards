class Api::V1::UserLessonsController < Api::V1::AuthorizeController
  def create
    @user_lesson = current_user.user_lessons.find_or_initialize_by params_user_lesson
    @user_lesson.update! practice_at: Time.zone.now

    try_create_next_lesson

    render_success data: Api::V1::UserLessonSerializer.new(@user_lesson)
  end

  private

  def params_user_lesson
    params.permit UserLesson::ATTRIBUTE_PARAMS
  end

  def try_create_next_lesson
    next_lessons = @user_lesson.lesson.deck.lessons.where("id > ?", @user_lesson.lesson_id)
    if next_lessons.exists?
      unless UserLesson.where(user: current_user, lesson: next_lessons).exists?
        UserLesson.create user: current_user, lesson: next_lessons.order(id: :asc).first
      end
    end
  end
end

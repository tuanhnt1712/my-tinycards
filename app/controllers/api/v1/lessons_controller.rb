class Api::V1::LessonsController < Api::V1::AuthorizeController
  def show
    @lesson = Lesson.find params[:id]
    render_success data: Api::V1::LessonSerializer.new(@lesson)
  end
end

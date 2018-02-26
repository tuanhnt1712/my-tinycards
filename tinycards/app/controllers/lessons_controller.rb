class LessonsController < ApplicationController
  def show
    @lesson = Lesson.find_by id: params[:id]
    @cards = @lesson.cards
  end
end

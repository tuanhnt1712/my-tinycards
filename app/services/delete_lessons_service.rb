class DeleteLessonsService
  attr_reader :deck

  def initialize args
    @deck = args[:deck]
  end

  def perform
    ActiveRecord::Base.transaction do
      deck.lessons.each do |lesson|
        lesson.destroy! if lesson.cards.size.zero?
      end
    end
    deck
  end
end

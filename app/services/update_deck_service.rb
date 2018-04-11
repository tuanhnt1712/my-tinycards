class UpdateDeckService
  attr_reader :deck, :params

  def initialize args
   @params = args[:params]
   @deck = args[:deck]
  end

  def perform
    ActiveRecord::Base.transaction do
      deck.update_attributes! params
      CreateLessonsService.new(deck: deck, cards: deck.no_lesson_cards).perform
    end
    deck
  end
end

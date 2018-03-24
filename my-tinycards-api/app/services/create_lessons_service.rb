class CreateLessonsService
  attr_reader :deck, :cards

  def initialize args
    @deck = args[:deck]
    @cards = args[:cards]
  end

  def perform
    ActiveRecord::Base.transaction do
      cards.each_slice(number_cards) do |_cards|
        lesson = deck.lessons.create! 
        _cards.each do |card|
          card.update_attributes! lesson: lesson
        end
      end
    end
    deck
  end

  private
  def number_cards
    4
  end
end
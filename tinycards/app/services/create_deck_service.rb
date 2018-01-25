class CreateDeckService
	attr_reader :deck

	def perform current_user, params
		ActiveRecord::Base.transaction do
			@deck = current_user.decks.create! params

      deck.cards.each_slice(number_cards) do |cards|
        lesson = deck.lessons.create! 
      	cards.each do |card|
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
class CreateDeckService
	attr_reader :deck

	def perform current_user, params
		ActiveRecord::Base.transaction do
			@deck = current_user.decks.create! params
      CreateLessonsService.new(deck: @deck, cards: @deck.cards).perform
	  end
    deck
	end
end
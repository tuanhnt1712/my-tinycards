class UpdateDeckService
	attr_reader :deck, :params

	def initialize args
	 @params = args[:params]
	 @deck = args[:deck]
  end

	def perform
		ActiveRecord::Base.transaction do
			deck.update_attributes! params
	  end
    deck
	end
end
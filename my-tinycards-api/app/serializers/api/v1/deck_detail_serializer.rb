class Api::V1::DeckDetailSerializer < Api::V1::DeckSerializer
	attributes :favorited
	def favorited
	  scope.favorites.exists? deck_id: object.id
	end
end

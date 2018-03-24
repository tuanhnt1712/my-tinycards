class Api::V1::DeckDetail::DeckDetailSerializer < Api::V1::DeckSerializer
  attributes :favorited
  has_many :lessons, serializer: Api::V1::DeckDetail::LessonSerializer, scope: -> {scope}

  def favorited
    scope.favorites.exists? deck_id: object.id
  end
end

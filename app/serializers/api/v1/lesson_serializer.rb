class Api::V1::LessonSerializer < ActiveModel::Serializer
  attributes :id, :deck_id
  belongs_to :deck, serializer: Api::V1::DeckSerializer
  has_many :cards, serializer: Api::V1::CardSerializer
end

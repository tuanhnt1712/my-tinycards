class Api::V1::ListDeckSerializer
  attr_reader :decks

  def initialize args
    @decks = args[:decks]
  end

  def generate
    {
      current_page: decks.current_page,
      count: decks.size,
      total_pages: decks.total_pages,
      total_count: decks.total_count,
      decks: ActiveModelSerializers::SerializableResource.new(decks,
        each_serializer: Api::V1::DeckSerializer)
    }
  end
end
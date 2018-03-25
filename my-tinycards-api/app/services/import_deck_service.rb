class ImportDeckService
  attr_reader :deck, :maps, :decks, :params, :current_user

  def initialize args
    @params = args[:params]
    @current_user = args[:current_user]
    @decks = []
    @maps = {
      deck_front: {column: "Desk", index: nil},
      card_front: {column: "Side 1.1", index: nil},
      card_front_2: {column: "Side 1.2", index: nil},
      card_front_3: {column: "Side 1.3", index: nil},
      card_front_4: {column: "Side 1.4", index: nil},
      card_front_4_url: {column: "Side 1.4 Url", index: nil},
      card_back: {column: "Side 2.1", index: nil}
    }
  end

  def perform
    path = Rails.root.join("my-tinycards.json")
    session = GoogleDrive::Session.from_service_account_key(path)

    url = params[:file_url] 
    
    spreadsheet = session.spreadsheet_by_url(url)
    ActiveRecord::Base.transaction do
    
      worksheet = spreadsheet.worksheets.each do |worksheet|
        maps.transform_values do |item|
          index = worksheet.rows.first.index do |x|
            x.casecmp(item[:column]) == 0 
          end
          item.merge!(index: index)
        end
        worksheet.rows.each_with_index do |row, index|
          next if index.zero?
          deck = current_user.decks.find_or_create_by title: row[maps[:deck_front][:index]], 
            description: row[maps[:deck_front][:index]]

          decks << deck
          deck.cards.create(card_attributes row)
          puts "#{card_attributes row}"
        end
      end
      decks.uniq.each do |deck|
        CreateLessonsService.new(deck: deck, cards: deck.no_lesson_cards).perform
      end
    end
  end

  private
  def card_attributes row
    {
      front: row[maps[:card_front][:index]],
      back: row[maps[:card_back][:index]],
      remote_picture_url: URI.encode(row[maps[:card_front_4_url][:index]])
    }
  end
end

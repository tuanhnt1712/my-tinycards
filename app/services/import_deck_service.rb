class ImportDeckService
  attr_reader :deck, :maps, :decks, :hash_decks, :params, :current_user

  def initialize args
    @params = args[:params]
    @current_user = args[:current_user]
    @decks = []
    @hash_decks = {}
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
          title = row[maps[:deck_front][:index]]
          next if index.zero? || title.blank?
          title = title.to_s.strip
          deck = current_user.decks.find_or_initialize_by title: title

          decks << deck
          if hash_decks[title].blank?
            hash_decks[title] = deck
          end
          hash_decks[title].cards << deck.cards.new(card_attributes row)
          puts "#{card_attributes row}"
        end
      end

      hash_decks.values.map &:save
      decks.uniq.each do |deck|
        CreateLessonsService.new(deck: deck, cards: deck.no_lesson_cards).perform
      end
    end
  end

  private
  def card_attributes row
    image_url = row[maps[:card_front_4_url][:index]]
    if image_url.present? && image_url.split(".").last.downcase.in?(%w(jpg jpeg gif png))
      {
        front: row[maps[:card_front][:index]],
        back: row[maps[:card_back][:index]],
        remote_picture_url: URI.encode(row[maps[:card_front_4_url][:index]])
      }
      else
      {
        front: row[maps[:card_front][:index]],
        back: row[maps[:card_back][:index]],
        source_url: row[maps[:card_front_4_url][:index]]
      }
    end
  end
end

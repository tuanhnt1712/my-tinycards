class Dashboard
  attr_reader :type
  def initialize args ={}
     @type = args[:type] || "week"
  end

  def range
    case type
    when "week"
      -6..0
    when "month"
      -29..0
    end
  end

  def dates
    range.to_a.map do |day|
      I18n.l day.days.after, format: :short
    end
  end

  def users
    range.to_a.map do |day|
      User.created_at_day(day.days.after).order(create_at: :desc).count
    end
  end

  def decks
    range.to_a.map do |day|
      Deck.created_at_day(day.days.after).order(create_at: :desc).count
    end
  end

  def cards
    range.to_a.map do |day|
      Card.created_at_day(day.days.after).order(create_at: :desc).count
    end
  end
end

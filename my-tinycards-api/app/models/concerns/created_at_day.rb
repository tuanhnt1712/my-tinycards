module CreatedAtDay
  extend ActiveSupport::Concern

  included do
    scope :created_between, -> start_date, end_date do
      where("created_at >= ? AND created_at <= ?", start_date, end_date )
    end
    scope :created_at_day, -> day do
      created_between(day.beginning_of_day, day.end_of_day)
    end
  end
end

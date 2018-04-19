class AddIsAdvanceColumnToDecksTable < ActiveRecord::Migration[5.1]
  def change
    add_column :decks, :is_advance, :boolean, default: false
  end
end

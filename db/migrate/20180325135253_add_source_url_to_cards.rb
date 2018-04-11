class AddSourceUrlToCards < ActiveRecord::Migration[5.0]
  def change
    add_column :cards, :source_url, :string
  end
end

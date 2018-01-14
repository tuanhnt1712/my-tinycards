class CreateDecks < ActiveRecord::Migration[5.0]
  def change
    create_table :decks do |t|
      t.references :user, foreign_key: true
      t.string :cover_image
      t.string :title
      t.string :description

      t.timestamps
    end
  end
end

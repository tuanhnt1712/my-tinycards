class CreateDecks < ActiveRecord::Migration[5.0]
  def change
    create_table :decks do |t|
      t.references :user, foreign_key: true
      t.string :cover_image
      t.string :string
      t.string :title
      t.string :string
      t.string :description
      t.string :text

      t.timestamps
    end
  end
end

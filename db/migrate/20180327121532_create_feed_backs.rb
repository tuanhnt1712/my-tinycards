class CreateFeedBacks < ActiveRecord::Migration[5.0]
  def change
    create_table :feed_backs do |t|
      t.integer :status
      t.references :deck, foreign_key: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end

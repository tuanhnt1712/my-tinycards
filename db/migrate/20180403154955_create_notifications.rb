class CreateNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :notifications do |t|
      t.references :admin
      t.references :feed_back
      t.integer :status

      t.timestamps
    end
  end
end

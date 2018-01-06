class AddAuthTokenToUsers < ActiveRecord::Migration[5.1]
  def self.up
    change_table :users do |t|
      t.string :authentication_token
    end

    add_index  :users, :authentication_token, :unique => true
  end

  def self.down
    remove_column :users, :authentication_token
  end
end

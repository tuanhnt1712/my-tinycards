class AddPracticeAtToUserLessons < ActiveRecord::Migration[5.1]
  def change
    add_column :user_lessons, :practice_at, :datetime
  end
end

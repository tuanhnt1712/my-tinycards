class AddColumnLessonToCards < ActiveRecord::Migration[5.0]
  def change
    add_reference :cards, :lesson, foreign_key: true
  end
end

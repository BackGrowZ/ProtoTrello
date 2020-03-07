class CreateListes < ActiveRecord::Migration[5.1]
  def change
    create_table :listes do |t|
      t.string :label
      t.string :key
      t.string :board
      t.string :position

      t.timestamps
    end
  end
end

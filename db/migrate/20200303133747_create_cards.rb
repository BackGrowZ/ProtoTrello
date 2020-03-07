class CreateCards < ActiveRecord::Migration[5.1]
  def change
    create_table :cards do |t|
      t.string :label
      t.string :key
      t.string :liste
      t.string :board
      t.string :position

      t.timestamps
    end
  end
end

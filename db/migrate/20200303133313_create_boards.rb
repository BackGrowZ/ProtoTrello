class CreateBoards < ActiveRecord::Migration[5.1]
  def change
    create_table :boards do |t|
      t.string :label
      t.string :key
      t.string :owner

      t.timestamps
    end
  end
end

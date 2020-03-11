class AddOwnerToCards < ActiveRecord::Migration[5.1]
  def change
    add_column :cards, :owner, :string
  end
end

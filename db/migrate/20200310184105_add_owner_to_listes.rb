class AddOwnerToListes < ActiveRecord::Migration[5.1]
  def change
    add_column :listes, :owner, :string
  end
end

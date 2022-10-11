class AddGamesToList < ActiveRecord::Migration[7.0]
  def change
    add_column :lists, :games, :string, array: true
  end
end

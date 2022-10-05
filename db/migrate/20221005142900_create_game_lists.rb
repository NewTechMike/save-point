class CreateGameLists < ActiveRecord::Migration[7.0]
  def change
    create_table :game_lists do |t|
      t.integer :game_id
      t.integer :list_id

      t.timestamps
    end
  end
end

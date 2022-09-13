class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :title
      t.string :platform
      t.string :genre
      t.date :release_date
      t.text :cover_art

      t.timestamps
    end
  end
end

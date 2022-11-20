class GameList < ApplicationRecord
  belongs_to :game
  belongs_to :list

  validates :game_id, presence: true, uniqueness: true

end 

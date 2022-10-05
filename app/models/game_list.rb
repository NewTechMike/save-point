class GameList < ApplicationRecord
  belongs_to :game
  belongs_to :list
end

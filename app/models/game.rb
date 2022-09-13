class Game < ApplicationRecord
  has_many :users through :user_games
  has_many :user_games
end

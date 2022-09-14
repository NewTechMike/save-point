class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games

  valdates :title, presence: true
end

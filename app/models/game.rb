class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games

  has_many :game_lists
  has_many :lists through: :game_lists

  validates :title, presence: true
end

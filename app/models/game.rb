class Game < ApplicationRecord
  has_many :user_games
  has_many :users, through: :user_games

  validates :title, presence: true
end

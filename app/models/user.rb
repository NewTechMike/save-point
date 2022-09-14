class User < ApplicationRecord
  has_secure_password
  
  has_many :user_games
  has_many :games, through: :user_games

  validates :username, :password, :password_confirmation, presence: true
end

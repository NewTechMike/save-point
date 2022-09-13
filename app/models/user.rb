class User < ApplicationRecord
  has_secure_password
  
  has_many :games, through :user_games
  has_many :user_games
end

class List < ApplicationRecord
  belongs_to :user
  has_many :game_lists
  has_many :games, through: :game_lists
end

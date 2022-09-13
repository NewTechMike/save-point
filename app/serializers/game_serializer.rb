class GameSerializer < ActiveModel::Serializer
  attributes :id, :title, :platform, :genre, :release_date, :cover_art
end

class GameListSerializer < ActiveModel::Serializer
  attributes :id, :list_name, :game_id, :list_id
end

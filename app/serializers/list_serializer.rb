class ListSerializer < ActiveModel::Serializer
  attributes :id, :list_name, :user_id#, :game_id, :title, :string, :platform, :string
end

class ListSerializer < ActiveModel::Serializer
  attributes :id, :list_name, :user_id, :games
end

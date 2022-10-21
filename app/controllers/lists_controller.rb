class ListsController < ApplicationController

  def create
    user = User.find_by(id: session[:user_id])
    if user
      list = user.lists.create(list_name: params[:list_name])
      render json: list, status: :created
    else
      render json: { error: list.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def index
    render json: List.all
  end 


  def show 
    list = List.find_by(id: params[:list_id])
    if list
      render json: list
    else
      render json: {errors: "Not Found"}, status: :not_found
    end 
  end 

 def add_game_to_list
  list = List.find_by(id: params[:list_id])
  game = Game.find_by(id: params[:game_id])
  if list && game
    list.games << game
    render json: list.games, status: :added
  else
    render json: {errors: "Not found"}, status: :not_found
  end
end

def show_games_in_list
  list = List.find_by(id: params[:list_id])
  game = Game.find_by(id: params[:game_id])
  if list && game
    render json: list.games
  else
    render json: {errors: "Not found"}, status: :not_found
  end
end

def remove_game_from_list
  list = List.find_by(id: params[:list_id])
  game = Game.find_by(id: params[:game_id])
  if list && game
    list.delete(game)
    render json: list, status: :delete
  else
    render json: {errors: "Not Found"}, status: :not_found
  end
end

end

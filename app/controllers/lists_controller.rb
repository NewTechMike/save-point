class ListsController < ApplicationController

  def create
    user = User.find_by(id: session[:user_id])
    if user
      list1 = user.lists.create(list_name: "Want to Play")
      list2 = user.lists.create(list_name: "Started Playing")
      list3 = user.lists.create(list_name: "To Replay")
      #byebug
      render json: user.lists.all, status: :created
    else
      render json: { error: list.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def index
    user = User.find_by(id: session[:user_id])
    byebug
    if user
      render json: user.lists.all
    else
      render json: {errors: "Not Found"}, status: :not_found
    end 
  end 


  def show 
    user = User.find_by(id: params[:user_id])
    if user
      render json: user.lists.find_by(id: params[:list_id])
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

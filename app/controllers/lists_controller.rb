class ListsController < ApplicationController

  def create
    user = User.find_by(id: session[:user_id])
    if user
      list1 = user.lists.create(list_name: "Want to Play")
      list2 = user.lists.create(list_name: "Started Playing")
      list3 = user.lists.create(list_name: "To Replay")
      render json: user.lists.all, status: :created
    else
      render json: { error: list.errors.full_messages }, status: :unprocessable_entity
    end 
  end

  def index
    user = User.find_by(id: session[:user_id])
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
      render json: {errors: "not Found"}, status: :not_found
    end 
  end 

 def add_game_to_list
  user = User.find_by(id: params[:user_id])
  list = user.lists.find_by(list_name: params[:list_name])
  game = Game.create(title: params[:title], platform: params[:platform], genre: params[:genre], release_date: params[:release_date])
  #byebug
  if list
    list.games << game
    render json: list.games, status: :accepted
  else
    render json: {errors: "Not found"}, status: :not_found
  end
end

def show_games_in_list
  user = User.find_by(id: params[:user_id])
  list = user.lists.find_by(id: params[:list_id])
  if list 
    render json: list.games
  else
    render json: {errors: "Not found"}, status: :not_found
  end
end

def remove_game_from_list
  list = List.find_by(id: params[:list_id])
  game = Game.find_by(id: params[:game.id])
  if list && game
    list.delete(game)
    render json: list, status: :delete
  else
    render json: {errors: "not Found"}, status: :not_found
  end
end

end

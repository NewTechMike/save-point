class ListsController < ApplicationController

  def create
    user = User.find_by(id: session[:user_id])
    if user
      list = user.list.create(list_name: params[:list_name])
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
      render json: { "Not Found"}, status: :not_found
    end 
    
  end 

end

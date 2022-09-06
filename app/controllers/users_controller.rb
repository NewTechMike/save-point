class UsersController < ApplicationController

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user
    else 
      render json: { error: "Not Authorized"}, status: :unauthorized  
    end 
  end 

  def index
    render json: User.all
  end 
end

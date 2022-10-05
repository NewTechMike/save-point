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

  def create
    user = User.create!(user_params)
    if user
      session[:user_id] = user.id
      render json: user, status: :created
    else 
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end 

  def update
    user = User.find_by(id: session[:user_id])
    byebug
    if user
      lab = user.update(location: params[:location], bio: params[:bio])
      render json: update, status: :created
    else 
      render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  private

  def user_params
    params.permit(:username, :password, :password_confirmation)
  end 
end

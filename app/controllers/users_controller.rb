class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response
  #skip_before_action :authorize, only: [:create]

  def show
    if current_user
      #byebug
      render json: current_user
    else 
      render json: { error: "Not Authorized"}, status: :unauthorized  
    end 
  end 

  def index
    render json: User.all
  end 

  def create
    user = User.create!(user_params)
    if user.valid?
      session[:user_id] = user.id
      render json: user, status: :created
    else 
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end 

  def update
    #user = User.find_by(id: params[:user_id])
    current_user
    if current_user
      current_user.update(location: params[:location], bio: params[:bio])
     # byebug
      render json: current_user, status: :created
    else 
      render json: {errors: current_user.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  private

  def current_user
    return User.find_by(id: session[:user_id])
  end 

  def user_params
    params.permit(:username, :password, :password_confirmation, :location, :bio)
  end 

  def render_record_invalid_response(e)
    return render json: { errors: e.record.errors.full_messages }, status: :unprocessable_entity
  end
end

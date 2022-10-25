class UsersController < ApplicationController
  rescue_from ActiveRecord::RecordInvalid, with: :render_record_invalid_response

  def show
    if current_user
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
    if current_user
      current_user.update(location: params[:location], bio: params[:bio])
      render json: current_user, status: :created
    else 
      render json: {errors: current_user.errors.full_messages}, status: :unprocessable_entity
    end 
  end 

  def destroy_bio
    current_user.update(bio: "")
    head :no_content
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

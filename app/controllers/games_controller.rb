class GamesController < ApplicationController

  def create 
    game = Game.create!(game_params)
    if game
      render json: game, status: :created
    else
      render json: { error: game.erros.full_messages }, status: :unprocessable_entity
    end 
  end 

  def index
    render json: Game.all
  end 

  def show
    if this_game
      render json: game
    else
      render json: { error: "Game Not Found"}, status: :not_found
    end 
  end 

  def update
    if this_game
      this_game.update(game_params)
      render json: this_game
    else 
      render json: { error: "Game Not Found" }, status: :not_found
    end 
  end 

  def destroy
    this_game.destroy
    head :no_content
  end

  private

  def this_game
    return game = Game.find_by(id: params[:id])
  end 

  def game_params
    params.permit(:title, :platform, :genre, :release_date, :cover_art)
  end 
  
end

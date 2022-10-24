Rails.application.routes.draw do
  resources :game_lists
  resources :lists
  resources :user_games
  resources :games
  resources :users, only: [:create, :show, :index, :destroy, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/me', to: "users#show"
  patch '/me', to: "users#update"
  post '/me', to: "users#update"
  
  delete '/me/:user_id', to: "users#destroy_bio"
  
  post '/lists/:user_id', to: "lists#create"
  patch ':user_id/lists/:list_name', to: "lists#add_game_to_list"
  get ':user_id/lists/:list_id', to: "lists#show_games_in_list"
  delete ':user_id/lists/:list_name/:game_id', to: "lists#remove_game_from_list"

  post '/signup', to: "users#create"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  get '/hello', to: "application#hello_world"
end

Rails.application.routes.draw do
  resources :game_lists
  resources :lists
  resources :user_games
  resources :games
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  #patch '/me', to: "users#create_loc_and_bio"
  # Defines the root path route ("/")
  # root "articles#index"
  get '/me', to: "users#show"
  post '/lists', to: "lists#add_game_to_list"
  post '/lists', to: "lists#show_games_in_list"

  post '/signup', to: "users#create"
  post '/login', to: "sessions#create"
  delete '/logout', to: "sessions#destroy"
  get '/hello', to: "application#hello_world"
end

Rails.application.routes.draw do
  devise_for :users
  root "home#index"

  resources :decks
  resources :lessons

  get "/profile", to: "users#show"
end

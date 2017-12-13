Rails.application.routes.draw do
  devise_for :users
  root "home#index"

  resources :decks
  get "/profile", to: "users#index"
end

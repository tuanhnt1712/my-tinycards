require "api_constraints"

Rails.application.routes.draw do
  use_doorkeeper
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :alive, only: :show
  namespace :api, defaults: {format: "json"} do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      resources :decks
      resources :user_lessons
      resources :lessons, only: :show
      resources :relationships, only: [:create, :destroy]

      namespace :auth do
        resources :users, only: [:create, :update, :show]
        put "confirm", to: "users#update"
        post "facebook", to: "facebook#facebook"
        post "sign_in", to: "sessions#create"
        post "sign_out", to: "logout#revoke"
        put "send_reset_password_token", to: "send_reset_password_token#update"
        put "validate_reset_password_token", to: "reset_password#validate_token"
        put "reset_password", to: "reset_password#update"
        put "change_password", to: "change_password#update"
      end
    end
  end
end

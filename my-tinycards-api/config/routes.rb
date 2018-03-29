require "api_constraints"

Rails.application.routes.draw do

  devise_for :admins, controllers: {
    sessions: 'admins/sessions'
  }

<<<<<<< e11b7dd421a59ab607ca89ebf6cf8929ad9d0a42
  root to: redirect('/admins/dashboards')

  namespace :admins do
    root "dashboards#index"
    resources :users, only: [:index, :show, :destroy]
    resources :decks, only: [:index, :show, :destroy]
    resources :feed_backs
    resources :dashboards
  end

  use_doorkeeper
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :alive, only: :show
  namespace :api, defaults: {format: "json"} do
    scope module: :v1, constraints: ApiConstraints.new(version: 1, default: true) do
      resources :decks
      resources :user_lessons
      namespace :favorite do
        resources :decks
      end
      namespace :following_people do
        resources :decks
      end
      namespace :trending do
        resources :decks
      end
      namespace :search do
        resources :decks
      end
      namespace :import do
        resources :decks
      end
      resources :favorites, only: [:create]
      resources :relationships, only: [:create]
      namespace :profile do
        resources :users, only: [:show]
      end
      namespace :remove do
        resources :favorites, only: [:create]
        resources :relationships, only: [:create]
      end
      resources :lessons, only: :show
      resources :feed_backs, only: [:create]

      namespace :auth do
        resources :users, only: [:create, :update, :show, :edit]
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

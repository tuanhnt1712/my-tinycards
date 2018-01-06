Rails.application.routes.draw do
  unless Rails.env.production?
    mount Rswag::Ui::Engine => "/api-docs"
    mount Rswag::Api::Engine => "/api-docs"
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resource :alive, only: :show
  mount API => "/"
end

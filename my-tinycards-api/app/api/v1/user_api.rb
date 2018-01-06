class V1::UserAPI < Grape::API
  resource :users do
    desc "Users login API"
    params do
      requires :id_login, type: String
      requires :password, type: String
    end
    post :login do
      user = User.find_by(id_login: params.id_login).try :authenticate, params.password
      raise APIError::Unauthorized unless user
      {token: V1::UserTokenSerializer.new(user.user_tokens.generate)}
    end

    desc "signup"
    params do
      requires :name, type: String
      requires :email, type: String
      requires :password, type: String
      requires :password_confirmation, type: String
    end
    post :signup do
      user = User.create!({
        name: params[:name],
        email: params[:email],
        password: params[:password],
        password_confirmation: params[:password_confirmation]
        })
    end
  end
end
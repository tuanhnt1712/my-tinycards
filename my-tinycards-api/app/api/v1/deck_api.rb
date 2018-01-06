class V1::DeckAPI < Grape::API
  # helpers do
  #   def current_user
  #     @current_user ||= User.authorize!(env)
  #   end

  #   def authenticate!
  #     error!('401 Unauthorized', 401) unless current_user
  #   end
  # end

  resource :decks do

    before{authenticate!}
  
    desc "get all decks"
    get do
      Deck.all
    end

    desc "add a deck"
    params do
      # requires :id, type: Integer
      requires :title, type: String
      requires :description, type: String
    end
    post do
      Deck.create!({
        user_id: 1,
        title: params[:title],
        description: params[:description]
      })
    end

    route_param :id do
      desc "get a deck"
      get do
        Deck.find_by id: params[:id]
      end

      desc "Update a deck"
      params do
        requires :title, type: String
        requires :description, type: String
      end
      put do
        # authenticate!
        User.first.decks.find(params[:id]).update!({
          user_id: 1,
          title: params[:title],
          description: params[:description]
        })
      end

      desc "Delete a deck"
      delete do
        User.first.decks.find(params[:id]).destroy
      end
    end

  end
end

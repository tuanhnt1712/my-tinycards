# module Decks
#   class DecksAPI < Grape::API
#     format :json

#     desc "Deck List", {
#       :notes => <<-NOTE
#       GET ALL Products
#       _______________
#       NOTE
#     }

#     get do
#       Deck.all
#     end

#     desc "Create Product", {
#         :notes => <<-NOTE
#         Create Product
#          __________________
#         NOTE
#     }

#     params do
#       requires :description, type: String, desc: "Deck description"
#       requires :cover_image, type: String, desc: "Deck cover"
#       requires :title, type: String, desc: "Deck title"
#     end

#     post do
#       begin
#         deck = Product.create({
#           description: params[:description],
#           cover_image: params[:cover_image],
#           title: params[:title]
#         })
#         if product.save
#           { status: :success }
#         else
#           error!({ status: :error, message: deck.errors.full_messages.first }) if deck.errors.any?
#         end


#       rescue ActiveRecord::RecordNotFound
#         error!({ status: :error, message: :not_found }, 404)
#       end
#     end
#   end
# end

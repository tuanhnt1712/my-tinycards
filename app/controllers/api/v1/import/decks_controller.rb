class Api::V1::Import::DecksController < Api::V1::AuthorizeController
  def create
    ImportDeckService.new(current_user: current_user, params: params).perform
    render_success
  end 
end

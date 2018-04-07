class Api::V1::Auth::LinkFacebooksController < Api::V1::AuthorizeController
  validate_params on: :create, require: [:access_token]

  def create
    data = Authenticates::LinkFacebookService.new(params[:access_token], current_user).perform
    render_success data: data
  end

  def update
    current_user.update_attributes! facebook_long_access_token: nil
    render_success
  end
end

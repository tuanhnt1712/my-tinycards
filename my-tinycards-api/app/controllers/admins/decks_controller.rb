class Admins::DecksController < ApplicationController
  before_action :authenticate_admin!
  layout "admin"

  def index
    @decks = Deck.all
    respond_to do |format|
      format.html
      format.csv {send_data @decks.to_csv}
      format.xls {send_data @decks.to_csv(col_sep: "\t")}
    end
  end

  def show
    @deck = Deck.find(params[:id])
  end

  def destroy
    @deck = Deck.find(params[:id])
    if @deck.destroy
      respond_to do |format|
        format.html do
          redirect_to admins_root_url
        end
        format.js
      end
    else
      redirect_to admins_root_url
    end
  end
end

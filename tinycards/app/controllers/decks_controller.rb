class DecksController < ApplicationController
  before_action :authenticate_user!

  def show
    @deck = Deck.find_by id: params[:id]
  end

  def new
    @deck = Deck.new
    @deck.cards.build
  end

  def create
    @deck = current_user.decks.build deck_params
    if @deck.save
      redirect_to @deck
    else
      render :new
    end
  end

  private

  def deck_params
    params.require(:deck).permit Deck::ATTRIBUTE_PARAMS
  end
end

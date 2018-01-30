class DecksController < ApplicationController
  before_action :authenticate_user!

  def show
    @deck = Deck.find_by id: params[:id]
    @cards = @deck.cards
    @lessons = @deck.lessons
  end

  def new
    @deck = Deck.new
    @deck.cards.build
  end

  def create
    if @deck = ::CreateDeckService.new.perform(current_user, deck_params)
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

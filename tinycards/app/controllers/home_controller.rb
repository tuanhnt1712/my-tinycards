class HomeController < ApplicationController
  def index
    @decks = Deck.all
  end
end

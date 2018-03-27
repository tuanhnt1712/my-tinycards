class Api::V1::DecksController < Api::V1::AuthorizeController
  def index
    decks = Deck.all.page(params[:page])
    render_success data: Api::V1::ListDeckSerializer.new(decks: decks).generate
  end

  def edit
    @deck = Deck.find params[:id]
    render_success data: Api::V1::DeckDetail::DeckDetailSerializer.new(@deck, scope: current_user)
  end

  def update
    @deck = Deck.find(params[:id])
    ::UpdateDeckService.new(deck: @deck, params: deck_params).perform
    render_success data: Api::V1::DeckSerializer.new(@deck)
  end

  def show
    @deck = Deck.find params[:id]
    unless UserLesson.where(user: current_user, lesson_id: @deck.lessons.ids).exists?
      UserLesson.create user: current_user, lesson: @deck.lessons.first
    end
    render_success data: Api::V1::DeckDetail::DeckDetailSerializer.new(@deck, scope: current_user)
  end

  def create
    @deck = ::CreateDeckService.new.perform(current_user, deck_params)
    render_success data: Api::V1::DeckSerializer.new(@deck)
  end

  def destroy
    @deck = Deck.find params[:id]
    @deck.destroy!
  end

  private

  def deck_params
    params.permit Deck::ATTRIBUTE_PARAMS
  end
end

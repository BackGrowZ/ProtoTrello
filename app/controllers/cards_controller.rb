class CardsController < ApplicationController
  before_action :authenticate_user
  # before_action :set_cards, only: [:show, :update, :destroy]
  def index
    card = Card.order("position ASC")
    # card = Card.all
    render json: card
  end

  def create
    card = Card.create(card_param)
    render json: card
  end

  def update
    card = Card.find(params[:id])
    card.update_attributes(card_param)
    render json: card
  end

  def destroy
    card = Card.find(params[:id])
    card.destroy
    head :no_content, status: :ok
  end
  
  private
    def card_param
      params.require(:card).permit(:label, :key, :liste, :board, :position, :description)
    end
end

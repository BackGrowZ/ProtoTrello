class ListesController < ApplicationController
  before_action :authenticate_user
  # before_action :set_liste, only: [:show, :create, :update, :destroy]
  def index
    liste = Liste.order("position ASC")
    # liste = Liste.all
    render json: liste
  end

  def create
    liste = Liste.create(liste_param)
    render json: liste
  end

  def update
    liste = Liste.find(params[:id])
    liste.update_attributes(liste_param)
    render json: liste
  end

  def destroy
    liste = Liste.find(params[:id])
    liste.destroy
    head :no_content, status: :ok
  end
  
  private
    def liste_param
      params.require(:liste).permit(:label, :key, :board, :position)
    end
end

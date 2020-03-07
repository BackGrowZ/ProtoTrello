class BoardsController < ApplicationController
  before_action :authenticate_user
  def index
    board = Board.all
    render json: board
  end

  def create
    board = Board.create(board_param)
    render json: board
  end

  def update
    board = Board.find(params[:id])
    board.update_attributes(board_param)
    render json: board
  end

  def destroy
    board = Board.find(params[:id])
    board.destroy
    head :no_content, status: :ok
  end
  
  private
    def board_param
      params.require(:board).permit(:label, :key)
    end
end

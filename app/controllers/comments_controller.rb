class CommentsController < ApplicationController

  def create

  end
  private
  def comment_params
    params.require(:comment).permit(:photo_id, :content)
  end
end

class CommentsController < ApplicationController
  protect_from_forgery :except => [:create]

  def create
    new_comment = current_user.comments.build(comment_params)
    if new_comment.save
      render json: { code: 1, message: "ok"}
    else
      render json: { code: 0, message: "Can not comment now"}
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:photo_id, :content)
  end
end

class CommentsController < ApplicationController
  protect_from_forgery :except => [:create, :update, :delete]

  def create
    new_comment = current_user.comments.build(comment_params)
    if new_comment.save
      render json: { code: 1, message: "ok", id: new_comment.id }
    else
      render json: { code: 0, message: "Can not comment now" }
    end
  end

  def update
    comment = Comment.find_by(id: params[:comment][:id])
    if comment
      if comment.user_id == current_user.id
        if params[:comment][:content]
          comment[:content] = params[:comment][:content]
          if comment.save
            render json: { code: 1, message: "Comment is updated"}
          else
            render json: { code: 0, message: "Can not update comment" }
          end
        else
          render json: { code: 0, message: "Can not update comment" }
        end
      else
        render json: { code: 0, message: "Can not update comment" }
      end
    else
      render json: { code: 0, message: "Can not update comment" }
    end
  end

  def delete
    comment = Comment.find_by(id: params[:comment][:id])
    if comment
      if comment.user_id == current_user.id
        if comment.destroy
          render json: { code: 1, message: "Your comment have been deleted" }
        else
          render json: { code: 0, message: "You can not delete that comment" }
        end
      else
        render json: { code: 0, message: "You can not delete that comment" }
      end
    else
      render json: { code: 0, message: "You can not delete that comment" }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:photo_id, :content)
  end
end

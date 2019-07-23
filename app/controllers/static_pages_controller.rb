class StaticPagesController < ApplicationController
  before_action :sign_in?, only: [:home, :show]

  def home
    @new_photo = Photo.new()
  end

  def show
    @user = current_user
  end

  def user_generate
    @users = User.all.limit(6)
    render json: @users
  end

  def get_current_user
    if user_signed_in?
      render json: current_user
    else
      render json: { code: 0, message: "User is not signed" }
    end
  end

  private

  def sign_in?
    redirect_to sign_in_path unless user_signed_in?
  end

end

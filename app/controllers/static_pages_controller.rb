class StaticPagesController < ApplicationController
  before_action :sign_in?

  def home
    @new_photo = Photo.new()
    @photos = Photo.all.limit(6)
  end

  def user_generate
    @users = User.all.limit(6)
    render json: @users
  end

  private
  def sign_in?
    redirect_to sign_in_path unless user_signed_in?
  end


end

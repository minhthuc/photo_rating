class RatesController < ApplicationController
  protect_from_forgery :except => [:create]
  before_action :sign_in?
  def create
    photo_id = params[:photo_id]
    rating = params[:rating]
    photo = Photo.find_by(id: photo_id)
    result = current_user.vote(photo, rating)
    render json: result
  end

  private
  def sign_in?
    redirect_to sign_in_path unless user_signed_in?
  end
end

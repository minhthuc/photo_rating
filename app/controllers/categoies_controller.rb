class CategoiesController < ApplicationController
  protect_from_forgery :except => [:create]

  def index
  end

  def create
    if user_signed_in?
      category = Category.new(category_param)
      if category.save
        render json: { code: 1, message: "success!" }
      else
        render json: { code: 0, message: "fail" }
      end
    else
      render json: { code: 0, message: "fail" }
    end
  end

  def get_categories
    categories = Category.all
    render json: categories
  end

  def get_image_by_category
    current_category = Category.find_by(id: params[:id])
    photos = []
    _photos = current_category.photos
    _photos.each do |photo|
      hash = Hash.new
      email = photo.user.email
      hash[photo.id] = photo.attributes
      hash[photo.id][:user_email] = email
      photos.push(hash[photo.id])
    end
    render json: photos
  end

  private

  def category_param
    params.require(:category).permit(:code, :name)
  end
end

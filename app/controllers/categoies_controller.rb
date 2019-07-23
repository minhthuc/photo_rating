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
    end
  end

  def get_categories
    categories = Category.all
    render json: categories
  end

  def get_image_by_category
    current_category = Category.find_by(params[:id])
    photos = current_category.photos
    render json: photos
  end

  private

  def category_param
    params.require(:category).permit(:code, :name)
  end

end

class StaticPagesController < ApplicationController
  before_action :sign_in?

  def home
    @new_photo = Photo.new()
    # @photos = []
    # @photos = Photo.all.limit(7)
    # user_hash = Hash.new
    # photos.each do |photo|
    #   unless user_hash["#{photo.user.id}"]
    #     tmp = photo.user.email
    #     user_hash["#{photo.user.id}"] = tmp
    #   end
    #   tmp_photo_hash = photo.attributes
    #   tmp_photo_hash["user_email"]= user_hash["#{photo.user.id}"]
    #   @photos.push tmp_photo_hash
    # end
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

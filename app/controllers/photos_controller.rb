class PhotosController < ApplicationController
  def show

  end

  def create
    file = photo_params[:location]
    dir = "#{Rails.root}/app/assets/images/user/#{current_user.id}/"
    Dir.mkdir(dir) unless Dir.exist?(dir)
    File.open("#{dir}/#{file.original_filename}", 'wb') do |f|
      f.write(file.read)
    end
    location = "user/#{current_user.id}/#{file.original_filename}"
    photo = current_user.photos.new(photo_params)
    photo.location = "/assets/#{location}"
    photo.save
    flash[:success] = "Your Photo upload completed"
    redirect_to root_path
  end

  def get_photos
    @photos = []
    photos = Photo.all.limit(7)
    user_hash = Hash.new
    photos.each do |photo|
      comments = photo.comments.limit(3).reverse
      unless user_hash["#{photo.user.id}"]
        tmp = photo.user.email
        user_hash["#{photo.user.id}"] = tmp
      end
      tmp_photo_hash = photo.attributes
      tmp_photo_hash["user_email"]= user_hash["#{photo.user.id}"]
      tmp_photo_hash["comments"] = comments
      @photos.push tmp_photo_hash
    end
    render json: @photos
  end
  private
  def photo_params
    params.require(:new_photo).permit(:title, :description, :location)
  end
end

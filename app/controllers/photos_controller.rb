class PhotosController < ApplicationController
  def create
    file = photo_params[:location]
    dir = "#{Rails.root}/app/assets/images/user/#{current_user.id}/"
    Dir.mkdir(dir) unless Dir.exist?(dir)
    File.open("#{dir}/#{file.original_filename}", 'wb') do |f|
      f.write(file.read)
    end
    location = "user/#{current_user.id}/#{file.original_filename}"
    photo = current_user.photos.new(photo_params)
    photo.location = location
    photo.save
    redirect_to root_path
  end
  private
  def photo_params
    params.require(:new_photo).permit(:title, :description, :location)
  end
end

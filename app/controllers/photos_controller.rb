class PhotosController < ApplicationController
  NO_COMENT = "nc"

  before_action :get_photo, only: [:show, :find_photo]

  def show
    unless @photo
      flash[:error] = "Can not find that photo"
      redirect_to root_path
    end
  end

  def create
    file = photo_params[:location]
    dir = "#{Rails.root}/public/images/users/#{current_user.id}/"
    Dir.mkdir(dir) unless Dir.exist?(dir)
    File.open("#{dir}/#{file.original_filename}", 'wb') do |f|
      f.write(file.read)
    end
    location = "/images/users/#{current_user.id}/#{file.original_filename}"
    photo = current_user.photos.new(photo_params)
    photo.location = "#{location}"
    photo.save
    flash[:success] = "Your Photo upload completed"
    redirect_to root_path
  end

  def get_photos
    @photos = []
    limit = photo_query[:limit] ? photo_query[:limit].to_i : 6
    pages = photo_query[:pages] ? photo_query[:pages].to_i : 0
    query = photo_query[:query]
    ar = Photo.arel_table
    if query.blank?
      photos = Photo.limit(limit).offset(pages)
    else
      ar = ar[:description].matches("%#{query}%").or(ar[:title].matches("%#{query}%"))
      photos = Photo.where(ar).limit(limit).offset(pages)
    end
    user_hash = Hash.new
    photos.each do |photo|
      comments = photo.comments.limit(3).reverse unless photo_query[:options] || photo_query[:options] == NO_COMENT
      unless user_hash["#{photo.user.id}"]
        tmp = photo.user.email
        user_hash["#{photo.user.id}"] = tmp
      end
      tmp_photo_hash = { title: photo[:title], location: photo[:location],
                         description: photo[:description], score: photo[:photo_score], id: photo.id }
      tmp_photo_hash["user_email"] = user_hash["#{photo.user.id}"]
      tmp_photo_hash["comments"] = comments unless photo_query[:options] || photo_query[:options] == NO_COMENT
      @photos.push tmp_photo_hash
    end
    render json: @photos
  end

  def find_photo
    comments = @photo.comments.order(created_at: :desc)
    # byebug
    # comments = comments.attributes
    @photo = @photo.attributes
    # comments.each do |comment|
    #   comment[:owned] = current_user.id == comment.user_id
    # end
    @photo[:comments] = comments
    render json: @photo
  end

  private

  def photo_params
    params.require(:new_photo).permit(:title, :description, :location)
  end

  def photo_query
    params.require(:photos).permit(:query, :pages, :limit, :options)
  end

  def get_photo
    @photo = Photo.find_by(id: params[:photo] ? params[:photo][:id].to_i : params[:id].to_i)
  end
end

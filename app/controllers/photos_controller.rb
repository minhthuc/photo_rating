class PhotosController < ApplicationController
  NO_COMENT = "nc"

  protect_from_forgery except: [:update]

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

    if file.nil?
      flash[:error] = "You need to upload an image!"
    else
      File.open("#{dir}/#{file.original_filename}", 'wb') do |f|
        f.write(file.read)
      end
      location = "/images/users/#{current_user.id}/#{file.original_filename}"
      photo = current_user.photos.new(photo_params)
      photo.location = "#{location}"
      if photo.save
        flash[:success] = "Your Photo upload completed"
      else
        flash[:error] = "Can not push your post!"
      end
    end
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
        tmp = photo.user
        user_hash["#{photo.user.id}"] = tmp
      end
      tmp_photo_hash = { title: photo[:title], location: photo[:location],
                         description: photo[:description], score: photo[:photo_score], id: photo.id }
      tmp_photo_hash["user_email"] = user_hash["#{photo.user.id}"].email
      tmp_photo_hash["user_id"] = user_hash["#{photo.user.id}"][:id]
      tmp_photo_hash["comments"] = comments unless photo_query[:options] || photo_query[:options] == NO_COMENT
      @photos.push tmp_photo_hash
    end
    render json: @photos
  end

  def find_photo
    comments = @photo.comments.order(created_at: :desc)
    categories = @photo.categories
    @photo = @photo.attributes
    @photo[:comments] = comments
    @photo[:categories] = categories
    render json: @photo
  end

  def user_photos
    photos = Photo.where(user_id: params[:id])
    render json: photos
  end

  def update
    _params = params[:photo]
    photo = Photo.find(_params[:id])
    cat = []
    _params[:categories].each do |c|
      _cat = Category.find(c)
      cat.push(_cat)
    end
    photo.categories = cat
    if photo.save
      render json: { code: 1, message: "ok" }
    else
      render json: { code: 0, message: "fail" }
    end
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

class PhotosController < ApplicationController
  NO_COMENT = "nc"

  protect_from_forgery except: [:update, :create]

  before_action :get_photo, only: [:show, :find_photo, :create]

  SEC = 1
  MIN = 60 * SEC
  HOUR = 60 * MIN
  DAY = 24 * HOUR
  MONTH = 30 * DAY
  YEAR = 365 * DAY

  def show
    unless @photo
      flash[:error] = "Can not find that photo"
      redirect_to root_path
    end
  end

  def create
    file = params[:location]
    dir = "#{Rails.root}/public/images/users/#{current_user.id}/"
    Dir.mkdir(dir) unless Dir.exist?(dir)
    if file.nil?
      flash[:error] = "You need to upload an image!"
    else
      File.open("#{dir}/#{file.original_filename}", 'wb') do |f|
        f.write(file.read)
      end
      location = "/images/users/#{current_user.id}/#{file.original_filename}"
      photo = current_user.photos.new()
      photo.location = "#{location}"
      photo.title = params[:title]
      photo.description = params[:description]
      _categories = params[:categories].split(",")
      categories = []
      _categories.each do |cat|
        _category = Category.find(cat)
        categories.push(_category)
      end
      if photo.save
        photo.categories = categories
        if photo.save
          render json: { code: 1, message: "Your post is created!", photo: photo }
        else
          render json: { code: 0, message: "Your post is not created!" }
        end
      else
        render json: { code: 0, message: "Your post is not created!" }
      end
    end
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
    now = Time.now
    photos.each do |photo|
      comments = photo.comments.limit(3).reverse unless photo_query[:options] || photo_query[:options] == NO_COMENT

      unless user_hash["#{photo.user.id}"]
        tmp = photo.user
        user_hash["#{photo.user.id}"] = tmp
      end
      tmp_photo_hash = { title: photo[:title], location: photo[:location],
                         description: photo[:description], score: photo[:photo_score], id: photo.id }
      time = time_ago_in_word(photo.created_at, now)
      tmp_photo_hash["user_email"] = user_hash["#{photo.user.id}"].email
      tmp_photo_hash["user_id"] = user_hash["#{photo.user.id}"][:id]
      tmp_photo_hash["comments"] = comments unless photo_query[:options] || photo_query[:options] == NO_COMENT
      tmp_photo_hash["created"] = time
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

  def time_ago_in_word frist, second
    x = second - frist
    x = x.to_i
    case x
    when 0..SEC
      "now"
    when SEC..MIN
      "a min ago"
    when MIN..HOUR
      "#{(x / MIN).to_i} mins ago"
    when HOUR..DAY
      "#{(x / HOUR).to_i} hours ago"
    when DAY..MONTH
      "#{(x / DAY).to_i} days ago"
    when MONTH..YEAR
      "#{(x / MONTH).to_i} months ago"
    else
      "#{(x / YEAR).to_i} years ago"
    end
  end

end

class User < ActiveRecord::Base
  has_many :comments, dependent: :destroy
  has_many :rates
  has_many :photos
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  def vote photo, score
    vote = rates.find_or_initialize_by photo_id: photo.id
    vote.score = score
    if vote.save
      photo.is_update_score = false
    end
    photo.get_score
  end
end

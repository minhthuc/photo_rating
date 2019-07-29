class Photo < ActiveRecord::Base
  MAX_LENG_TITLE = 120
  MAX_LENG_CONTENT = 1000

  has_many :comments, dependent: :destroy
  has_many :rates, dependent: :destroy
  has_many :categori_photos
  has_many :categories, through: :categori_photos
  belongs_to :user

  validates :title, length: { maximum: MAX_LENG_TITLE }, presence: true
  validates :description, length: { maximum: MAX_LENG_CONTENT }, presence: true
  validates :location, presence: true

  default_scope -> { order('created_at DESC') }

  def category(category, photo)
    CategoriPhoto.new(photo_id: photo.id, category_id: category.id).save!
  end

  def get_score
    if is_update_score
      photo_score
    else
      rates = self.rates
      score = rates.empty? ? 0 : rates.average(:score)
      self.photo_score = score
      self.is_update_score = true
      save
      score
    end
  end
end

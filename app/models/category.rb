class Category < ActiveRecord::Base
  MAX_LENGTH_NAME = 50
  MAX_LENGTH_CODE = 10

  has_many :categori_photos
  has_many :photos, through: :categori_photos

  validates :name, presence: true, length: { maximum: MAX_LENGTH_NAME }
  validates :code, presence: true, length: { maximum: MAX_LENGTH_CODE }
end

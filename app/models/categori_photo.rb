class CategoriPhoto < ActiveRecord::Base
  belongs_to :photo
  belongs_to :category

  validates :photo_id, presence: true
  validates :category_id, presence: true
end

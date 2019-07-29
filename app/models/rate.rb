class Rate < ActiveRecord::Base
  MAX_SCORE = 5
  MIN_SCORE = 0

  belongs_to :photo
  belongs_to :user

  validates :score, numericality: { greater_than_or_equal_to: MIN_SCORE,
    less_than_or_equal_to: MAX_SCORE,
    message: "You can not vote greater than #{MAX_SCORE} or less than #{MIN_SCORE}" }
  validates :user_id, presence: true
  validates :photo_id, presence: true
end

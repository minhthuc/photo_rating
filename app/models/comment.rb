class Comment < ActiveRecord::Base
  MAX_LENGTH_CONTENT = 255

  belongs_to :user
  belongs_to :photo

  validates :content, length: {maximum: MAX_LENGTH_CONTENT}
end

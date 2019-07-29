class Comment < ActiveRecord::Base
  MAX_LENGTH_CONTENT = 255

  belongs_to :user
  belongs_to :photo

  default_scope -> { order('created_at DESC') }

  validates :content, length: { maximum: MAX_LENGTH_CONTENT }
end

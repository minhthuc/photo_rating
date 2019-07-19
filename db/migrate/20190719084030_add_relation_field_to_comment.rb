class AddRelationFieldToComment < ActiveRecord::Migration
  def change
    add_column :comments, :user_id, :integer
    add_column :comments, :photo_id, :integer
  end
  add_index :comments, %i[photo_id user_id]
end

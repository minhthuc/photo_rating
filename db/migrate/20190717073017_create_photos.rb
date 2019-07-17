class CreatePhotos < ActiveRecord::Migration
  def change
    create_table :photos do |t|
      t.string :title
      t.string :description
      t.string :location
      t.timestamps null: false
      t.boolean :is_update_score, default: false
      t.float :photo_score, default: 0
      t.integer :user_id
    end
    add_index :photos, :title
    add_index :photos, :description
  end
end

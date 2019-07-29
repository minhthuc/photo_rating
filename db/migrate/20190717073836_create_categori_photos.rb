class CreateCategoriPhotos < ActiveRecord::Migration
  def change
    create_table :categori_photos do |t|
      t.references :photo, index: true, foreign_key: true
      t.references :category, index: true, foreign_key: true
      t.timestamps null: false
    end
    # add_index :categori_photos, %i[photo_id category_id], unique: true
    # add_index :categori_photos, :photo_id
    # add_index :categori_photos, :category_id
  end
end

class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :content
      t.timestamps null: false
      t.integer :photo_id
    end
  end
end

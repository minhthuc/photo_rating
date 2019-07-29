class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.string :name
      t.string :code
      t.timestamps null: false
    end
    add_index :categories, :code, unique: true
  end
end

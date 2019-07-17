class CreateRates < ActiveRecord::Migration
  def change
    create_table :rates do |t|
      t.integer :score
      t.references :photo, index: true, foreign_key: true
      t.references :user, index: true, foreign_key: true

      t.timestamps null: false
    end
    # add_index :rates, %i[photo_id user_id], unique: true
    # add_index :rates, :photo_id
    # add_index :rates, :user_id
  end
end

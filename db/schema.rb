# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190719084030) do

  create_table "categori_photos", force: :cascade do |t|
    t.integer  "photo_id"
    t.integer  "category_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "categori_photos", ["category_id"], name: "index_categori_photos_on_category_id"
  add_index "categori_photos", ["photo_id"], name: "index_categori_photos_on_photo_id"

  create_table "categories", force: :cascade do |t|
    t.string   "name"
    t.string   "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "categories", ["code"], name: "index_categories_on_code", unique: true

  create_table "comments", force: :cascade do |t|
    t.string   "content"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
    t.integer  "photo_id"
  end

  add_index "comments", ["photo_id", "user_id"], name: "index_comments_on_photo_id_and_user_id"

  create_table "photos", force: :cascade do |t|
    t.string   "title"
    t.string   "description"
    t.string   "location"
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
    t.boolean  "is_update_score", default: false
    t.float    "photo_score",     default: 0.0
    t.integer  "user_id"
  end

  add_index "photos", ["description"], name: "index_photos_on_description"
  add_index "photos", ["title"], name: "index_photos_on_title"

  create_table "rates", force: :cascade do |t|
    t.integer  "score"
    t.integer  "photo_id"
    t.integer  "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "rates", ["photo_id"], name: "index_rates_on_photo_id"
  add_index "rates", ["user_id"], name: "index_rates_on_user_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true

end

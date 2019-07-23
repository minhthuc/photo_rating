Rails.application.routes.draw do
  get 'categoies/index'
  match '/category', to: "categoies#create", via: "post"
  match "/categories/get", to: "categoies#get_categories", via: "get"
  match "/categories/get_images", to: "categoies#get_image_by_category", via: "get"

  match "/vote", to: "rates#create", via: "post"

  match "/comments", to: "comments#create", via: "post"

  match "photos", to: "photos#get_photos", via: "get"
  match "photos/create", to: "photos#create", via: "post"
  match "photo", to: "photos#find_photo", via: "get"
  match "photo/:id", to: "photos#show", via: "get"
  match "/user/photos", to: "photos#user_photos", via: "get"
  match "/photo/update", to: "photos#update", via: "post"

  root "static_pages#home"
  match "/profile", to: "static_pages#show", via: "get"
  match "/current_user", to: "static_pages#get_current_user", via: "get"
  match "/users/gets", to: "static_pages#user_generate", via: "get"
  devise_for :users
  devise_scope :user do
    # root "devise/sessions#new"
    match "/sign-in", to: "devise/sessions#new", via: "get"
    match "/sign-up", to: "devise/registrations#new", via: "get"
  end
end

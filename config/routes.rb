Rails.application.routes.draw do
  match 'photos/create', to:'photos#create', via: "post"

  root 'static_pages#home'
  match "/users/gets", to: "static_pages#user_generate", via: "get"
  devise_for :users
  devise_scope :user do
    # root "devise/sessions#new"
    match "/sign-in", to: "devise/sessions#new", via: "get"
    match "/sign-up", to: "devise/registrations#new", via: "get"
  end
end

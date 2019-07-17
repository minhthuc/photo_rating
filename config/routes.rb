Rails.application.routes.draw do
  devise_for :users
  devise_scope :user do
    root "devise/sessions#new"
    match "/sign-in", to: "devise/sessions#new", via: "get"
  end
end

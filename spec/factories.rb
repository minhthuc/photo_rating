FactoryGirl.define do
  factory :user do
    email "justanemail@gmail.com"
    password "123456"
  end

  factory :photo do
    title "hello world"
    description "this is just a descriptions"
    location "C://this/is/location"
  end

  factory :category do
    code "NT"
    name "Nghệ thuật"
  end
end

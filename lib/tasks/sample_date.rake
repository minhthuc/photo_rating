namespace :db do
  desc "Fill database with sample data"
  task populate: :environment do
    User.create!(email: "example@railstutorial.org",
                 password: "foobar")
    6.times do |n|
      name = Faker::Name.name
      email = "example-#{n + 1}@railstutorial.org"
      password = "password"
      User.create!(email: email,
                   password: password)
    end
    users = User.all.limit(7)
    10.times do
      description = Faker::Lorem.sentence(5)
      title = Faker::Lorem.sentence(3)
      location = Faker::Lorem.sentence(15)
      users.each { |user| user.photos.create!(description: description, title: title, location: location) }
    end
    photos = Photo.all
    users.each do |user|
      photos.each do |photo|
        score = rand(1..5)
        user.vote photo, score
      end
    end
  end
end

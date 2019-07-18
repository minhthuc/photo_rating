require 'spec_helper'

RSpec.describe Rate, type: :model do
  let(:user) { create :user }
  let(:photo) { user.photos.build(title: "hello world",
    location: "C://this/is/location", description: "this is just a descriptions")
  }
  before {
    user.save
    photo.save
    user.vote(photo, 5)
  }
  let(:rate) { user.rates.find_by(photo_id: photo.id)}
  subject { rate }

  it { is_expected.to respond_to :score }
  it { is_expected.to respond_to :photo_id }
  it { is_expected.to respond_to :user_id }

  context "when invalid score" do
    before { rate.score = 6 }
    it { is_expected.not_to be_valid}
  end
end

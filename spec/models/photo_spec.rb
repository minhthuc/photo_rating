require 'spec_helper'

RSpec.describe Photo, type: :model do
  let(:user) {
    create(:user)
  }
  before { user.save }

  let(:photo){
    user.photos.build(title: "hello world", location: "C://this/is/location", description: "this is just a descriptions")
  }
  before { photo.save }
  subject { photo }

  it { is_expected.to respond_to :title }
  it { is_expected.to respond_to :description }
  it { is_expected.to respond_to :location }
end

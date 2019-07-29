require 'spec_helper'

RSpec.describe Photo, type: :model do
  let(:user) {
    create(:user)
  }
  before { user.save }

  let(:photo) {
    user.photos.build(title: "hello world", location: "C://this/is/location", description: "this is just a descriptions")
  }
  before { photo.save }
  subject { photo }

  it { is_expected.to respond_to :title }
  it { is_expected.to respond_to :description }
  it { is_expected.to respond_to :location }
  it { is_expected.to respond_to :photo_score }
  it { is_expected.to respond_to :is_update_score }
  it { is_expected.to respond_to :categories }

  context "with invalid field" do
    context "when title is not presend" do
      before { photo.title = " " }
      it { is_expected.not_to be_valid }
    end

    context "with excess title length" do
      before { photo.title = "a" * 121 }
      it { is_expected.not_to be_valid }
    end

    context "when decription is present" do
      before { photo.description = " " }
      it { is_expected.not_to be_valid }
    end

    context "when decription is excess length" do
      before { photo.description = "a" * 1001 }
      it { is_expected.not_to be_valid }
    end

    context "when location is present" do
      before { photo.location = " " }
      it { is_expected.not_to be_valid }
    end

    context "when location is not thing" do
      before { photo.location = "" }
      it { is_expected.not_to be_valid }
    end
  end
end

require 'spec_helper'

RSpec.describe CategoriPhoto, type: :model do
  let(:photo) { create :photo }
  let(:category) { create :category }
  before do
    photo.save
    category.save
  end
  let(:cate_photo) { CategoriPhoto.new }
  subject { cate_photo }
  it { is_expected.to respond_to :photo_id }
  it { is_expected.to respond_to :category_id }
  describe "mapping photo to category" do
    context "create relationship to category without category" do
      before do
        cate_photo.photo_id = photo.id
      end
      it { is_expected.not_to be_valid }
    end

    context "create relationship to photo without photo" do
      before do
        cate_photo.category_id = category.id
      end
      it { is_expected.not_to be_valid }
    end

    context "valie category ogiti" do
      before do
        cate_photo.category_id = category.id
        cate_photo.photo_id = photo.id
      end
      it { is_expected.to be_valid }
    end
  end
end

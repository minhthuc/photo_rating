require 'spec_helper'

RSpec.describe CategoriPhoto, type: :model do
  let(:cate_photo) { CategoriPhoto.new }
  subject { cate_photo }
  it { is_expected.to respond_to :photo_id }
  it { is_expected.to respond_to :category_id }
end

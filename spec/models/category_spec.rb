require 'spec_helper'

RSpec.describe Category, type: :model do
  let(:category) { create :category }
  subject { category }
  it { is_expected.to respond_to :name }
  it { is_expected.to respond_to :code }
  before { category.save }
  it { is_expected.to respond_to :photos }

  context "When invalid field" do
    context "name is invalid" do
      before { category.name = "a" * 51}
      it { is_expected.not_to be_valid }
    end

    context "code is invalid" do
      before { category.code = "a" * 11 }
      it { is_expected.not_to be_valid }
    end
  end
end

require 'spec_helper'

RSpec.describe User, type: :model do
  let(:user) {
    create(:user)
  }
  before { user.save! }
  subject { user }
  it { is_expected.to respond_to :email }
  it { is_expected.to respond_to :rates }
  it { is_expected.to respond_to :photos }
  it { is_expected.to respond_to :comments }
end

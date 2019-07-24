require 'spec_helper'

RSpec.feature do
  describe "Categories" do
    subject { page }
    context "Category page" do
      before { visit "/categoies/index" }
      it { is_expected.to have_title "Category" }
      it { is_expected.to have_content "Categories" }
      context "with out sign in" do
        get current_user_path
        current_user.code.should == 0
      end

    end
  end
end

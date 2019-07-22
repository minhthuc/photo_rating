require 'sprockets'
require 'sprockets/server'

Sprockets::Server.class_eval do

  private

  def headers_with_rails_env_check(*args)
    headers_without_rails_env_check(*args).tap do |headers|
      if Rails.env.development?
        headers["Cache-Control"]  = "no-cache"
        headers.delete "Last-Modified"
        headers.delete "ETag"
      end
    end
  end
  alias_method_chain :headers, :rails_env_check

end

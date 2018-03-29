require_relative 'boot'

require 'rails/all'
require "csv"
require 'active_support/core_ext/string'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load

eval(<<EOF
module #{(`echo $REPO_URL`.gsub("\n", "").presence || Dir.pwd).split("/").last.gsub(".git","").underscore.camelize}
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.
    config.time_zone = 'Asia/Tokyo'
    config.active_record.default_timezone = :local
    config.active_record.time_zone_aware_attributes = false
    config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**/*.{rb,yml}').to_s]
    config.autoload_paths << Rails.root.join("lib")
    config.eager_load_paths << Rails.root.join("lib")
    config.i18n.available_locales = [:en, :ja]
    config.i18n.default_locale = :en

    Dir.glob("config/routes/*").each do |route|
      config.paths["config/routes.rb"] << Rails.root.join(route)
    end

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*"
        resource "*", headers: :any, methods: [:get, :post, :options, :delete, :put, :patch]
      end
    end
  end
end
EOF
)

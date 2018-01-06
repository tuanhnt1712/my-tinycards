# Load DSL and set up stages
require "capistrano/setup"

# Include default deployment tasks
require "capistrano/deploy"
require "capistrano/rvm"
require "capistrano/bundler"
require "capistrano/rails/migrations"
require "capistrano/sidekiq"
require "capistrano/rails/assets"

case ENV["WEB_SERVER"]
when "passenger"
  require "capistrano/passenger"
else
  require "capistrano3/unicorn"
end

# Load custom tasks from `lib/capistrano/tasks` if you have any defined
Dir.glob("lib/capistrano/tasks/*.rake").each {|r| import r}

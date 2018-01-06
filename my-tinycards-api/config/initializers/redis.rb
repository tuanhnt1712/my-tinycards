if Rails.env.production? || Rails.env.staging?
  Redis.current = Redis::Namespace.new(ENV["DATABASE_NAME"], redis: Redis.new(host: ENV["REDIS_HOSTNAME"], port: 6379))
else
  Redis.current = Redis::Namespace.new(ENV["DATABASE_NAME"], redis: Redis.new)
end

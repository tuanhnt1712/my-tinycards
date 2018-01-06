if ENV["LOCAL_DEPLOY"]
  server "localhost", user: "deploy", roles: %w(app db)
else
  require_relative "elb"
  servers = get_ec2_targets ENV["AWS_ELB_NAME"], ENV["AWS_REGION"]
  servers.each_with_index do |sv, i|
    roles = ["app"]
    roles << "db" if i == 0
    server sv, user: "deploy", roles: roles
  end
end

namespace :tag do
  desc "update ec2 tags"
  task update_ec2_tags: :environment do
    METADATA_ENDPOINT = "http://169.254.169.254/latest/meta-data/instance-id"
    client = AWS::ELB.new region: ENV["AWS_REGION"],
      access_key_id: ENV["AWS_ACCESS_KEY_ID"],
      secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
    ec2 = AWS::EC2.new(region: ENV["AWS_REGION"])
    instance_id = Net::HTTP.get(URI.parse METADATA_ENDPOINT)
    instance = ec2.instances[instance_id]
    instance.tags["DEPLOY_REF"] = ENV["DEPLOY_REF"]
    instance.tags["DEPLOY_REF_TYPE"] = ENV["DEPLOY_REF_TYPE"]
    puts <<-EOM
An EC2 instance #{instance.ip_address} has been tagged as follows:
- DEPLOY_REF: #{ENV["DEPLOY_REF"]}
- DEPLOY_REF_TYPE: #{ENV["DEPLOY_REF_TYPE"]}
EOM
  end
end

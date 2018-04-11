require "aws-sdk"
def get_ec2_targets elb_name, region
  client = AWS::ELB.new region: region,
    access_key_id: ENV["AWS_ACCESS_KEY_ID"],
    secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"]
  elb = client.load_balancers.find{|lb| lb.name == elb_name}
  Array.new.tap do |ip_addrs|
    elb.instances.each do |instance|
      ip_addrs << instance.private_ip_address
    end
  end
end

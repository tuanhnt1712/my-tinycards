ActionMailer::Base.delivery_method = :smtp
ActionMailer::Base.smtp_settings = {
  address:        ENV["HOST"],
  port:           '587',
  authentication: 'plain',
  user_name:      ENV["EMAIL_USERNAME"],
  password:       ENV["EMAIL_PASSWORD"],
  domain:         ENV["HOST"],
  enable_starttls_auto: true
}

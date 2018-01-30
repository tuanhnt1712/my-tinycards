class Authenticates::SendPasswordResetTokenService
  attr_reader :user

  def initialize user
    @user = user
  end

  def perform
    begin
      user.reset_password_token = SecureRandom.hex Settings.reset_password.token_number_char
    end while User.exists?(reset_password_token: user.reset_password_token)
    user.reset_password_sent_at = Time.zone.now
    user.save!
    UserMailer.password_reset(user).deliver_now
  end
end

class AdminChannel < ApplicationCable::Channel
  def subscribed
    stream_from "admin_#{current_admin.id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def notification
  end
end

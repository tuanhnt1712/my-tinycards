class NotificationBroadcastJob < ApplicationJob
  queue_as :default

  def perform feed_back_id
    Admin.all.map do |admin|
      admin.notifications.create status: :unread, feed_back_id: feed_back_id
      ActionCable.server.broadcast "admin_#{admin.id}", message: {unread_count: admin.notification_count}
    end
  end
end

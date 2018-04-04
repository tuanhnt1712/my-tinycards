class Api::V1::FeedBacksController < Api::V1::AuthorizeController
  def create
    @feed_back = current_user.feed_backs.create! params_feedback
    NotificationBroadcastJob.perform_now @feed_back.id
  end

  private

  def params_feedback
    params.permit :deck_id, :user_id, :status
  end
end

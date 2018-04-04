class Admins::FeedBacksController < ApplicationController
	before_action :authenticate_admin!
  layout "admin"
	def index
    current_admin.notifications.map &:read!
		@feed_backs = FeedBack.all
	end

	def show
	end
end

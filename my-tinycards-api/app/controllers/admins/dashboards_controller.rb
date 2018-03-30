class Admins::DashboardsController < ApplicationController
  before_action :authenticate_admin!
  layout "admin"

  def index
    @dashboard = Dashboard.new(type: params[:type])
  end
end

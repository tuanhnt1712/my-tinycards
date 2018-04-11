class Admins::UsersController < ApplicationController
  before_action :authenticate_admin!
  layout "admin"

  def index
    @users = User.all
    respond_to do |format|
      format.html
      format.csv {send_data @users.to_csv}
      format.xls {send_data @users.to_csv(col_sep: "\t")}
    end
  end

  def destroy
    @user = User.find_by!(id: params[:id])
    if @user.destroy
      respond_to do |format|
        format.html do
          redirect_to admins_root_path
        end
        format.js
      end
    else
      redirect_to admins_root_path
    end
  end
end

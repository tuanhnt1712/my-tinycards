class Ability
  include CanCan::Ability

  def initialize user
    user ||= User.new

    if user.is_admin?
      can :manage, Deck
      can :destroy, User
    else
      can :create, Deck
      can [:update, :destroy], Deck do |resource|
        resource.user == user
      end
      can :update, User do |current_user|
        current_user == user
      end
    end
    can :read, :all
  end
end

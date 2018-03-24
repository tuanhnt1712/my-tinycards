class Api::V1::UserLessonSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :lesson_id, :percent, :practice_at

  def percent
    return 0 if object.practice_at.blank?
    days = (Time.zone.now - object.practice_at)/1.day 
    case 
    when days <= 0.5 
      100
    when days <= 7
      (100 - days*100/7.0).to_i
    else
      0 
    end
  end
end

ActiveRecord::Base.transaction do

# Create groups masterdata

  5.times do
    Group.create(name: Faker::Name.name)
  end

# Create Parts masterdata

  3.times do |i|
    Part.create(name: "reading-part-#{i+1}", section: "reading")
    Part.create(name: "listening-part-#{i+1}", section: "listening")
  end

  4.times do |i|
    Part.create(name: "speaking-part-#{i+1}", section: "speaking")
    Part.create(name: "writing-part-#{i+1}", section: "writing")
  end

# Create reading part 1 situations master data: One situation one email

  10.times do |i|
    situation = Situation.create(title: "Reading part 1 Situation #{i+1}",
      part: Part.find_by(name: "reading-part-1"), content_type: i%2, situation_type: i%2)
    situation.sub_situations.create(title: "An email from someone",
      content: "subject: a, from: b, email content")
    question = situation.questions.create(title: "Answer question from situation #{i+1}",
      type_answer: 0, score: 2, time: 30.seconds)
    question.answers.create(title: "Wrong answer 1", is_correct: false)
    question.answers.create(title: "Wrong answer 2", is_correct: false)
    question.answers.create(title: "Correct answer", is_correct: true)
  end

# Create reading part 2 situations master data: One situation 3 emails

  10.times do |i|
    situation = Situation.create(title: "Reading part 2 Situation #{i+1}",
      part: Part.find_by(name: "reading-part-2"), content_type: i%2, situation_type: i%2)
    situation.sub_situations.create(title: "An email from first person",
      content: "subject: a, from: b, first email")
    situation.sub_situations.create(title: "An email from second person",
      content: "subject: a, from: b, second email", attachment: "file.docx")
    situation.sub_situations.create(title: "An email from third person",
      content: "subject: a, from: b, third email")
    3.times do |j|
      question = situation.questions.create(title: "Please answer question #{j+1} from situation #{i+1}",
        type_answer: 0, score: 1, time: 30.seconds)
      question.answers.create(title: "Wrong answer 1", is_correct: false)
      question.answers.create(title: "Wrong answer 2", is_correct: false)
      question.answers.create(title: "Correct answer", is_correct: true)
    end
  end

# Create reading part 3 situations masterdata: One situation with text and images

  10.times do |i|
    situation = Situation.create(title: "Reading part 3 Situation #{i+1}",
      part: Part.find_by(name: "reading-part-3"), content_type: i%2, situation_type: i%2)
    situation.sub_situations.create(title: "Situation for reading part 3",
      content: Faker::Lorem.sentence)
    3.times do |j|
      question = situation.questions.create(title: "Please answer question #{j+1} from situation #{i+1}",
        type_answer: 0, score: 1, time: 30.seconds)
      question.answers.create(title: "Wrong answer 1", is_correct: false)
      question.answers.create(title: "Wrong answer 2", is_correct: false)
      question.answers.create(title: "Correct answer", is_correct: true)
    end
  end

# Create listening part 1 situations masterdata: One situation one question

  10.times do |i|
    situation = Situation.create(title: "Listening part 1 Situation #{i+1}",
      part: Part.find_by(name: "listening-part-1"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 0, score: 1, time: 30.seconds)
    question.answers.create(title: "Wrong answer 1", is_correct: false)
    question.answers.create(title: "Wrong answer 2", is_correct: false)
    question.answers.create(title: "Correct answer", is_correct: true)
  end

# Create listening part 2 situations masterdata: One situation 3 questions

  10.times do |i|
    situation = Situation.create(title: "Listening part 2 Situation #{i+1}",
      part: Part.find_by(name: "listening-part-2"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    3.times do |j|
      question = situation.questions.create(title: "Please answer question #{j+1} from situation #{i+1}",
        type_answer: 0, score: 1, time: 30.seconds)
      question.answers.create(title: "Wrong answer 1", is_correct: false)
      question.answers.create(title: "Wrong answer 2", is_correct: false)
      question.answers.create(title: "Correct answer", is_correct: true)
    end
  end

# Create listening part 3 situations masterdata: One situation 3 questions

  10.times do |i|
    situation = Situation.create(title: "Listening part 3 Situation #{i+1}",
      part: Part.find_by(name: "listening-part-3"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    3.times do |j|
      question = situation.questions.create(title: "Please answer question #{j+1} from situation #{i+1}",
        type_answer: 0, score: 1, time: 30.seconds)
      question.answers.create(title: "Wrong answer 1", is_correct: false)
      question.answers.create(title: "Wrong answer 2", is_correct: false)
      question.answers.create(title: "Correct answer", is_correct: true)
    end
  end

# Create speaking part 1 situations masterdata: text

  10.times do |i|
    situation = Situation.create(title: "Speaking part 1 Situation #{i+1}",
      part: Part.find_by(name: "speaking-part-1"), content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 1, score: 5, time: 5.minutes)
  end

# Create speaking part 2 situations masterdata: text

  10.times do |i|
    situation = Situation.create(title: "Speaking part 2 Situation #{i+1}",
      part: Part.find_by(name: "speaking-part-2"), content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 1, score: 5, time: 5.minutes)
  end

# Create speaking part 3 situations masterdata: audio

  10.times do |i|
    situation = Situation.create(title: "Speaking part 3 Situation #{i+1}",
      part: Part.find_by(name: "speaking-part-3"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 1, score: 5, time: 5.minutes)
  end
# Create speaking part 4 situations masterdata: audio

  10.times do |i|
    situation = Situation.create(title: "Speaking part 4 Situation #{i+1}",
      part: Part.find_by(name: "speaking-part-4"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 1, score: 5, time: 5.minutes)
  end

# Create writing part 1 situation masterdata:
  10.times do |i|
    situation = Situation.create(title: "Writing part 1 Situation #{i+1}",
      part: Part.find_by(name: "writing-part-1"), content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 2, score: 5, time: 5.minutes)
  end

# Create writing part 2 situation masterdata:
  10.times do |i|
    situation = Situation.create(title: "Writing part 2 Situation #{i+1}",
      part: Part.find_by(name: "writing-part-2"), content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 2, score: 5, time: 5.minutes)
  end

# Create writing part 3 situation masterdata:
  10.times do |i|
    situation = Situation.create(title: "Writing part 3 Situation #{i+1}",
      part: Part.find_by(name: "writing-part-3"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 2, score: 5, time: 5.minutes)
  end

# Create writing part 4 situation masterdata:
  10.times do |i|
    situation = Situation.create(title: "Writing part 4 Situation #{i+1}",
      part: Part.find_by(name: "writing-part-4"), audio_file: "audio.mp3", content_type: i%2, situation_type: i%2)
    question = situation.questions.create(title: "Please answer question from situation #{i+1}",
      type_answer: 2 , score: 5, time: 5.minutes)
  end

# Create user
  users = []
  (1..10).each do |i|
    user = User.create(name: Faker::Name.name, id_login: "user#{i}", password: "123456",
      password_confirmation: "123456", group: Group.first)
    users << user
  end

  10.times do |i|
    User.create(name: Faker::Name.name, id_login: "test-user#{i+1}", password: "123456",
      password_confirmation: "123456", group_id: (Group.all.pluck :id).sample)
  end

  users.each do |user|
    user.user_tokens.create(
      token: "#{user.id_login}-token",
      refresh_token: "#{user.id_login}-refresh-token",
      expired_at: 2.months.from_now
    )
  end

# Create Testset with all parts
  testset = Testset.create(name: "testset1", group: Group.first)
  Part.all.each_with_index do |part, index|
    testset_part = testset.testset_parts.create(
      part: part,
      description: part.name.gsub("-", " ").capitalize + " description",
      format: part.name.gsub("-", " ").capitalize + " format",
      target: part.name.gsub("-", " ").capitalize + " target",
      ordinal_show: index+1
    )
    5.times do |j|
      testset_part.testset_situations.create(situation: part.situations[j])
    end
  end

# Create User Testset
  users.each_with_index do |user, index|
    user.user_testsets.create(
      testset: user.group.testsets.first,
      code: "#{index}"*12,
    )
  end
end

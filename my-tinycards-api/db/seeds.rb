15.times do |n|
  user = User.create!(name: "TuAnh#{n}", email: "user#{n}@example.com",
    password: "12345678", password_confirmation: "12345678")
end
ActiveRecord::Base.transaction do
  user = User.create!(name: "TuAnh", email: "tuanh@gmail.com",
    password: "12345678", password_confirmation: "12345678")

  deck = user.decks.create!(title: "number", description: "hoc so")

  12.times do |i|
    deck.cards.create!(front: "i", back: "number #{i}")
  end
end

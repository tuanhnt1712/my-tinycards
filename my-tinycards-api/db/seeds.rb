Admin.create(email: "admin@example.com",
  password: "12345678", password_confirmation: "12345678")

15.times do |n|
  user = User.create(name: "TuAnh#{n}", email: "user#{n}@example.com",
    password: "12345678", password_confirmation: "12345678")
end

ActiveRecord::Base.transaction do
  user = User.create!(name: "TuAnh", email: "tuanh@gmail.com",
    password: "12345678", password_confirmation: "12345678")

  deck = user.decks.new(title: "number", description: "hoc so")

  12.times do |i|
    cards = []
    4.times do
      cards << deck.cards.new(front: "i", back: "number #{i}")
    end
    deck.cards << cards
  end
  deck.save!
end

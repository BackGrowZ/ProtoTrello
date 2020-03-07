# User.create(username: "BackGrowZ", email: "anthony.carreta@gmail.com", password: "1234", key: "e5956986-a71c-4d35-aad8-6f8e91edf543")
# Board.create(label: "Je suis le premiere tableau", key: "b0248fef-3d40-4503-a3b8-910fad552084", owner:"e5956986-a71c-4d35-aad8-6f8e91edf543")
# Liste.create(label: "Je suis la premiere liste", key: "937c1d54-36de-4867-beec-4f9f8259223f", board: "b0248fef-3d40-4503-a3b8-910fad552084", position: "")
# Card.create(label: "Je suis la premiere carte", key: "0f44d70a-cc93-4957-af75-4018342f5eec", liste: "937c1d54-36de-4867-beec-4f9f8259223f", board: "b0248fef-3d40-4503-a3b8-910fad552084", position: "0")

admin = User.new
admin.email = 'anthony.carreta@gmail.com'
admin.password = '280695'
admin.password_confirmation = '280695'
admin.admin = true
admin.save

user = User.new
user.email = 'user@mail.com'
user.password = 'trello'
user.password_confirmation = 'trello'
user.save

user = User.new
user.email = 'test@mail.com'
user.password = 'mdp'
user.password_confirmation = 'mdp'
user.save
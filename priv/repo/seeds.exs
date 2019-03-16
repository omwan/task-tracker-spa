# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     TaskTrackerSpa.Repo.insert!(%TaskTrackerSpa.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias TaskTrackerSpa.Users.User
alias TaskTrackerSpa.Repo

pwhash1 = Argon2.hash_pwd_salt("password1")
pwhash2 = Argon2.hash_pwd_salt("password2")

Repo.insert!(
  %User{
    username: "olivia@example.com",
    password_hash: pwhash1,
    admin: false
  }
)

Repo.insert!(
  %User{
    username: "manager@example.com",
    password_hash: pwhash2,
    admin: true
  }
)
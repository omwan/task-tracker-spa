# TaskTrackerSpa

## Design choices

- Users can create an account and set a password, but cannot edit their information afterwards, only view it
- Usernames must be unique, passwords cannot be blank
- Tasks are required to have a title, but may be created without an assignee, or later set to not have an assignee
- Tasks have a many to one relationship with users where a single user may be assigned multiple tasks but a task may only have one assignee

------

To start your Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Install Node.js dependencies with `cd assets && npm install`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

- Official website: http://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Mailing list: http://groups.google.com/group/phoenix-talk
- Source: https://github.com/phoenixframework/phoenix
# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

path = Path.expand("~/.config/task_tracker_spa.secret")
unless File.exists?(path) do
  secret = Base.encode16(:crypto.strong_rand_bytes(32))
  File.write!(path, secret)
end
secret = File.read!(path)

# General application configuration
config :task_tracker_spa,
       ecto_repos: [TaskTrackerSpa.Repo]

# Configures the endpoint
config :task_tracker_spa, TaskTrackerSpaWeb.Endpoint,
       url: [host: "localhost"],
       secret_key_base: secret,
       render_errors: [view: TaskTrackerSpaWeb.ErrorView, accepts: ~w(html json)],
       pubsub: [name: TaskTrackerSpa.PubSub,
         adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
       format: "$time $metadata[$level] $message\n",
       metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

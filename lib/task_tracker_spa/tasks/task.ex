defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :name, :string
    field :description, :string
    field :complete, :boolean, default: false
    field :time_spent, :integer
    belongs_to :user, TaskTrackerSpa.Users.User

    timestamps()
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :complete, :time_spent, :user_id])
    |> validate_required([:name, :description, :complete, :time_spent])
  end
end

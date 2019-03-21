defmodule TaskTrackerSpa.Tasks.Task do
  use Ecto.Schema
  import Ecto.Changeset

  schema "tasks" do
    field :name, :string
    field :description, :string
    field :complete, :boolean, default: false
    field :time_spent, :integer, default: 0
    belongs_to :user, TaskTrackerSpa.Users.User

    timestamps()
  end

  defp validate_increment(changeset, increment) do
    time_spent = get_field(changeset, :time_spent)
    if rem(time_spent, increment) == 0 do
      changeset
    else
      add_error(changeset, :time_spent, "must be a multiple of #{increment}")
    end
  end

  @doc false
  def changeset(task, attrs) do
    task
    |> cast(attrs, [:name, :description, :complete, :time_spent, :user_id])
    |> validate_required([:name, :complete, :time_spent])
    |> validate_number(:time_spent, greater_than_or_equal_to: 0)
    |> validate_increment(15)
  end
end

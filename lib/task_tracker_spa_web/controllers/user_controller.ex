defmodule TaskTrackerSpaWeb.UserController do
  use TaskTrackerSpaWeb, :controller

  alias TaskTrackerSpa.Users
  alias TaskTrackerSpa.Users.User

  action_fallback TaskTrackerSpaWeb.FallbackController

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, %{"user" => user_params}) do
    if user_params["password"] == "" do
      with {:ok, %User{} = user} <- Users.create_user(user_params) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.user_path(conn, :show, user))
        |> render("show.json", user: user)
      end
    else
      password_hash = Argon2.hash_pwd_salt(user_params["password"])
      user_params_with_pw = user_params
                            |> Map.put("password_hash", password_hash)
                            |> Map.delete("password")

      with {:ok, %User{} = user} <- Users.create_user(user_params_with_pw) do
        conn
        |> put_status(:created)
        |> put_resp_header("location", Routes.user_path(conn, :show, user))
        |> render("show.json", user: user)
      end
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end

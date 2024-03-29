defmodule TaskTrackerSpaWeb.AuthController do
  use TaskTrackerSpaWeb, :controller

  # https://github.com/NatTuck/husky_shop_spa/compare/3-list-products-fixed...1901-5-users#diff-b78f761880731f5beda0b64d49a68009

  alias TaskTrackerSpa.Users
  alias TaskTrackerSpa.Users.User

  action_fallback TaskTrackerSpaWeb.FallbackController

  def authenticate(conn, %{"username" => username, "password" => password}) do
    with {:ok, %User{} = user} <- Users.authenticate_user(username, password) do
      session = %{
        token: Phoenix.Token.sign(TaskTrackerSpaWeb.Endpoint, "user_id", user.id),
        user_id: user.id,
        username: user.username
      }

      conn
      |> put_session(:session, session)
      |> put_resp_header("content-type", "application/json; charset=UTF-8")
      |> send_resp(:created, Jason.encode!(%{data: session}))
    end
  end

  def logout(conn, _params) do
    conn
    |> clear_session()
    |> send_resp(:no_content, "")
  end
end

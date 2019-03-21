defmodule TaskTrackerSpaWeb.PageController do
  use TaskTrackerSpaWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html", session: get_session(conn, :session))
  end
end

defmodule TaskTrackerSpaWeb.Router do
  use TaskTrackerSpaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
  end

  scope "/", TaskTrackerSpaWeb do
    pipe_through :browser

    get "/", PageController, :index
    get "/users/:id", PageController, :index
    get "/users/new", PageController, :index
    get "/users/:id/edit", PageController, :index
    get "/users/new", PageController, :index

    get "/tasks/:id", PageController, :index
    get "/tasks/new", PageController, :index
    get "/tasks/:id/edit", PageController, :index
    get "/tasks/new", PageController, :index
  end

  scope "/api/v1", TaskTrackerSpaWeb do
    pipe_through :api

    resources "/users", UserController, except: [:new, :edit]
    resources "/tasks", TaskController, except: [:new, :edit]

    post "/auth", AuthController, :authenticate
    delete "/auth", AuthController, :logout
  end
end

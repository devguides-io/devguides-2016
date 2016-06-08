Phoenix Guides
==============

Introduction
------------

- Installing Elixir
  - brew install erlang elixir
  - mix local.hex

- Installing Node
  - brew install node.js

- Installing Phoenix (-> mix)
  - mix archive.install http://...
  - mix --help

- Start a project
  - mix phoenix.gen hello

- Set up the database
  - vim config/dev.exs
  - mix ecto.create

- Make a model (-> models)
  - mix phoenix.gen.html
  - mix ecto.migrate

- Add a route (-> routes)
  - resources :document, DocumentController
  - mix routes

- Inspect the controller (-> controllers)
  - Navigate to /documents
  - web/controllers/document_controller.rb

- Edit some CSS (-> assets)
  - web/static && priv/static

## Pages

Controllers and actions, views, templates

## Models

- Ecto and stuff

## Routes

## Assets

## Migrations

- Make your first migration
  - mix ecto.gen.migration add_document_fields
- Run it
  - mix ecto.migrate

## Mix

- What is mix

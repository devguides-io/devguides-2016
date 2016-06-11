# Phoenix: i18n

* The structure
  - priv/gettext/*.pot
  - priv/gettext/en/LC_MESSAGES/*.po
  - gettext("Hello, world")
  - gettext("Hello, %{name}", name: "Phoenix")

* Updating PO files
  - mix gettext.extract --merge

* Plurals
  - ngettext "%{count} apple", "%{count} apples", count

# UI Contract: Shell, Routes and States

This feature exposes browser navigation and presentation behavior only; no HTTP contract is added.

| Path | Result |
|---|---|
| `/` | Localized neutral home inside the application shell. |
| Any other path | Localized not-found state inside the shell, with a working home link. |

The shell exposes one language control with pt-BR/en choices, one primary navigation landmark, one main landmark and a visible current destination. Future sections are marked unavailable; they are not clickable routes in F02.

For each feedback kind (`empty`, `loading`, `error`, `unavailable`, `stale`), text and accessible semantics identify the state without relying on color. Error may expose a supplied retry callback; the shared component does not itself fetch data.

Display language changes update visible copy, accessible labels, `html[lang]` and the page title in place. Unsupported saved values fall back safely to pt-BR. An explicit choice is saved only in this browser; the local-storage key is an implementation detail.

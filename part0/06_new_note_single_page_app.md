```mermaid
sequenceDiagram
participant user
participant browser
participant server

user->>browser: Submit form
browser ->>browser: Redraw notes (DOM update)
browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
activate server

server-->>browser: 201 (Created)
deactivate server
```

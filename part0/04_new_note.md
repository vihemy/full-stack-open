```mermaid
sequenceDiagram
  participant user
  participant browser
  participant server

  user ->>browser: Submit form
  browser ->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
  activate server

  server-->>browser: 302 Redirect to /exampleapp/notes
  deactivate server

  browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
  activate server
  server-->>browser: 200 OK (HTML document)
  deactivate server

  browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
  activate server
  server-->>browser: 200 OK (CSS file)
  deactivate server

  browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
  activate server
  server-->>browser: 200 OK (JS file)
  deactivate server

  Note right of browser: Browser executes JS code to fetch JSON data

  browser ->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
  activate server
  server-->>browser: 200 OK (JSON data)
  deactivate server

  Note right of browser: Browser parses and renders the notes

import {HTMX_KNOWLEDGE} from "../data/htmx-info.js";

export const mainPageHandler = (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>HTMX Essentials</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/icon.png" />
        <link rel="stylesheet" href="/main.css" />
        <script type="text/javascript" src="/htmx.min.js" defer></script>
      </head>
      <body>
        <header id="main-header">
          <img src="/htmx-logo.jpg" alt="HTMX Logo" />
          <h1>Essentials</h1>
        </header>

        <main>
          <p>HTMX is a JavaScript library that you use without writing JavaScript code.</p>
          <button hx-trigger="click once" hx-get="/info" hx-target="main" hx-swap="beforeend">Learn More</button>
        </main>
      </body>
    </html>
  `);
}

export const fetchInfoHandler = (req, res) => {
    res.send(`
  <ul>
    ${HTMX_KNOWLEDGE.map(info => `<li>${info}</li>`).join('')}
  </ul>
  `)
}
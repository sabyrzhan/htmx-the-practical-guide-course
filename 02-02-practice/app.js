import express from 'express';

const courseGoals = [];

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Learn HTMX</title>
      <link rel="stylesheet" href="/main.css" />
      <script src="/htmx.js" defer></script>
    </head>
    <body>
      <main>
        <h1>Manage your course goals</h1>
        <section>
          <form 
                id="goal-form" hx-post="/" 
                hx-swap="beforeend"
                hx-target="ul" 
                hx-on::after-request="this.reset()"
                hx-disabled-elt="find form button"
          >
            <div>
              <label htmlFor="goal">Goal</label>
              <input type="text" id="goal" name="goal" />
            </div>
            <button type="submit" id="addGoalButton">Add goal</button>
          </form>
        </section>
        <section>
          <ul id="goals" hx-swap="outerHTML" hx-confirm="Are you sure?">
          ${courseGoals.map(
            (goal, index) => `
            <li id="goal-${index}">
              <span>${goal}</span>
              <button
              hx-delete="/goals/${index}"
              hx-target="#goals"
              hx-select="#goals"
              >Remove</button>
            </li>
          `
          ).join('')}
          </ul>
        </section>
      </main>
    </body>
  </html>
  `);
});

app.post('/', (req, res) => {
    const goal = req.body.goal
    courseGoals.push(goal)
    const index = courseGoals.length - 1

    setTimeout(() => {
        res.send(`
        <li id="goal-${index}">
          <span>${goal}</span>
         <button
              hx-delete="/goals/${index}"
              hx-target="#goals"
              hx-select="#goals"
              >Remove</button>
        </li>
    `)
    }, 2000)
})

app.delete('/goals/:index', (req, res) => {
    const index = req.params.index;
    courseGoals.splice(index, 1)
    res.set('HX-Location', '/')
    res.send()
})

app.listen(3000);

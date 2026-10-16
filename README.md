# Satish Yadav - Portfolio (React + plain CSS)

Converted from your HTML/CSS/JS template. No Vite - this uses Create React App
(`react-scripts`), so the normal `npm start` works.

## Run it

```powershell
cd D:\fgit\reacttry\Portfolio669      # the folder that contains package.json
npm install
npm start                             # opens http://localhost:3000
```

> `package.json` must sit directly inside the folder you run the commands in.

## Build for hosting (Netlify)

```powershell
npm run build
```
Upload the generated `build` folder to Netlify (drag & drop), or connect the repo with
**Build command:** `npm run build` and **Publish directory:** `build`.

## Where to edit things

| What | File |
|------|------|
| Name, email, links, about text, stats, experience, projects, tech stack | `src/data.js` |
| All styling (external CSS) | `src/styles.css` |
| Page sections | `src/components/*.js` |
| Chatbot answers | `src/chatbot/engine.js` (reads everything from `src/data.js`) |
| Chatbot window | `src/components/Chatbot.js` |
| Hero illustration (replace with your own photo if you like) | `src/images/hero.png` |
| Project cover images | `src/images/projects/*.png` |

### Real project screenshots
The project covers are generated mock-ups. To use real screenshots, save them as
1280x720 PNGs with the **same file names** inside `src/images/projects/`
(`gokwik.png`, `questpix.png`, `matrix.png`, `wunderkind.png`, `jobtracker.png`).

### Adding a project
Copy one object in the `projects` array in `src/data.js`. Use an even number of
projects (the grid has a title block in the first cell) so the last row stays balanced.

### Contact form
It has no backend: on Submit it opens the visitor's email app with the message filled in
(`mailto:`). For a real inbox form later, connect it to Formspree or EmailJS.


## Chatbot

A chat bubble sits at the bottom-right of every page. Visitors can tap quick buttons
(Experience, Skills, Projects, Education, Contact) or type a question such as
"Does he know Laravel?" or "Tell me about GoKwik".

* It is a **built-in assistant that answers from `src/data.js`** - no API key, no server, no cost,
  works on any static host. Update your data and the bot's answers update automatically.
* It politely declines salary questions, never shows your phone number, and never says whether
  you are job hunting. It also says honestly when something is outside your listed stack.
* Run the tests for the answer engine: `npm test`

### Optional: AI-powered chatbot
Want free-form answers from a real AI model instead? The project already includes a Netlify
serverless function (`netlify/functions/chat.js`). Your API key stays on the server, never in the React code.

1. Host the site on Netlify (the included `netlify.toml` is already configured).
2. In Netlify -> Site settings -> Environment variables add:
   * `ANTHROPIC_API_KEY` = your Anthropic API key
   * `REACT_APP_CHAT_ENDPOINT` = `/.netlify/functions/chat`
3. Redeploy. If the function is ever unavailable, the bot automatically falls back to the built-in answers.

Notes: the endpoint is public, so set a monthly spend limit in the Anthropic console. Visitor messages
are sent to Anthropic when this option is on. If you change your experience or projects, also update the
facts inside `SYSTEM_PROMPT` in `netlify/functions/chat.js`. `npm start` does not run Netlify functions;
use the Netlify CLI (`netlify dev`) to test it locally.

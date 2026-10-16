// OPTIONAL - AI-powered replies for the portfolio chatbot (Netlify serverless function).
// The chatbot works without this. To enable it, see "Optional: AI-powered chatbot" in README.md.
//
// Needs two environment variables in Netlify (never put the key in React code):
//   ANTHROPIC_API_KEY   your Anthropic API key
//   ANTHROPIC_MODEL     (optional) model name, defaults to claude-haiku-5-5

const SYSTEM_PROMPT = `You are the friendly assistant on Satish Yadav's portfolio website. Answer visitors' questions about Satish using ONLY the facts below. If something is not covered, say you don't have that information and suggest contacting him. Never invent details. Never share phone numbers, salary expectations or other private information, and never say whether he is looking for a job. Keep answers short (under 90 words), warm and professional, in plain text (no markdown, you may use "•" bullets).

FACTS
- Satish Yadav, Web Developer based in Thane, Maharashtra, India, with 2+ years of experience building responsive, high-performance websites and web apps.
- Education: B.Sc. in Computer Science, University of Mumbai (2021-2023), graduated among the top 5% of the batch.
- Androapps Technology (CBD Belapur, Navi Mumbai) - Web Developer, full-time, Oct 2024 to present. Develops web features with React.js, PHP and Laravel across frontend and backend; builds responsive interfaces with Tailwind CSS and Bootstrap; creates reusable React components; integrates REST APIs; works with Git, GitHub and GitLab.
- Tech Sierra (Thane) - Software Developer Intern, Dec 2023 to May 2024. Built pixel-perfect, responsive email templates for the Wunderkind project with HTML, CSS and JavaScript.
- Projects: GoKwik (e-commerce growth platform for D2C brands; React.js, Tailwind CSS, Bootstrap), Questpix (EdTech exam-prep platform for JEE/NEET/Olympiad/Boards; React.js), Matrix Land & Developers (real estate website with project pages and inquiry form; React.js, PHP, Laravel), Wunderkind (responsive email templates; HTML, CSS, JavaScript), Job Tracker Dashboard (personal project in progress; React.js, JavaScript, LocalStorage).
- Tech: React.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap, PHP, Laravel, Node.js, MongoDB, Git, GitLab, Postman.
- Contact: email tion3256@gmail.com, LinkedIn https://www.linkedin.com/in/satishyadav18/, GitHub https://github.com/Yadav669`;

const json = (statusCode, body) => ({
  statusCode,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return json(405, { error: 'Method not allowed' });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return json(500, { error: 'Chat is not configured' });

  // ---- validate & trim the incoming conversation (this endpoint is public) ----
  let incoming;
  try {
    incoming = JSON.parse(event.body || '{}').messages;
  } catch (e) {
    return json(400, { error: 'Invalid JSON' });
  }
  if (!Array.isArray(incoming)) return json(400, { error: 'messages must be an array' });

  let messages = incoming
    .slice(-10)
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .map((m) => ({ role: m.role, content: m.content.slice(0, 500) }));
  while (messages.length && messages[0].role !== 'user') messages.shift(); // must start with a user turn
  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return json(400, { error: 'Conversation must end with a user message' });
  }

  // ---- call the model ----
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: controller.signal,
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: process.env.ANTHROPIC_MODEL || 'claude-haiku-5-5',
        max_tokens: 300,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });
    if (!res.ok) return json(502, { error: 'Upstream error' });

    const data = await res.json();
    const reply = (data.content || [])
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim();
    if (!reply) return json(502, { error: 'Empty reply' });
    return json(200, { reply });
  } catch (e) {
    return json(502, { error: 'Request failed' });
  } finally {
    clearTimeout(timer);
  }
};

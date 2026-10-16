import { getLocalReply } from './engine';

// Optional: set REACT_APP_CHAT_ENDPOINT (e.g. /.netlify/functions/chat) to answer with
// a real AI model through a serverless function. If it's not set - or the request
// fails - the bot silently falls back to the built-in local answers.
const ENDPOINT = process.env.REACT_APP_CHAT_ENDPOINT;

/**
 * @param {{from: 'user'|'bot', text: string}[]} history  conversation so far (last item = the new user message)
 * @param {string} text  the new user message
 * @returns {Promise<{text: string, links?: {label: string, href: string}[]}>}
 */
export async function getReply(history, text) {
  if (ENDPOINT) {
    try {
      const messages = history.slice(-10).map((m) => ({
        role: m.from === 'user' ? 'user' : 'assistant',
        content: m.text,
      }));
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data && typeof data.reply === 'string' && data.reply.trim()) {
          return { text: data.reply.replace(/\*\*/g, '').trim() };
        }
      }
    } catch (err) {
      // fall through to the local answers
    }
  }
  return getLocalReply(text);
}

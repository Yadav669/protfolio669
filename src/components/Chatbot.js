import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import logo from '../images/logo.png';
import { profile } from '../data';
import { getReply } from '../chatbot/chat';
import { GREETING_TEXT } from '../chatbot/engine';

const CHIPS = [
  { label: 'Experience', query: "What is Satish's work experience?" },
  { label: 'Skills', query: 'What skills does he have?' },
  { label: 'Projects', query: 'What projects has he built?' },
  { label: 'Education', query: 'Where did he study?' },
  { label: 'Contact', query: 'How can I contact him?' },
];

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ id: 1, from: 'bot', text: GREETING_TEXT }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [teaser, setTeaser] = useState(false);

  const listRef = useRef(null);
  const inputRef = useRef(null);
  const nextId = useRef(2);
  const history = useRef(messages);
  const alive = useRef(true);

  useEffect(() => {
    history.current = messages;
  }, [messages]);

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);

  // keep the newest message in view (scroll the list itself, never the page)
  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing, open]);

  // friendly one-time teaser bubble
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem('chatTeaserSeen') === '1';
    } catch (e) {
      /* storage unavailable */
    }
    if (seen) return undefined;
    const show = setTimeout(() => setTeaser(true), 5000);
    const hide = setTimeout(() => setTeaser(false), 14000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const openChat = () => {
    setOpen(true);
    setTeaser(false);
    try {
      sessionStorage.setItem('chatTeaserSeen', '1');
    } catch (e) {
      /* ignore */
    }
    // don't pop the keyboard on touch devices
    if (!window.matchMedia('(pointer: coarse)').matches) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 60);
    }
  };

  const send = useCallback(
    async (raw) => {
      const text = (raw || '').trim().slice(0, 300);
      if (!text || typing) return;

      const userMsg = { id: nextId.current++, from: 'user', text };
      const convo = [...history.current, userMsg];
      setMessages(convo);
      setInput('');
      setTyping(true);

      const [reply] = await Promise.all([
        getReply(convo, text),
        wait(550 + Math.min(text.length * 8, 450)), // natural typing pause
      ]);

      if (!alive.current) return;
      setMessages((prev) => [...prev, { id: nextId.current++, from: 'bot', ...reply }]);
      setTyping(false);
    },
    [typing]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    send(input);
  };

  const onLinkClick = (href) => {
    if (href.startsWith('#')) setOpen(false); // jump to the section and get out of the way
  };

  return (
    <div className={`chatbot ${open ? 'is-open' : ''}`}>
      {open && (
        <div
          className="chat-panel"
          role="dialog"
          aria-label={`Chat with ${profile.firstName}'s assistant`}
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
        >
          <div className="chat-header">
            <div className="chat-avatar">
              <img src={logo} alt="" />
            </div>
            <div>
              <div className="chat-title">{profile.firstName}'s Assistant</div>
              <div className="chat-status">Ask me about his work</div>
            </div>
            <button type="button" className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              <FaTimes />
            </button>
          </div>

          <div className="chat-messages" ref={listRef} role="log" aria-live="polite">
            {messages.map((m) => (
              <div key={m.id} className={`chat-msg ${m.from}`}>
                {m.text}
                {m.links && m.links.length > 0 && (
                  <div className="chat-links">
                    {m.links.map((l) => {
                      const external = /^https?:/.test(l.href);
                      return (
                        <a
                          key={l.label + l.href}
                          className="chat-link"
                          href={l.href}
                          target={external ? '_blank' : undefined}
                          rel={external ? 'noopener noreferrer' : undefined}
                          onClick={() => onLinkClick(l.href)}
                        >
                          {l.label}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
            {typing && (
              <div className="chat-typing" aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </div>
            )}
          </div>

          <div className="chat-chips">
            {CHIPS.map((c) => (
              <button key={c.label} type="button" className="chat-chip" disabled={typing} onClick={() => send(c.query)}>
                {c.label}
              </button>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              maxLength={300}
              aria-label="Type your question"
              autoComplete="off"
            />
            <button type="submit" className="chat-send" disabled={!input.trim() || typing} aria-label="Send message">
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}

      {teaser && !open && (
        <button type="button" className="chat-teaser" onClick={openChat}>
          Ask me about {profile.firstName}
        </button>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => (open ? setOpen(false) : openChat())}
        aria-label={open ? 'Close chat' : `Chat with ${profile.firstName}'s assistant`}
        aria-expanded={open}
      >
        {open ? <FaTimes /> : <FaCommentDots />}
      </button>
    </div>
  );
}

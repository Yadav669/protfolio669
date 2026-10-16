import React, { useEffect, useState } from 'react';
import logo from '../images/logo.png';
import { navLinks } from '../data';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // highlight the nav link of the section currently in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header>
      <div className="wrapper">
        <nav>
          <div className="logo">
            <img src={logo} className="logoimage" alt="logo" />
          </div>

          <ul className={`nav-links ${open ? 'nav-active' : ''}`}>
            {navLinks.map((link, index) => (
              <li
                key={link.id}
                style={
                  open
                    ? { animation: `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s` }
                    : undefined
                }
              >
                <a
                  href={`#${link.id}`}
                  className={active === link.id ? 'active' : ''}
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`burger ${open ? 'toggle' : ''}`}
            onClick={() => setOpen((v) => !v)}
            role="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            <div className="line1" />
            <div className="line2" />
            <div className="line3" />
          </div>
        </nav>
      </div>
    </header>
  );
}

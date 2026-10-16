import React, { useState } from 'react';
import arrow from '../images/arrow-b-b.png';
import { profile, socials } from '../data';

const empty = { first: '', last: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState('');

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // No backend needed: opens the visitor's email app with the message filled in.
  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${form.first} ${form.last}`);
    const body = encodeURIComponent(
      `Name: ${form.first} ${form.last}\nEmail: ${form.email}\nPhone: ${form.phone}\n\n${form.message}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus(`Opening your email app... if nothing opens, write to me at ${profile.email}`);
    setForm(empty);
  };

  return (
    <section id="contacts" className="contacts-section">
      <div className="wrapper">
        <div className="horizontal_line" />
        <div className="contact_container">
          <h2 className="contacts-title">
            Contacts
            <span className="contacts-arrow">
              <img src={arrow} className="contact_arrow" alt="" />
            </span>
          </h2>
          <div className="social-icons">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                className="social-icon"
                aria-label={label}
                target={href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noopener noreferrer"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>

        <form id="contact-form" className="contact-form" onSubmit={onSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first" value={form.first} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last" value={form.last} onChange={onChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Mail</label>
              <input type="email" id="email" name="email" value={form.email} onChange={onChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" name="phone" value={form.phone} onChange={onChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              placeholder="Write Your Message"
              value={form.message}
              onChange={onChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Submit
          </button>
          {status && <p className="form-status">{status}</p>}
        </form>

        <p className="copyright">
          &copy; Copyright {new Date().getFullYear()} {profile.firstName} {profile.lastName}. All rights reserved.
        </p>
      </div>
    </section>
  );
}

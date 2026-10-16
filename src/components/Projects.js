import React from 'react';
import { FaArrowRight } from 'react-icons/fa';
import arrow from '../images/arrow-b-b.png';
import { projects } from '../data';

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      <div className="wrapper">
        <div className="project-grid">
          <div className="project_header">
            <h2 className="projects-title">
              <span className="projects-subtitle">My completed</span>
              Projects
              <span className="projects-arrow">
                <img src={arrow} className="project_arrow" alt="" />
              </span>
            </h2>
            <p className="projects-description">
              A selection of client websites and apps I've built across
              e-commerce, EdTech, real estate, and email design.
            </p>
          </div>

          {projects.map(({ title, text, tags, image, Icon, link, status }) => (
            <div className="project-item" key={title}>
              <div className="project-image">
                <img src={image} alt={`${title} project preview`} loading="lazy" />
                {status && <span className="project-status">{status}</span>}
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="tags">
                {tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {link && (
                <a className="project-link" href={link} target="_blank" rel="noopener noreferrer">
                  Visit site <FaArrowRight aria-hidden="true" />
                </a>
              )}
              <div className="project_social">
                <Icon aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

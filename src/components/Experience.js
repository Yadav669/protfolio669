import React from 'react';
import arrow from '../images/arrow-b-b.png';
import { experience, techStack } from '../data';

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="wrapper">
        <h2 className="experience-title">
          <span className="experience-subtitle">My career</span>
          Work
          <br />
          <span className="experiencesubword">Experience</span>
          <span>
            <img src={arrow} className="experience_arrow" alt="" />
          </span>
        </h2>
        <p className="experience-description">
          Where I've worked, what I've built, and the tools I use to do it.
        </p>

        <div className="timeline">
          {experience.map((item) => (
            <div className="timeline-item" key={`${item.company}-${item.dates}`}>
              <span className="timeline-dot" />
              <div className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <h3 className="timeline-role">{item.role}</h3>
                    <p className="timeline-company">
                      <span>{item.company}</span>
                      <span className="timeline-meta">
                        {' '}
                        &bull; {item.place} &bull; {item.type}
                      </span>
                    </p>
                  </div>
                  <span className="timeline-date">{item.dates}</span>
                </div>

                <p className="timeline-summary">{item.summary}</p>

                {item.points.length > 0 && (
                  <ul className="timeline-points">
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                )}

                {item.projects.length > 0 && (
                  <div className="timeline-projects">
                    <small>Projects:</small>
                    <div className="tags">
                      {item.projects.map((p) => (
                        <span key={p}>{p}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="techstack">
          <h3>Tech I work with</h3>
          <div className="tech-grid">
            {techStack.map(({ name, Icon, color }) => (
              <div className="tech-item" key={name}>
                <Icon style={{ color }} aria-hidden="true" />
                <span>{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

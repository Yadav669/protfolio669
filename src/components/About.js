import React from 'react';
import arrow from '../images/arrow-b-b.png';
import { profile, stats, skills } from '../data';

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="wrapper">
        <div className="main_about">
          <div className="about-content">
            <h2 className="about-title">
              <span className="about-subtitle">Something</span>
              About
              <br />
              <span className="aboutsubword">Me</span>
              <span>
                <img src={arrow} className="about-arrow" alt="" />
              </span>
            </h2>
            <p className="about-description">{profile.aboutText}</p>
          </div>

          <div className="stats">
            {stats.map((s) => {
              const inner = (
                <>
                  <h3>{s.value}</h3>
                  <p>{s.label}</p>
                </>
              );
              return s.href ? (
                <a key={s.label} href={s.href} className="stat-item">
                  {inner}
                </a>
              ) : (
                <div key={s.label} className="stat-item">
                  {inner}
                </div>
              );
            })}
          </div>
        </div>

        <div className="skills">
          {skills.map((skill) => (
            <div className="skill-item" key={skill.title}>
              <div className="skill-icon">
                <img src={skill.icon} alt="" />
              </div>
              <h4>{skill.title}</h4>
              <p>{skill.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

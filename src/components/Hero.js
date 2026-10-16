import React from 'react';
import heroImg from '../images/hero.png';
import arrow from '../images/arrow-p.png';
import { profile } from '../data';

export default function Hero() {
  return (
    <section id="home">
      <div className="wrapper">
        <img
          src={heroImg}
          alt="Code editor showing Satish Yadav's developer profile, surrounded by React, JavaScript, PHP, Laravel, Node.js and MongoDB logos"
          className="profile-image"
        />
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-subtitle">I am</span>
            {profile.firstName}
            <br />
            <span className="herosubword">{profile.lastName}</span>
            <span>
              <img src={arrow} className="textarrow" alt="" />
            </span>
          </h1>
          <p className="hero-description">{profile.heroText}</p>
        </div>
      </div>
    </section>
  );
}

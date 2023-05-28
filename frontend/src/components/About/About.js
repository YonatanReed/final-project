import './About.css';
import React from 'react';
import aboutAuthor from '../../images/author.jpg';

function About() {
  return (
    <section className="about">
      <img src={aboutAuthor} alt="Author" className="about__image" />
      <div className="about__content">
        <h2 className="about__header">About me</h2>
        <p className="about__paragraph">I'm yonatan, web developer and fitness trainer,
         I've been working in finance couple of years and decided to do something more creativly challenging
          and pursue my passion for building and learning new things </p>
        <p className="about__paragraph">in Practicum I've learned new hands on tools for
        developing full stack applications, and a better understanding how development proccess works </p>
      </div>
    </section>
  );
}

export default About;

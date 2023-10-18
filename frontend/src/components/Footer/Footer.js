import './Footer.css';
import React from 'react';
import facebookLogo from '../../images/facebookLogo.svg';
import githubLogo from '../../images/githubLogo.svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">
        © {new Date().getFullYear()} Supersite, Powered by News API
      </p>
      <nav className="footer__links">
        <div className="footer__links-left">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
            href="https://practicum.com/en-isr/?gclid=Cj0KCQjwwfiaBhC7ARIsAGvcPe44AsQbWf8dlUVIisrh7weSDwwEYcPtwS8VgCjUM3fyGoFcVCfI5G4aAhBqEALw_wcB"
          >
            Practicum
          </a>
        </div>
        <div className="footer__links-right">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.co/yonatanreed"
            className="footer__link"
          >
            <img
              src={githubLogo}
              alt="Github logo"
              className="footer__github-logo"
            />
          </a>
          <a
            href="https://www.facebook.com/Practicum-Israel-100130606032857/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            <img
              src={facebookLogo}
              alt="Facebook logo"
              className="footer__facebook-logo"
            />
          </a>
        </div>
      </nav>
    </footer>
  );
}

export default Footer;

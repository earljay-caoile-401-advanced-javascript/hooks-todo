import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import '../styles/footer.scss';

/**
 * Simple footer content that shows up on every page. Contains name and shameless social media plugs
 *
 * @component
 * @example
 * return (
 *   <Footer />
 * )
 */
function Footer() {
  return (
    <footer id="main-footer">
      <p>Created by Earl Jay Caoile</p>
      <div className="url-icons">
        <a href="https://www.linkedin.com/in/earl-jay-caoile/">
          <FontAwesomeIcon icon={faLinkedin} size="lg" />
        </a>
        <a href="https://github.com/ecaoile">
          <FontAwesomeIcon icon={faGithub} size="lg" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

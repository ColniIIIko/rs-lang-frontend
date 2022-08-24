import React from 'react';
import './style.scss';

function Footer() {
  return (
    <div className='footer-wrapper'>
      <footer className='footer'>
        <p className='footer__copy'>2022©</p>
        <a
          href='https://github.com/ColniIIIko'
          target={'_blank'}
        >
          <div className='footer__git'>
            <p className='git-text'>@ColniIIIko</p>
            <img
              className='git-img'
              src='/assets/svg/git.svg'
            />
          </div>
        </a>
      </footer>
    </div>
  );
}

export default Footer;

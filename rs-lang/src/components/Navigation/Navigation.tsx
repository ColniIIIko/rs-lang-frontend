import React from 'react';
import './style.scss';

type NavigationProps = {
  pages: string[];
  currentPage: string;
};

function Navigation({ currentPage, pages }: NavigationProps) {
  return (
    <nav>
      <ul className='navigation'>
        {pages.map((page, index) => (
          <li
            key={index}
            className={['navigation__elem', `${currentPage === page ? 'active' : ''}`].join(' ')}
          >
            {`${page}${currentPage === page ? '*' : ''}`}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;

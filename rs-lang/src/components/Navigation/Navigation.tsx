import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

type NavigationProps = {
  pages: {
    pageName: string;
    route: string;
  }[];
  currentPage: string;
  onClick?: () => void;
};

function Navigation({ currentPage, pages, onClick }: NavigationProps) {
  return (
    <nav>
      <ul className='navigation'>
        {pages.map((page, index) => (
          <li
            onClick={onClick}
            key={index}
            className={['navigation__elem', `${currentPage === page.pageName ? 'active' : ''}`].join(' ')}
          >
            <Link
              className={['navigation__elem', `${currentPage === page.pageName ? 'active' : ''}`].join(' ')}
              to={page.route}
            >
              {page.pageName}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;

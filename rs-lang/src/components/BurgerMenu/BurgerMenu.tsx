import React, { ReactNode, useState } from 'react';
import './style.scss';

type Prop = {
  children: JSX.Element | JSX.Element[];
};

function BurgerMenu({ children }: Prop) {
  const [isActive, setActive] = useState(false);

  return (
    <>
      <div
        className='burger-ico'
        onClick={() => setActive(true)}
      >
        <span className='burger-line'></span>
      </div>
      <div
        className={`${isActive ? 'burger-menu-wrapper active' : 'burger-menu-wrapper'}`}
        onClick={() => setActive(false)}
      >
        <div
          className='burger-menu'
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;

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
          <div
            className='burger-menu__close'
            onClick={() => setActive(false)}
          >
            <span className='close_cross1'></span>
            <span className='close_cross2'></span>
          </div>
          {children}
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;

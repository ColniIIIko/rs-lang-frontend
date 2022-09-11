import React, { ReactNode, useState } from 'react';
import ButtonAuth from '../Buttons/ButtonAuth';
import ButtonUser from '../Buttons/ButtonUser';
import Navigation from '../Navigation/Navigation';
import './style.scss';

type Prop = {
  currentPage: string;
  isAuth: boolean;
};

function BurgerMenu({ currentPage, isAuth }: Prop) {
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
          <Navigation
            onClick={() => {
              setActive(false);
            }}
            currentPage={currentPage}
            pages={[
              { pageName: 'Главная', route: '/' },
              { pageName: 'Учебник', route: '/book' },
              { pageName: 'Игры', route: '/games' },
            ]}
          />
          {isAuth ? (
            <ButtonUser
              onClick={() => {
                setActive(false);
              }}
            />
          ) : (
            <ButtonAuth
              onClick={() => {
                setActive(false);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default BurgerMenu;

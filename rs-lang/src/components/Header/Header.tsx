import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import ButtonAuth from '../Buttons/ButtonAuth';
import ButtonUser from '../Buttons/ButtonUser';
import Logo from '../Logo/Logo';
import Navigation from '../Navigation/Navigation';
import './style.scss';

type HeaderProps = {
  currentPage: string;
};

function Header({ currentPage }: HeaderProps) {
  const { isAuth } = useAuth();
  return (
    <div className='header-wrapper'>
      <header className='header'>
        <Logo />
        <div className='header-nav-wrapper'>
          <Navigation
            currentPage={currentPage}
            pages={[
              { pageName: 'Главная', route: '/' },
              { pageName: 'Учебник', route: '/book' },
              { pageName: 'Игры', route: '/games' },
            ]}
          />
          {isAuth ? <ButtonUser /> : <ButtonAuth />}
        </div>
        <BurgerMenu>
          <Navigation
            currentPage={currentPage}
            pages={[
              { pageName: 'Главная', route: '/' },
              { pageName: 'Учебник', route: '/book' },
              { pageName: 'Игры', route: '/games' },
            ]}
          />
          {isAuth ? <ButtonUser /> : <ButtonAuth />}
        </BurgerMenu>
      </header>
    </div>
  );
}

export default Header;

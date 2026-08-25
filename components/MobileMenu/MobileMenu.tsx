// components/MobileMenu/MobileMenu.tsx
'use client';

import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import css from './MobileMenu.module.css';

interface MobileMenuProps {
  onLinkClick: () => void;
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const MobileMenu = ({ onLinkClick, onLoginClick, onRegisterClick }: MobileMenuProps) => {
  return (
    <div className={css.mobileMenuContainer}>
      <Navigation onLinkClick={onLinkClick} />
      <AuthNav onLoginClick={onLoginClick} onRegisterClick={onRegisterClick} />
    </div>
  );
};

export default MobileMenu;

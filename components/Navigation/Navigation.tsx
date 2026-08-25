'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/stores/authStore';
import s from './Navigation.module.css';

interface NavigationProps {
  onLinkClick?: () => void;
}

const Navigation = ({ onLinkClick }: NavigationProps) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <nav className={s.nav}>
      <ul className={s.navLinksList}>
        <li>
          <Link onClick={onLinkClick} href="/" className={s.navLink}>
            Home
          </Link>
        </li>
        <li>
          <Link onClick={onLinkClick} href="/teachers" className={s.navLink}>
            Teachers
          </Link>
        </li>
        <li>
          {isAuthenticated && (
            <Link onClick={onLinkClick} href="/favorites" className={s.navLink}>
              Favorites
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;

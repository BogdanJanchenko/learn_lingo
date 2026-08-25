'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useAuthStore } from '@/lib/stores/authStore';
import css from './Header.module.css';

import Container from '../Container/Container';
import Navigation from '../Navigation/Navigation';
import AuthNav from '../AuthNav/AuthNav';
import MobileMenu from '../MobileMenu/MobileMenu';
import Modal from '@/components/Modal/Modal';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register' | null>(null);

  const setUser = useAuthStore((state) => state.setUser);

  // Слежка за статусом авторизации — Header монтируется на каждой странице,
  // поэтому подписка живёт здесь, без отдельного AuthProvider
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return unsubscribe;
  }, [setUser]);

  function openLogin() {
    setIsMobileMenuOpen(false);
    setAuthMode('login');
  }

  function openRegister() {
    setIsMobileMenuOpen(false);
    setAuthMode('register');
  }

  function closeAuthModal() {
    setAuthMode(null);
  }

  return (
    <Container>
      <header className={css.header}>
        <Link className={css.navLinkLogo} href="/">
          <Image
            className={css.headerLogo}
            src="/images/round.png"
            alt="LearnLingo Logo"
            width={28}
            height={28}
          />
          <p className={css.headerTitle}>LearnLingo</p>
        </Link>

        <div className={css.nav}>
          <Navigation onLinkClick={() => {}} />
        </div>

        <div className={css.authNav}>
          <AuthNav onLoginClick={openLogin} onRegisterClick={openRegister} />
        </div>

        <button
          type="button"
          className={css.headerBurger}
          onClick={() => setIsMobileMenuOpen(true)}
          aria-label="Відкрити меню"
        >
          <svg
            className={css.headerBurger}
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path d="M4 18L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 12L20 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M4 6L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <Modal isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <MobileMenu
            onLinkClick={() => setIsMobileMenuOpen(false)}
            onLoginClick={openLogin}
            onRegisterClick={openRegister}
          />
        </Modal>

        <Modal isOpen={authMode !== null} onClose={closeAuthModal}>
          {authMode === 'register' ? (
            <RegisterForm onSuccess={closeAuthModal} />
          ) : (
            <LoginForm onSuccess={closeAuthModal} />
          )}
        </Modal>
      </header>
    </Container>
  );
};

export default Header;

'use client';

import { useAuthStore } from '@/lib/stores/authStore';
import { logoutUser } from '@/lib/firebase/auth';
import { LoginIcon } from '../LoginIcon/LoginIcon';
import css from './AuthNav.module.css';

interface AuthNavProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
}

const AuthNav = ({ onLoginClick, onRegisterClick }: AuthNavProps) => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    return (
      <div className={css.userBlock}>
        <span className={css.userName}>
          Hello, {currentUser?.displayName || currentUser?.email}!
        </span>
        <button type="button" className={css.logoutButton} onClick={() => logoutUser()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav>
      <ul className={css.loginRegisterLinksList}>
        <li>
          <button type="button" onClick={onLoginClick} className={css.loginButton}>
            <svg
              className={css.loginIcon}
              width="24"
              height="24"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M12.5 2.5H13.5C14.9001 2.5 15.6002 2.5 16.135 2.77248C16.6054 3.01217 16.9878 3.39462 17.2275 3.86502C17.5 4.3998 17.5 5.09987 17.5 6.5V13.5C17.5 14.9001 17.5 15.6002 17.2275 16.135C16.9878 16.6054 16.6054 16.9878 16.135 17.2275C15.6002 17.5 14.9001 17.5 13.5 17.5H12.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.33333 14.1666L12.5 9.99992L8.33333 5.83325M12.5 9.99992L2.5 9.99992"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Login
          </button>
        </li>
        <li>
          <button type="button" onClick={onRegisterClick} className={css.registerButton}>
            Register
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AuthNav;

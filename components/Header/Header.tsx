import Link from 'next/link';
import Image from 'next/image';
import css from './Header.module.css';

const Header = () => {
  return (
    <header className={css.header}>
      <nav>
        <Link className={css.navLink} href="/">
          <Image
            className={css.headerLogo}
            src="/icons/logo-icon.svg"
            alt="Travel Trucks Logo"
            width={40}
            height={40}
          />
        </Link>
        <div className={css.navMenu}>
          <Link className={css.navLink} href="/">
            Home
          </Link>
          <Link className={css.navLink} href="/catalog">
            Catalog
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

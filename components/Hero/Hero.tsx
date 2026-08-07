import Link from 'next/link';
import Image from 'next/image';
import css from './Hero.module.css';

const Hero = () => {
  return (
    <section className={css.hero}>
      <Image className={css.img} src="/images/hero.jpg" alt="Camper van" fill priority />
      <div className={css.heroContent}>
        <h1>Campers of your dreams</h1>
        <p>You can find everything you want in our catalog</p>
        <Link href="/catalog">
          <button type="button">View Now</button>
        </Link>
      </div>
    </section>
  );
};

export default Hero;

import Container from '../Container/Container';
import css from './StatsBlock.module.css';

const StatsBlock = () => {
  return (
    <Container>
      <ul className={css.statsList}>
        <li className={css.statsItem}>
          <p className={css.statsNumber}>32,000 +</p>
          <p className={css.statsDesc}>Experienced tutors</p>
        </li>
        <li className={css.statsItem}>
          <p className={css.statsNumber}>300,000 +</p>
          <p className={css.statsDesc}>5-star tutor reviews</p>
        </li>
        <li className={css.statsItem}>
          <p className={css.statsNumber}>120 +</p>
          <p className={css.statsDesc}>Subjects taught</p>
        </li>
        <li className={css.statsItem}>
          <p className={css.statsNumber}>200 +</p>
          <p className={css.statsDesc}>Tutor nationalities</p>
        </li>
      </ul>
    </Container>
  );
};

export default StatsBlock;

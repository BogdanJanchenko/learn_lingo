import Container from '@/components/Container/Container';
import s from './NoCards.module.css';

const NoCards = () => {
  return (
    <Container>
      <div className={s.noCardsBlock}>
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M24 8L8 24"
            stroke="#121417"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 8L24 24"
            stroke="#121417"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h2 className={s.noCardsTitle}>0 results, try changing something</h2>
      </div>
    </Container>
  );
};

export default NoCards;

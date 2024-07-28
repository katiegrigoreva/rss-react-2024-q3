import { Link } from 'react-router-dom';
import './pagination.css';

type paginationProps = {
  heroesPerPage: number;
  totalHeroes: number;
  onChangePage: () => void;
};

const Pagination = ({ heroesPerPage, totalHeroes, onChangePage }: paginationProps) => {
  const pageNumbers = [];
  const offset = new URLSearchParams(location.search).get('offset');
  const offsetToUse = offset ? offset : '0';

  for (let i = 1; i <= Math.ceil(totalHeroes / heroesPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map((pageNum, i) => (
        <li
          className="pagination__item"
          key={pageNum}
          onClick={() => {
            onChangePage();
          }}
        >
          <Link
            to={`?limit=8&offset=${heroesPerPage * i}`}
            className={`pagination__link ${offsetToUse === (heroesPerPage * i).toString() ? 'active' : ''}`}
          >
            {pageNum}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;

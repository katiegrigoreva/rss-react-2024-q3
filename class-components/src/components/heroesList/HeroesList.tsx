import { useState, useContext, useEffect, BaseSyntheticEvent } from 'react';
import './heroesList.css';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Pagination from '../pagination/Pagination';
import { Outlet, useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import { useGetAllHeroesQuery, heroData } from '../../api/apiSlice';
import { getTransformedData } from '../../helpers/getTransformedData';
import { apiConstants } from '../../api/apiConstants';
import { Flyout } from '../flyout/Flyout';

export type HeroesListProps = {
  heroesList: heroData[];
  totalHeroes: number;
};

const HeroesList = (props: HeroesListProps) => {
  const [query, setQuery] = useState(apiConstants._baseQuery);
  const navigate = useNavigate();
  const context = useContext(ThemeContext);
  const { data, isLoading, isFetching, isError } = useGetAllHeroesQuery(query);

  useEffect(() => {
    localStorage.removeItem('searchTerm');
    navigate('/');
  }, []);

  const changePage = (searchQuery: string) => {
    if (localStorage.getItem('searchTerm') === '' || localStorage.getItem('searchTerm') === null) {
      setQuery(searchQuery);
    }
  };
  const [isFlyout, setIsFlyout] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number>(0);

  function renderItems(arr: heroData[]) {
    const items = arr.map((item) => {
      return (
        <li
          className={`hero__item hero__item_${context.theme}`}
          key={item.name}
          onClick={(event: BaseSyntheticEvent) => {
            if (event.target.className !== 'checkbox') {
              navigate(`details/id:${item.id}`);
            }
          }}
        >
          <input
            type="checkbox"
            className="checkbox"
            name="tabs"
            onClick={(e: BaseSyntheticEvent) => {
              if (e.target.checked) {
                setIsFlyout(true);
                setSelectedItems(() => selectedItems + 1);
              } else {
                setSelectedItems(() => selectedItems - 1);
              }
            }}
          />
          <img src={item.img} alt={item.name} />
          <div className="hero__name">{item.name}</div>
          <div className="hero__descr">{item.description}</div>
        </li>
      );
    });
    return items.length !== 0 ? items : <h3>There is no hero with such name</h3>;
  }

  const items = renderItems(props.heroesList.length ? props.heroesList : getTransformedData(data).heroesList);
  const spinner = isLoading || isFetching ? <Spinner /> : null;
  const content = isLoading || isFetching ? null : items;
  const errorMessage = isError ? <ErrorMessage /> : null;
  const flyout = isFlyout ? <Flyout selectedItems={selectedItems} /> : null;

  return (
    <>
      <section className="hero">
        {spinner}
        {errorMessage}
        <div className="hero__list">{content}</div>
        <Outlet />
      </section>
      <Pagination
        totalHeroes={props.totalHeroes ? props.totalHeroes : getTransformedData(data).totalHeroes}
        onChangePage={changePage}
      />
      {flyout}
    </>
  );
};
export default HeroesList;

import { useState, useEffect } from 'react';
import ApiConnector, { heroData } from '../../api/ApiConnector';
import './heroesList.css';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Pagination from '../pagination/Pagination';
import { apiConstants } from '../../api/apiConstants';
import { Outlet, useNavigate } from 'react-router';
import { useLocalStorage } from '../../hooks/useLocalStorage';

type HeroesListProps = {
  heroesList: heroData[];
  totalHeroes: number;
};

const HeroesList = (props: HeroesListProps) => {
  const [heroesList, setHeroesList] = useState<heroData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [heroesPerPage] = useState(8);
  const [totalHeroes, setTotalHeroes] = useState(0);
  const [localStorageValue] = useLocalStorage('searchTerm', '');
  const navigate = useNavigate();
  const maxTotalHeroes: number = 100;
  const apiConnector = new ApiConnector();

  useEffect(() => {
    getHeroesList(apiConstants._baseQuery);
  }, []);

  useEffect(() => {
    onListLoaded(props.heroesList);
    setTotalHeroes(0);
  }, [props.heroesList]);

  const getHeroesList = (query: string) => {
    setLoading(() => true);

    if (localStorageValue) {
      /* const term = localStorage.getItem('searchTerm');
      const termToUse = term ? term : ''; */
      apiConnector
        .getSearchData(localStorageValue, query)
        .then((data) => {
          onListLoaded(data.heroesList);
          setTotalHeroes(data.totalHeroes);
        })
        .catch(onError)
        .finally(() => {
          setLoading(false);
        });
    } else {
      apiConnector
        .getAllHeroes(query)
        .then((data: HeroesListProps) => {
          onListLoaded(data.heroesList);
          setTotalHeroes(data.totalHeroes < maxTotalHeroes ? data.totalHeroes : maxTotalHeroes);
        })
        .catch(onError)
        .finally(() => {
          setLoading(() => false);
        });
    }
  };

  const onListLoaded = (newHeroesList: heroData[]) => {
    setHeroesList(() => newHeroesList);
  };

  const onError = () => {
    setError(true);
  };

  function renderItems(arr: heroData[]) {
    const items = arr.map((item) => {
      return (
        <li
          className="hero__item"
          key={item.name}
          onClick={() => {
            navigate(`details/id:${item.id}`);
          }}
        >
          <img src={item.img} alt={item.name} />
          <div className="hero__name">{item.name}</div>
          <div className="hero__descr">{item.description}</div>
        </li>
      );
    });
    return items.length !== 0 ? items : <h3>There is no hero with such name</h3>;
  }

  const items = renderItems(heroesList);
  const spinner = loading ? <Spinner /> : null;
  const content = loading ? null : items;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <>
      <section className="hero">
        {spinner}
        {errorMessage}
        <div className="hero__list">{content}</div>
        <Outlet />
      </section>
      <Pagination
        heroesPerPage={heroesPerPage}
        totalHeroes={totalHeroes ? totalHeroes : props.totalHeroes}
        onChangePage={() => getHeroesList(location.search.slice(1))}
      />
    </>
  );
};
export default HeroesList;

import { useEffect, useState } from 'react';
import HeroesList from '../../heroesList/HeroesList';
import SearchPanel from '../../searchPanel/SearchPanel';
import { ThemeSelector } from '../../themeSelector/ThemeSelector';
import './mainPage.css';
import { useGetSearchHeroesQuery } from '../../../api/apiSlice';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Spinner from '../../spinner/Spinner';
import { getTransformedData } from '../../../helpers/getTransformedData';
import { apiConstants } from '../../../api/apiConstants';
import { useLocation, useNavigate } from 'react-router';

const Main = () => {
  const [term, setTerm] = useState<string>();
  const [query, setQuery] = useState<string>(apiConstants._baseQuery);
  const [isSearch, setIsSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { data, isLoading, isFetching, isError } = useGetSearchHeroesQuery(
    { searchValue: term, query: query.slice(1) },
    {
      skip: isSearch === false,
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    setQuery(location.search.length ? location.search : apiConstants._baseQuery);
  }, [location]);

  const onUpdateSearch = (newTerm: string) => {
    setIsSearch(false);
    setTerm(newTerm);
  };

  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading || isFetching ? <Spinner /> : null;

  return (
    <>
      <section className="controlPanel">
        <div className="searchPanel">
          <SearchPanel onUpdateSearch={onUpdateSearch} />
          <button
            className="searchPanel__btn"
            onClick={() => {
              setIsSearch(true);
              navigate('/');
            }}
          >
            Search
          </button>
        </div>
        <ThemeSelector />
      </section>
      {spinner}
      {errorMessage}
      <HeroesList heroesList={getTransformedData(data).heroesList} totalHeroes={getTransformedData(data).totalHeroes} />
    </>
  );
};

export default Main;

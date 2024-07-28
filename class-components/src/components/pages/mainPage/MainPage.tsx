import { useEffect, useState } from 'react';
import ApiConnector, { heroData } from '../../../api/ApiConnector';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import HeroesList from '../../heroesList/HeroesList';
import SearchPanel from '../../searchPanel/SearchPanel';
import Spinner from '../../spinner/Spinner';
import { useNavigate } from 'react-router';
import { apiConstants } from '../../../api/apiConstants';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

const Main = () => {
  const [term, setTerm] = useLocalStorage('searchTerm', '');
  const [heroesList, setHeroesList] = useState<heroData[]>([]);
  const [totalHeroes, setTotalHeroes] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const apiConnector = new ApiConnector();

  const onUpdateSearch = (newTerm: string) => {
    setTerm(newTerm);
  };

  useEffect(() => {
    localStorage.clear();
    navigate('/');
  }, []);

  const getSearchData = () => {
    navigate(`/?${apiConstants._baseQuery}`);
    setLoading(true);
    return apiConnector
      .getSearchData(term, apiConstants._baseQuery)
      .then((data) => {
        onUpdateHeroesList(data.heroesList);
        setTotalHeroes(data.totalHeroes);
      })
      .catch(onError)
      .finally(() => {
        setLoading(false);
      });
  };

  const onUpdateHeroesList = (newHeroesList: heroData[]) => {
    setHeroesList(newHeroesList);
  };

  const onError = () => {
    setError(true);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <>
      <div className="searchPanel">
        <SearchPanel onUpdateSearch={onUpdateSearch} />
        <button className="searchPanel__btn" onClick={getSearchData}>
          Search
        </button>
      </div>
      {spinner}
      {errorMessage}
      <HeroesList heroesList={heroesList} totalHeroes={totalHeroes} />
    </>
  );
};

export default Main;

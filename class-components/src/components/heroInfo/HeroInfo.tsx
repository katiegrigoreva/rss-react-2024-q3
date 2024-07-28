import { useState, useEffect, useRef } from 'react';
import './heroInfo.css';
import ApiConnector, { heroData } from '../../api/ApiConnector';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useLocation, useNavigate } from 'react-router';

const HeroInfo = () => {
  const [heroInfo, setHeroInfo] = useState<heroData>();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const myRef = useRef(0);
  const apiConnector = new ApiConnector();

  const indx = location.pathname.split('').findIndex((el) => el === ':');
  const id = location.pathname.slice(indx + 1);

  useEffect(() => {
    myRef.current++;
    if (id !== '') {
      setLoading(true);
      apiConnector
        .getHeroInfo(id)
        .then(onInfoLoaded)
        .catch(onError)
        .finally(() => setLoading(false));
    }
  }, [id]);

  const onClose = () => {
    navigate(-myRef.current);
  };

  const onError = () => {
    setError(true);
  };

  const onInfoLoaded = (data: heroData) => {
    window.scrollTo(0, 0);
    setHeroInfo(() => data);
  };

  const errorMsg = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;

  return (
    <div className="heroInfo">
      {spinner}
      {errorMsg}
      <img className="heroInfo__close" src="../../../assets/close.png" alt="close" onClick={onClose} />
      <img className="heroInfo__img" src={heroInfo?.img} alt={heroInfo?.name} />
      <div>
        <div className="heroInfo__name">
          NAME:<br></br> {heroInfo?.name}
        </div>
        <div className="heroInfo__descr">
          <b>DESCRIPTION:</b>
          <br></br>
          {heroInfo?.description}
        </div>
      </div>
    </div>
  );
};

export default HeroInfo;

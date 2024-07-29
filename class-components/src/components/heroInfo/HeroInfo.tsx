import { useRef, useContext, useEffect } from 'react';
import './heroInfo.css';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useLocation, useNavigate } from 'react-router';
import { ThemeContext } from '../../context/ThemeContext';
import { useGetHeroInfoQuery } from '../../api/apiSlice';

const HeroInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const myRef = useRef(0);
  const context = useContext(ThemeContext);

  const indx = location.pathname.split('').findIndex((el) => el === ':');
  const id = location.pathname.slice(indx + 1);

  const { data, isLoading, isFetching, isError } = useGetHeroInfoQuery(id, {
    skip: id === '',
  });

  useEffect(() => {
    myRef.current++;
  }, [id]);

  const onClose = () => {
    navigate(-myRef.current);
  };

  const errorMsg = isError ? <ErrorMessage /> : null;
  const spinner = isLoading || isFetching ? <Spinner /> : null;
  const heroInfo = data?.heroInfo;

  return (
    <div className={`heroInfo heroInfo_${context.theme}`}>
      {spinner}
      {errorMsg}
      <img className="heroInfo__close" src="../../../assets/close-red.png" alt="close" onClick={onClose} />
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

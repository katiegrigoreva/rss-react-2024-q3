import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <img style={{ display: 'block', width: '100%' }} src="/assets/404.webp" />
      <Link style={{ textDecoration: 'none' }} to="/">
        <button className="searchPanel__btn" style={{ display: 'block', margin: '40px auto' }}>
          Go home
        </button>
      </Link>
    </div>
  );
};
export default NotFoundPage;

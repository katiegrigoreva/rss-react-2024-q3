import './spinner.css';

const Spinner = () => {
  return (
    <div className="overlay">
      <div className="spinner-components-spinner">
        <span className="loader-spinner" role="spinner"></span>
      </div>
    </div>
  );
};

export default Spinner;

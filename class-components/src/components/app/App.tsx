import { Component } from 'react';
import Header from '../header/Header';
import SearchPanel from '../searchPanel/SearchPanel';

import './app.css';
import HeroesList, { heroesListState } from '../heroesList/HeroesList';
import ApiConnector, { heroData } from '../../api/ApiConnector';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

type AppStateType = {
  term: string;
};
export type AppProps = {
  onUpdateSearch: onUpdateSearchType;
};
export type onUpdateSearchType = {
  (arg: string): void;
};

export default class App extends Component<AppProps, AppStateType & heroesListState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      term: '',
      heroesList: [],
      loading: false,
      error: false,
    };
  }

  apiConnector = new ApiConnector();

  onUpdateSearch = (term: string) => {
    this.setState({ term });
  };

  getSearchData = () => {
    this.setState({ loading: true });
    return this.apiConnector
      .getSearchData(this.state.term)
      .then(this.onUpdateHeroesList)
      .catch(this.onError)
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  onUpdateHeroesList = (heroesList: [heroData]) => {
    this.setState({
      heroesList,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  makeError = () => {
    this.setState({
      error: true,
    });
    throw new Error('Ooooops! An error occurred!');
  };

  render() {
    const errorMessage = this.state.error ? <ErrorMessage /> : null;
    const spinner = this.state.loading ? <Spinner /> : null;

    return (
      <div className="appContainer">
        <Header />
        <div className="searchPanel">
          <SearchPanel onUpdateSearch={this.onUpdateSearch} />
          <button className="searchPanel__btn" onClick={this.getSearchData}>
            Search
          </button>
          <button className="searchPanel__btn" onClick={this.makeError}>
            Throw error
          </button>
        </div>
        {spinner}
        {errorMessage}
        <HeroesList heroesList={this.state.heroesList} />
      </div>
    );
  }
}

import { Component } from 'react';
import ApiConnector, { heroData } from '../../api/ApiConnector';
import './heroesList.css';
import Spinner from '../spinner/Spinner';

interface heroesListState {
  heroesList: [heroData] | [];
  loading: boolean;
  error: boolean;
}

type HeroesListProps = {
  heroesList: [heroData] | [];
};

class HeroesList extends Component<HeroesListProps, heroesListState> {
  constructor(props: HeroesListProps) {
    super(props);
    this.state = {
      heroesList: [],
      loading: true,
      error: false,
    };
  }

  apiConnector = new ApiConnector();

  componentDidMount() {
    this.apiConnector.getAllHeroes().then(this.onListLoaded).catch(this.onError);
  }

  componentDidUpdate(prevProps: Readonly<HeroesListProps>): void {
    if (this.props.heroesList !== prevProps.heroesList) {
      this.onListLoaded(this.props.heroesList);
    }
  }

  onListLoaded = (heroesList: [heroData] | []) => {
    this.setState({
      heroesList,
      loading: false,
    });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  renderItems(heroesList: [heroData]) {
    const items = heroesList.map((item) => {
      return (
        <li className="hero__item" key={item.name}>
          <img src={item.img} alt={item.name} />
          <div className="hero__name">{item.name}</div>
          <div className="hero__descr">{item.description}</div>
        </li>
      );
    });
    return items;
  }

  render() {
    const { heroesList, loading } = this.state;

    const items = heroesList.length ? this.renderItems(heroesList) : [];
    const spinner = loading ? <Spinner /> : null;
    const content = !loading ? items : null;
    return (
      <div className="hero__list">
        {spinner}
        {content}
      </div>
    );
  }
}
export default HeroesList;

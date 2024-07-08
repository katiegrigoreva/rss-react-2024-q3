import { ChangeEvent, Component } from 'react';
import './searchPanel.css';
import ApiConnector from '../../api/ApiConnector';
import { AppProps } from '../app/App';

class SearchPanel extends Component<AppProps, { term: string }> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      term: '',
    };
  }

  apiConnector = new ApiConnector();

  onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.trim().toLowerCase();
    this.setState({ term });
    this.props.onUpdateSearch(term);
  };

  render() {
    return (
      <input
        type="text"
        className="searchPanel__input"
        placeholder="Search your superhero"
        value={this.state.term}
        onChange={this.onUpdateSearch}
      />
    );
  }
}

export default SearchPanel;

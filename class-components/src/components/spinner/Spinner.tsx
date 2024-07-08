import { Component } from 'react';

import './spinner.css';

export default class Spinner extends Component {
  render() {
    return (
      <div className="overlay">
        <div className="spinner-components-spinner">
          <span className="loader-spinner"></span>
        </div>
      </div>
    );
  }
}

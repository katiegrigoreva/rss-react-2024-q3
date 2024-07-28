import { ChangeEvent, useState } from 'react';
import './searchPanel.css';

export type SearchPanelProps = {
  onUpdateSearch: onUpdateSearchType;
};
export type onUpdateSearchType = {
  (arg: string): void;
};

const SearchPanel = (props: SearchPanelProps) => {
  const [term, setTerm] = useState('');

  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = e.target.value.trim().toLowerCase();
    setTerm(termValue);
    props.onUpdateSearch(termValue);
  };

  return (
    <input
      type="text"
      className="searchPanel__input"
      placeholder="Search your superhero"
      value={term}
      onChange={onUpdateSearch}
    />
  );
};

export default SearchPanel;

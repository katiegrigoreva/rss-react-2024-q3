import { ChangeEvent, useContext, useState } from 'react';
import './searchPanel.css';
import { ThemeContext } from '../../context/ThemeContext';

export type SearchPanelProps = {
  onUpdateSearch: onUpdateSearchType;
};
export type onUpdateSearchType = {
  (arg: string): void;
};

const SearchPanel = (props: SearchPanelProps) => {
  const [term, setTerm] = useState('');
  const context = useContext(ThemeContext);

  const onUpdateSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const termValue = e.target.value.trim().toLowerCase();
    setTerm(termValue);
    props.onUpdateSearch(termValue);
  };

  return (
    <input
      type="text"
      className={`searchPanel__input searchPanel__input_${context.theme}`}
      placeholder="Search your superhero"
      value={term}
      onChange={onUpdateSearch}
    />
  );
};

export default SearchPanel;

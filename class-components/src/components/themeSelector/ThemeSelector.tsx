import { useContext } from 'react';
import './themeSelector.css';
import { ThemeContext } from '../../context/ThemeContext';

export const ThemeSelector = () => {
  const context = useContext(ThemeContext);

  return (
    <div className="themeTabs">
      {context.theme === 'light' ? (
        <input type="radio" id="radio-1" name="tabs" onChange={context.toggleTheme} checked />
      ) : (
        <input type="radio" id="radio-1" name="tabs" onChange={context.toggleTheme} />
      )}
      <label className="tab" htmlFor="radio-1">
        Light
      </label>
      {context.theme === 'dark' ? (
        <input type="radio" id="radio-2" name="tabs" onChange={context.toggleTheme} checked />
      ) : (
        <input type="radio" id="radio-2" name="tabs" onChange={context.toggleTheme} />
      )}
      <label className="tab" htmlFor="radio-2">
        Dark
      </label>
      <span className="glider"></span>
    </div>
  );
};

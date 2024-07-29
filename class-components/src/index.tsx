import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
} else {
  throw new Error('Root element is not created');
}

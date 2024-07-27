import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';
import { ThemeProvider } from './context/ThemeContext';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </ErrorBoundary>
  );
} else {
  throw new Error('Root element is not created');
}

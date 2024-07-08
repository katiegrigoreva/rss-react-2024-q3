import { createRoot } from 'react-dom/client';
import App from './components/app/App';
import './style/style.css';
import ErrorBoundary from './components/errorBoundary/ErrorBoundary';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <ErrorBoundary>
      <App onUpdateSearch={() => {}} />
    </ErrorBoundary>
  );
} else {
  throw new Error('Root element is not created');
}

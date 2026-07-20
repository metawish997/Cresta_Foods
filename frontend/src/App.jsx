import { HashRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PageContentProvider } from './context/PageContentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PageContentProvider>
        <HashRouter>
          <AppRoutes />
        </HashRouter>
      </PageContentProvider>
    </AuthProvider>
  );
}

export default App;

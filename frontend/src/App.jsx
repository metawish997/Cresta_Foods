import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PageContentProvider } from './context/PageContentContext';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <PageContentProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </PageContentProvider>
    </AuthProvider>
  );
}

export default App;

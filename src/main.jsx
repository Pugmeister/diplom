import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import Router from './routes/Routes';
import AuthProvider from './providers/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router/>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
)


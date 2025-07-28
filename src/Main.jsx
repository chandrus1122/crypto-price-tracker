import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './App'; // ✅ Import your main app component
import './index.css'; // ✅ Optional CSS import

const queryClient = new QueryClient();

const Main = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <App />
    </Router>
  </QueryClientProvider>
);

// Mount the app
ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

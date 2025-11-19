import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductsProvider } from './components/contexts/ProductsContext';
import ProductsPage from './components/pages/ProductsPage';
import AddProduct from './components/pages/AddProduct';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ProductsProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/products" />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </ProductsProvider>
  );
}

export default App;

import React, { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext();

export function ProductsProvider({ children }) {
  const [productsData, setProductsData] = useState({ data: [], meta: {} });
  const [query, setQuery] = useState({ search: '', category: '', sort: '', page: 1, limit: 6 });
  const [loading, setLoading] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  const fetchProducts = async (q = query) => {
    setLoading(true);
    try {
      const params = new URLSearchParams(q).toString();
      const res = await fetch(`${API_BASE}/api/products?${params}`);
      const json = await res.json();
      setProductsData(json);
    } catch (err) {
      console.error("Fetch products failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => { fetchProducts(); }, [query.search, query.category, query.sort, query.page]);

  return (
    <ProductsContext.Provider value={{ productsData, fetchProducts, query, setQuery, loading }}>
      {children}
    </ProductsContext.Provider>
  );
}

import React, { useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';

export default function ProductsPage() {
  const { productsData, query, setQuery, loading } = useContext(ProductsContext);
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <div className="flex justify-between mb-4">
        <input type="text" placeholder="Search" value={query.search} onChange={e => setQuery({...query, search:e.target.value, page:1})} className="border p-2 rounded"/>
        <select value={query.category} onChange={e => setQuery({...query, category:e.target.value, page:1})} className="border p-2 rounded">
          <option value="">All Categories</option>
          <option>Electronics</option>
          <option>Home</option>
          <option>Fashion</option>
        </select>
        <select value={query.sort} onChange={e => setQuery({...query, sort:e.target.value})} className="border p-2 rounded">
          <option value="">Newest</option>
          <option value="price_asc">Price: Low → High</option>
          <option value="price_desc">Price: High → Low</option>
        </select>
        <button onClick={() => navigate('/add-product')} className="bg-blue-500 text-white rounded-lg px-4 py-2">+ Add Product</button>
      </div>

      {loading ? <p>Loading...</p> : (
        <div className="grid grid-cols-3 gap-6">
          {productsData.data.map(p => (
            <div key={p._id} className="shadow-lg rounded-xl p-4 hover:scale-105 transform transition">
              {p.imageUrl && <img src={`http://localhost:5000${p.imageUrl}`} alt={p.name} className="h-40 w-full object-cover rounded" />}
              <h3 className="mt-2 font-semibold">{p.name}</h3>
              <p>₹{p.price}</p>
              <p className="text-gray-500">{p.category}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-2 justify-center mt-4">
        {Array.from({length: productsData.meta.totalPages || 1}, (_, i) => (
          <button key={i} onClick={()=>setQuery({...query, page:i+1})} className={`px-3 py-1 border ${query.page===i+1?'bg-blue-500 text-white':'bg-white'}`}>
            {i+1}
          </button>
        ))}
      </div>
    </div>
  );
}

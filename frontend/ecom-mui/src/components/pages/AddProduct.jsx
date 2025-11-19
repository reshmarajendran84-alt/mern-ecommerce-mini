import React, { useState, useContext } from 'react';
import { ProductsContext } from '../contexts/ProductsContext';
import { useNavigate } from 'react-router-dom';

export default function AddProduct() {
  const { fetchProducts } = useContext(ProductsContext);
  const [name,setName] = useState('');
  const [price,setPrice] = useState('');
  const [category,setCategory] = useState('');
  const [imageFile,setImageFile] = useState(null);
  const navigate = useNavigate();

  const onSubmit = async e => {
    e.preventDefault();
    if(!name||!price||!category) return alert('Fill all fields');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    if(imageFile) formData.append('image', imageFile);

    const res = await fetch(`${import.meta.env.VITE_API_BASE || 'http://localhost:5000'}/api/products`, { method:'POST', body:formData });
    if(res.ok){
      await fetchProducts();
      navigate('/products');
    }else{
      const err = await res.json(); alert(err.error||err.msg||'Failed');
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto p-4 flex flex-col gap-4">
      <input value={name} onChange={e=>setName(e.target.value)} placeholder="Product Name" className="border p-2 rounded"/>
      <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="Price" className="border p-2 rounded"/>
      <select value={category} onChange={e=>setCategory(e.target.value)} className="border p-2 rounded">
        <option value="">Select Category</option>
        <option>Electronics</option>
        <option>Home</option>
        <option>Fashion</option>
      </select>
      <input type="file" accept="image/*" onChange={e=>setImageFile(e.target.files[0])}/>
      <button type="submit" className="bg-blue-500 text-white rounded-lg px-4 py-2">Add Product</button>
    </form>
  );
}

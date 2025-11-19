import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className='flex justify-between items-center bg-gray-900 text-white px-6 py-3'>
      <h1 className="text-xl font-bold cursor-pointer" onClick={()=>navigate('/products')}>MiniShop</h1>
      <input type='text' placeholder='Search Here' className='border p-2 rounded'/>
      <button className='bg-blue-500 text-white rounded-lg px-4 py-2' onClick={()=>navigate("/add-product")}>
        + Add product
      </button>
    </nav>
  );
}

export default Navbar;

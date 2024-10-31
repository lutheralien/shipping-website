import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 bg-fedex-purple text-white px-3 py-1 rounded-full text-sm">
          {product.category}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-fedex-purple font-semibold">
              {product.brand}
            </p>
            <h3 className="text-lg font-bold text-gray-800">
              {product.name}
            </h3>
          </div>
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4">
          {product.description}
        </p>
        
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-fedex-purple text-white py-2 rounded-md hover:bg-fedex-purple/90 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
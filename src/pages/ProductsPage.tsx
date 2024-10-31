// src/pages/ProductsPage.tsx
import { useState } from 'react';
import { Product } from '../types';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    // You might want to show a notification here
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Luxury Collection
        </h1>
        <p className="text-xl text-gray-600">
          Exclusive items shipped worldwide
        </p>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-fedex-purple text-white px-6 py-3 rounded-full shadow-lg">
          Cart: {cartItems.length} items - $
          {cartItems
            .reduce((total, item) => total + item.price, 0)
            .toLocaleString()}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/Homepage';
import ProductsPage from './pages/ProductsPage';
import TrackingPage from './pages/TrackingPage';
import ShippingPage from './pages/ShippingPage';
import LocationPage from './pages/LocationPage';
import SupportPage from './pages/SupportPage';

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/tracking" element={<TrackingPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/locations" element={<LocationPage />} />
          <Route path="/support" element={<SupportPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
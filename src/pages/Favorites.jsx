import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FavoritesContext } from '../context/FavoritesContext';
import { CartContext } from '../context/CartContext';
import { Heart, Plus } from 'lucide-react';
import { BASE_URL } from '../services/api';
import './Favorites.css'; // Let's use menu css for styles, or just inline / reuse Menu classes

const Favorites = () => {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const { addToCart } = useContext(CartContext);

  return (
    <div className="favorites-page container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <div className="text-center" style={{ marginBottom: '40px' }}>
        <h1 className="text-primary">Your Favorites</h1>
        <p className="text-muted">Dishes you loved</p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center" style={{ padding: '40px 0' }}>
          <Heart size={48} color="#cbd5e1" style={{ marginBottom: '16px' }} />
          <h3>No favorites yet</h3>
          <p className="text-muted">Go to the menu and click the heart icon on a dish to save it here.</p>
        </div>
      ) : (
        <div className="menu-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
          {favorites.map((item, index) => (
            <motion.div 
              key={item._id} 
              className="menu-card glass-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              style={{ position: 'relative' }}
            >
              {/* Heart Icon */}
              <button 
                onClick={() => toggleFavorite(item)}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  background: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  zIndex: 10
                }}
              >
                <Heart size={20} fill="var(--primary-color)" color="var(--primary-color)" />
              </button>

              <div className="menu-card-img">
                {item.image ? (
                  <img src={item.image.startsWith('/uploads') ? `${BASE_URL}${item.image}` : item.image} alt={item.name} />
                ) : (
                  <div className="placeholder-img">No Image</div>
                )}
                {item.dietary && (
                  <span className={`dietary-badge ${item.dietary}`}>
                    {item.dietary}
                  </span>
                )}
              </div>
              <div className="menu-card-content">
                <div className="menu-card-header">
                  <h3>{item.name}</h3>
                  <span className="price">${item.price.toFixed(2)}</span>
                </div>
                <p className="menu-card-desc">{item.description}</p>
                <button 
                  className="btn-outline add-cart-btn" 
                  onClick={() => addToCart(item)}
                  style={{ width: '100%', marginTop: '15px' }}
                >
                  <Plus size={16} /> Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

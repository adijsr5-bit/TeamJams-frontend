import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (item) => {
    setFavorites(prev => {
      const isFav = prev.find(fav => fav._id === item._id);
      let newFavs;
      if (isFav) {
        newFavs = prev.filter(fav => fav._id !== item._id);
      } else {
        newFavs = [...prev, item];
      }
      localStorage.setItem('favorites', JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (itemId) => {
    return favorites.some(fav => fav._id === itemId);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

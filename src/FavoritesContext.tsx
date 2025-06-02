import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'favorites';

type FavoritesContextType = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[] | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && stored !== 'null') {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prevFavorites => {
      if (!prevFavorites) {
        return [id];
      }
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(fav => fav !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const isFavorite = (id: string) => (favorites || []).includes(id);

  return <FavoritesContext.Provider value={{ favorites: favorites || [], toggleFavorite, isFavorite }}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used within FavoritesProvider');
  return context;
};

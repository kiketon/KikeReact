import { createContext, useState, useEffect, useContext } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState(() => {
        try {
            const saved = localStorage.getItem('favorites');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Failed to load favorites", error);
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error("Failed to save favorites", error);
        }
    }, [favorites]);

    const addToFavorites = (game) => {
        setFavorites((prev) => {
            if (prev.some(f => f.id === game.id)) return prev;
            return [...prev, game];
        });
    };

    const removeFromFavorites = (gameId) => {
        setFavorites((prev) => prev.filter(game => game.id !== gameId));
    };

    const isFavorite = (gameId) => {
        return favorites.some(game => game.id === gameId);
    };

    const toggleFavorite = (game) => {
        if (isFavorite(game.id)) {
            removeFromFavorites(game.id);
        } else {
            addToFavorites(game);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, toggleFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

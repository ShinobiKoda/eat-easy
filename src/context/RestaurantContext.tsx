import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { Restaurant } from '../services/restaurantService';

interface RestaurantContextType {
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: (restaurant: Restaurant) => void;
    isLoading: boolean;
    getStorageKey: (baseKey: string) => string;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

/**
 * Build a restaurant-scoped localStorage key.
 * e.g. getRestaurantStorageKey("abc-123", "eat-easy-cart") → "abc-123:eat-easy-cart"
 */
export function getRestaurantStorageKey(restaurantId: string | null, baseKey: string): string {
    if (!restaurantId) return baseKey; // fallback to global key if no restaurant selected
    return `${restaurantId}:${baseKey}`;
}

export const RestaurantProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [selectedRestaurant, setSelectedRestaurantState] = useState<Restaurant | null>(() => {
        const saved = localStorage.getItem('selectedRestaurant');
        return saved ? JSON.parse(saved) : null;
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initial load check
        const saved = localStorage.getItem('selectedRestaurant');
        if (saved) {
            setSelectedRestaurantState(JSON.parse(saved));
        }
        setIsLoading(false);
    }, []);

    const setSelectedRestaurant = (restaurant: Restaurant) => {
        setSelectedRestaurantState(restaurant);
        localStorage.setItem('selectedRestaurant', JSON.stringify(restaurant));
    };

    const getStorageKey = useCallback((baseKey: string) => {
        return getRestaurantStorageKey(selectedRestaurant?.id ?? null, baseKey);
    }, [selectedRestaurant?.id]);

    return (
        <RestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant, isLoading, getStorageKey }}>
            {children}
        </RestaurantContext.Provider>
    );
};

export const useRestaurant = () => {
    const context = useContext(RestaurantContext);
    if (context === undefined) {
        throw new Error('useRestaurant must be used within a RestaurantProvider');
    }
    return context;
};


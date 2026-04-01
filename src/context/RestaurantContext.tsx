import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Restaurant } from '../services/restaurantService';

interface RestaurantContextType {
    selectedRestaurant: Restaurant | null;
    setSelectedRestaurant: (restaurant: Restaurant) => void;
    isLoading: boolean;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(undefined);

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

    return (
        <RestaurantContext.Provider value={{ selectedRestaurant, setSelectedRestaurant, isLoading }}>
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

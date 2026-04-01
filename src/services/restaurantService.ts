import { supabase } from '../config/supabaseClient';

export interface Restaurant {
    id: string;
    name: string;
    location: string;
    image: string;
    description: string;
}

export const restaurantService = {
    getAllRestaurants: async (): Promise<Restaurant[]> => {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .order('name', { ascending: true });

        if (error) {
            console.error('Error fetching restaurants:', error);
            throw error;
        }

        return data || [];
    },

    getRestaurantById: async (id: string): Promise<Restaurant | null> => {
        const { data, error } = await supabase
            .from('restaurants')
            .select('*')
            .eq('id', id)
            .single();

        if (error) {
            console.error('Error fetching restaurant by ID:', error);
            throw error;
        }

        return data;
    }
};

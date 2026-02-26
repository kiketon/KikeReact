const API_KEY = "8ca6d463f6f34509a1b7f1fac1fc6ea8";
const BASE_URL = 'https://api.rawg.io/api';

const handleResponse = async (response) => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
};

export const gameService = {
    fetchGames: async ({ search, page = 1, tags, genres, publishers } = {}) => {
        let query = `&page=${page}`;
        if (search) query += `&search=${search}`;
        if (tags) query += `&tags=${tags}`;
        if (genres) query += `&genres=${genres}`;
        if (publishers) query += `&publishers=${publishers}`;

        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}${query}`);
        return await handleResponse(response);
    },

    fetchTrendingGames: async () => {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&dates=2023-01-01,2024-12-31&ordering=-added&page_size=5`);
        const data = await handleResponse(response);
        return data.results;
    },

    fetchGameDetails: async (id) => {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        return await handleResponse(response);
    },

    fetchPublishers: async ({ search, page = 1 } = {}) => {
        let query = `&page=${page}`;
        if (search) query += `&search=${search}`;

        const response = await fetch(`${BASE_URL}/publishers?key=${API_KEY}${query}`);
        return await handleResponse(response);
    },

    fetchPublisherDetails: async (id) => {
        const response = await fetch(`${BASE_URL}/publishers/${id}?key=${API_KEY}`);
        return await handleResponse(response);
    }
};

export const eventService = {
    events: [
        {
            id: 1,
            title: "Gaming Expo 2025",
            location: "New York",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 2,
            title: "Indie Game Developers Meetup",
            location: "San Francisco",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 3,
            title: "Esports Championship",
            location: "Los Angeles",
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: 4,
            title: "Retro Gaming Night",
            location: "Austin",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
        }
    ],

    fetchEvents: function () {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.events);
            }, 500);
        });
    }
};

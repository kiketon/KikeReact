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
    fetchEvents: async () => {
        // Mock data for events since no API is specified
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([
                    { id: 1, name: "E3 2026", date: "2026-06-12", location: "Los Angeles, CA", description: "The biggest gaming expo." },
                    { id: 2, name: "Gamescom 2026", date: "2026-08-20", location: "Cologne, Germany", description: "Global gaming celebration." },
                    { id: 3, name: "The Game Awards 2026", date: "2026-12-10", location: "Los Angeles, CA", description: "Celebrating the best in games." },
                ]);
            }, 500);
        });
    }
};

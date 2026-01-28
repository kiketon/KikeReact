const API_KEY = "8ca6d463f6f34509a1b7f1fac1fc6ea8";
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = (search) => {
    const query = search ? `&search=${search}` : '';
    return fetch(`${BASE_URL}/games?key=${API_KEY}${query}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            return response.json();
        })
        .then((data) => data.results)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return [];
        });
};

export const fetchTrendingGames = () => {
    return fetch(`${BASE_URL}/games?key=${API_KEY}&dates=2023-01-01,2024-12-31&ordering=-added&page_size=5`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch trending games');
            }
            return response.json();
        })
        .then((data) => data.results)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return [];
        });
};

export const fetchGameDetails = (id) => {
    return fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch game details');
            }
            return response.json();
        })
        .then((data) => data)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return null;
        });
};

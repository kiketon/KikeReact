const API_KEY = "8ca6d463f6f34509a1b7f1fac1fc6ea8";
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = ({ search, page = 1, tags, genres, publishers } = {}) => {
    let query = `&page=${page}`;
    if (search) query += `&search=${search}`;
    if (tags) query += `&tags=${tags}`;
    if (genres) query += `&genres=${genres}`;
    if (publishers) query += `&publishers=${publishers}`;

    return fetch(`${BASE_URL}/games?key=${API_KEY}${query}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch games');
            }
            return response.json();
        })
        .then((data) => data)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return { results: [], count: 0 };
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

export const fetchPublishers = ({ search, page = 1 } = {}) => {
    let query = `&page=${page}`;
    if (search) query += `&search=${search}`;

    return fetch(`${BASE_URL}/publishers?key=${API_KEY}${query}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch publishers');
            }
            return response.json();
        })
        .then((data) => data)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return { results: [], count: 0 };
        });
};

export const fetchPublisherDetails = (id) => {
    return fetch(`${BASE_URL}/publishers/${id}?key=${API_KEY}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to fetch publisher details');
            }
            return response.json();
        })
        .then((data) => data)
        .catch((error) => {
            console.error("Error al realizar la solicitud:", error);
            return null;
        });
};

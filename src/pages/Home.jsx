import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getGames, getTrendingGames } from "../redux/slices/gamesSlice";
import GameCard from "../components/GameCard";
import Carousel from "../components/Carousel";
import SearchBar from "../components/SearchBar";

export default function Home() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { items: games, trending: trendingGames, loading, totalCount } = useSelector(state => state.games);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || '';
    const currentTags = searchParams.get('tags') || '';
    const currentGenres = searchParams.get('genres') || '';
    const currentPublishers = searchParams.get('publishers') || '';

    const totalPages = Math.ceil((totalCount || 0) / 20);

    useEffect(() => {
        dispatch(getTrendingGames());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getGames({
            search: currentSearch,
            page: currentPage,
            tags: currentTags,
            genres: currentGenres,
            publishers: currentPublishers
        }));
    }, [dispatch, currentSearch, currentPage, currentTags, currentGenres, currentPublishers]);

    const handleSearch = (query) => {
        const newParams = new URLSearchParams(searchParams);
        if (query) {
            newParams.set('search', query);
        } else {
            newParams.delete('search');
        }
        newParams.set('page', '1');
        setSearchParams(newParams);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            const newParams = new URLSearchParams(searchParams);
            newParams.set('page', newPage);
            setSearchParams(newParams);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-col bg-transparent font-sans text-white">
            <main className="grow container mx-auto px-4 py-8 pt-0">
                {/* Carousel Section */}
                {trendingGames.length > 0 && <Carousel games={trendingGames} />}

                {/* Search Section */}
                <div className="mb-10 text-center mt-10">
                    <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent">
                        Encuentra tu próxima aventura
                    </h2>
                    <SearchBar onSearch={handleSearch} />
                </div>

                {/* Results Section */}
                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-[#00D400] pl-3">
                            {loading ? "Buscando..." : "Juegos"}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-900/50 rounded-2xl border border-gray-800 animate-pulse"></div>
                            ))}
                        </div>
                    ) : games.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {games.map((game) => (
                                    <GameCard key={game.id} game={game} />
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-12 mb-12 gap-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-6 py-2.5 bg-gray-900 hover:bg-[#00D400] hover:text-black disabled:opacity-30 disabled:hover:bg-gray-900 disabled:hover:text-white text-white rounded-xl font-bold transition-all border border-gray-800"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-white font-mono bg-gray-900 px-6 py-2.5 rounded-xl border border-gray-800 shadow-xl">
                                        Pág. <span className="text-[#00D400]">{currentPage}</span> / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-6 py-2.5 bg-gray-900 hover:bg-[#00D400] hover:text-black disabled:opacity-30 disabled:hover:bg-gray-900 disabled:hover:text-white text-white rounded-xl font-bold transition-all border border-gray-800"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
                            <p className="text-3xl mb-2 text-gray-500">🔍</p>
                            <p className="text-xl text-gray-400">No se encontraron juegos.</p>
                            <p className="text-gray-500 mt-2">¡Intenta buscar otra cosa o ajusta tus filtros!</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

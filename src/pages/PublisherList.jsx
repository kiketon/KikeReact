import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPublishers } from "../redux/slices/gamesSlice";
import SearchBar from "../components/SearchBar";

export default function PublisherList() {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { publishers, loading, publishersCount } = useSelector(state => state.games);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || '';
    const totalPages = Math.ceil((publishersCount || 0) / 20);

    useEffect(() => {
        dispatch(getPublishers({ search: currentSearch, page: currentPage }));
    }, [dispatch, currentSearch, currentPage]);

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
            <main className="grow container mx-auto px-4 py-8">
                <div className="mb-12 text-center mt-6">
                    <h2 className="text-4xl font-black mb-8 bg-linear-to-r from-white to-gray-500 bg-clip-text text-transparent uppercase tracking-tighter italic">
                        Explorar Publishers
                    </h2>
                    <SearchBar onSearch={handleSearch} />
                </div>

                <section>
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-sm font-bold text-white border-l-4 border-[#00D400] pl-4 uppercase tracking-widest">
                            {loading ? "Buscando..." : "Directorio de Publishers"}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-72 bg-gray-900/50 rounded-3xl border border-gray-800 animate-pulse"></div>
                            ))}
                        </div>
                    ) : publishers.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {publishers.map((publisher) => (
                                    <Link key={publisher.id} to={`/publisher/${publisher.id}`} className="block relative h-72 rounded-3xl overflow-hidden group shadow-2xl transition-all hover:-translate-y-3 border border-gray-800 hover:border-[#00D400] bg-gray-900">
                                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${publisher.image_background})` }}>
                                            <div className="absolute inset-0 bg-linear-to-t from-gray-950 via-gray-950/80 to-transparent group-hover:from-gray-950 group-hover:via-[#00D400]/10 transition-all duration-500"></div>
                                        </div>
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
                                            <h3 className="text-2xl font-black text-white mb-2 drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] uppercase group-hover:text-[#00D400] transition-colors line-clamp-2 leading-tight tracking-tighter">{publisher.name}</h3>
                                            <div className="flex justify-between items-center opacity-80 group-hover:opacity-100 transition-opacity">
                                                <span className="text-xs font-black tracking-widest text-[#00D400] bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/5 uppercase">Juegos: {publisher.games_count}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-16 mb-12 gap-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-8 py-3 bg-gray-900 hover:bg-[#00D400] hover:text-black disabled:opacity-30 disabled:hover:bg-gray-900 disabled:hover:text-white text-white rounded-2xl font-black transition-all border border-gray-800 shadow-xl uppercase tracking-widest text-xs"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-white font-mono bg-gray-900 px-8 py-3 rounded-2xl border border-gray-800 shadow-2xl">
                                        Pág. <span className="text-[#00D400]">{currentPage}</span> / {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-8 py-3 bg-gray-900 hover:bg-[#00D400] hover:text-black disabled:opacity-30 disabled:hover:bg-gray-900 disabled:hover:text-white text-white rounded-2xl font-black transition-all border border-gray-800 shadow-xl uppercase tracking-widest text-xs"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-24 bg-gray-900/30 rounded-3xl border border-dashed border-gray-800">
                            <p className="text-4xl mb-4">🏢</p>
                            <p className="text-xl text-gray-400 font-bold uppercase tracking-widest">No se encontraron publishers.</p>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

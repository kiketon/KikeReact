import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchPublishers } from "../services/rawg";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PublisherList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [publishers, setPublishers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const currentPage = parseInt(searchParams.get('page')) || 1;
    const currentSearch = searchParams.get('search') || '';

    useEffect(() => {
        setLoading(true);
        fetchPublishers({ search: currentSearch, page: currentPage }).then(data => {
            setPublishers(data.results || []);
            setTotalPages(Math.ceil((data.count || 0) / 20)); // RAWG returns 20 per page
            setLoading(false);
        });
    }, [currentSearch, currentPage]);

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
        <div className="min-h-screen flex flex-col bg-transparent font-sans text-white">
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="mb-10 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-white">Encuentra a tu Publisher favorito</h2>
                    <SearchBar onSearch={handleSearch} />
                </div>

                <section>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-white border-l-4 border-[#00D400] pl-3">
                            {loading ? "Buscando..." : "Publishers"}
                        </h2>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-800 rounded-xl"></div>
                            ))}
                        </div>
                    ) : publishers.length > 0 ? (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {publishers.map((publisher) => (
                                    <Link key={publisher.id} to={`/publisher/${publisher.id}`} className="block relative h-64 rounded-xl overflow-hidden group shadow-lg transition-transform hover:-translate-y-2 border border-gray-800 hover:border-[#00D400]">
                                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${publisher.image_background})` }}>
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent group-hover:from-gray-900 group-hover:via-[#00D400]/20 transition-all"></div>
                                        </div>
                                        <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
                                            <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{publisher.name}</h3>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm font-semibold text-gray-300">Juegos: {publisher.games_count}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="flex justify-center items-center mt-10 gap-4">
                                    <button
                                        onClick={() => handlePageChange(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors border border-gray-700"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-white font-bold bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        onClick={() => handlePageChange(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors border border-gray-700"
                                    >
                                        Siguiente
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
                            <p className="text-2xl text-gray-400">No se encontraron publishers.</p>
                        </div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}

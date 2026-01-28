import { useState } from "react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto mb-8 relative">
            <div className="relative group">
                <div className="absolute -inset-0.5 bg-[#00D400] rounded-lg blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Buscar videojuegos..."
                        className="w-full bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg py-3 px-4 pl-12 focus:outline-none focus:ring-2 focus:ring-[#00D400] focus:border-transparent transition-all shadow-xl"
                    />
                    <div className="absolute left-4 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        type="submit"
                        className="absolute right-2 bg-[#00D400] hover:bg-[#00b800] text-black font-bold px-4 py-1.5 rounded-md text-sm transition-transform hover:scale-105"
                    >
                        Buscar
                    </button>
                </div>
            </div>
        </form>
    );
}

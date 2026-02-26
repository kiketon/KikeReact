import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Header() {
    const { isLoggedIn, profile } = useSelector(state => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-gray-900/90 backdrop-blur-md text-white p-4 shadow-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between relative h-8">
                <div className="w-1/3">
                    <nav className="flex gap-4">
                        <Link to="/" className="hover:text-[#00D400] transition-colors">Inicio</Link>
                        <Link to="/publishers" className="hover:text-[#00D400] transition-colors">Publishers</Link>
                        <Link to="/events" className="hover:text-[#00D400] transition-colors">Eventos</Link>
                    </nav>
                </div>

                <Link to="/" className="text-2xl font-bold text-white hover:text-[#00D400] transition-colors tracking-tighter whitespace-nowrap">
                    Kike Juegos <span className="text-[#00D400]">.</span>
                </Link>

                <div className="w-1/3 flex justify-end items-center gap-4 relative">
                    {isLoggedIn && (
                        <div className="relative">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="flex items-center gap-2 hover:bg-gray-800 p-1 rounded-full px-2 transition-all cursor-pointer border border-transparent hover:border-[#00D400]/30"
                            >
                                <img
                                    src={profile.avatar}
                                    alt={profile.name}
                                    className="w-8 h-8 rounded-full border border-gray-700 bg-gray-800"
                                />
                                <span className="hidden sm:inline font-medium text-sm">{profile.name}</span>
                            </button>

                            {isMenuOpen && (
                                <div className="absolute right-0 mt-3 w-64 bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-gray-800 py-3 z-60 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <div className="px-4 py-2 border-b border-gray-800 mb-1">
                                        <p className="text-xs text-gray-400">Sesión iniciada como</p>
                                        <p className="text-sm font-semibold truncate">{profile.email}</p>
                                    </div>
                                    <Link
                                        to="/favorites"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 hover:text-[#00D400] transition-all"
                                    >
                                        <span className="text-[#00D400]">★</span> Mis Favoritos
                                    </Link>
                                    <Link
                                        to="/my-events"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-800 hover:text-[#00D400] transition-all"
                                    >
                                        <span className="text-[#00D400]">📅</span> Mis Eventos
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}


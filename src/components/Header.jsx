import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className="bg-gray-900/90 backdrop-blur-md text-white p-4 shadow-lg border-b border-gray-800 sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-end relative h-8">
                <Link to="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-white hover:text-[#00D400] transition-colors tracking-tighter whitespace-nowrap">
                    Kike Juegos <span className="text-[#00D400]">.</span>
                </Link>
                <nav className="flex gap-4 relative z-10">
                    <Link to="/" className="hover:text-[#00D400] transition-colors">Inicio</Link>
                    <Link to="/favorites" className="hover:text-[#00D400] transition-colors flex items-center gap-1">
                        <span className="text-[#00D400]">★</span> Favoritos
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-400 py-6 mt-10 text-center border-t border-gray-800">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} Kike Juegos. Desarrollado por <a href="https://rawg.io/" target="_blank" rel="noopener noreferrer" className="text-[#00D400] hover:underline">RAWG.io</a></p>
            </div>
        </footer>
    );
}

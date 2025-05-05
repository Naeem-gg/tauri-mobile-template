import { Link } from "@tanstack/react-router";
import { List } from "lucide-react";




export default function Navbar() {

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm flex justify-between items-center px-4 h-16">
      {/* Left: Masjid Link */}
      <Link
        to="/"
        aria-label="View all mosques"
        className="bg-primary/10 hover:bg-primary/20 p-2 rounded-lg text-lg"
      >
        <List />  </Link>

      {/* Center: Title */}
      <div className="text-center text-2xl font-semibold text-gray-800 truncate font-serif">
        Salahtime
      </div>

     
    </nav>
  );
}

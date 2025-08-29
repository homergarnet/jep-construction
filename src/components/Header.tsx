import React, { useState } from "react";
import { Menu, X } from "lucide-react"; // icons
import { SidebarTrigger } from "./ui/sidebar";

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <SidebarTrigger />
                {/* <div className="text-xl font-bold">MyApp</div> */}

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-blue-500">Home</a>
                    <a href="#" className="hover:text-blue-500">About</a>
                    <a href="#" className="hover:text-blue-500">Contact</a>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 rounded focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden px-4 pb-3 space-y-2 bg-white border-t">
                    <a href="#" className="block py-2 hover:text-blue-500">Home</a>
                    <a href="#" className="block py-2 hover:text-blue-500">About</a>
                    <a href="#" className="block py-2 hover:text-blue-500">Contact</a>
                </nav>
            )}
        </header>
    )
};

export default Header;

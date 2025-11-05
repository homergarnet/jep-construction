import React, { useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react"; // icons
import { SidebarTrigger } from "./ui/sidebar";
import { useTheme } from "@/theme/theme-provider";
import { Link, useNavigate } from "react-router-dom";
import { getJwtRoleId } from "@/utils/getJwtRoleId";
import { ADMIN_ROLE_ID, EMPLOYEE_ROLE_ID } from "@/constants/constants";

const Header: React.FC = () => {
    const roleId = getJwtRoleId();
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark"
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("authToken");
        // Clear stored auth data
        // Redirect to login page
        navigate(`/${roleId === ADMIN_ROLE_ID ? "admin" : roleId === EMPLOYEE_ROLE_ID ? "employee" : "client"}/login`);
    };


    return (
        <header className={`sticky top-0 z-50 w-full border-b shadow-sm transition-colors duration-300
    ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-4">
                {/* Logo */}
                <SidebarTrigger />
                {/* <div className="text-xl font-bold">MyApp</div> */}

                {/* Desktop Nav */}
                <nav className="hidden md:flex space-x-6">
                    {roleId === "0" && (
                        <>
                            <a href="#" className="hover:text-blue-500">Home</a>
                            <a href="#" className="hover:text-blue-500">About</a>
                            <a href="#" className="hover:text-blue-500">Contact</a>
                        </>
                    )}
                    {/* theme to toggle */}
                    <div onClick={() => setTheme(isDark ? "light" : "dark")}
                        className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}>
                        {isDark ? <Sun className='h-6 w-6 text-yellow-500 rotate-0 transition-all' /> : <Moon className='h-6 w-6 text-blue-500 rotate-0 transition-all' />}
                    </div>
                    {/* Logout button */}
                    <button
                        onClick={handleLogout}
                        className="hover:text-red-500 transition-colors cursor-pointer"
                    >
                        Logout
                    </button>
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
                <nav
                    className={`md:hidden px-4 pb-3 space-y-2 border-t transition-colors duration-300
    ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                >
                    <Link to="/" className="block py-2 hover:text-blue-500">
                        Home
                    </Link>
                    <Link to="/about" className="block py-2 hover:text-blue-500">
                        About
                    </Link>
                    <Link to="/contact" className="block py-2 hover:text-blue-500">
                        Contact
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="block w-full text-left py-2 hover:text-red-500"
                    >
                        Logout
                    </button>
                </nav>
            )}
        </header>
    )
};

export default Header;

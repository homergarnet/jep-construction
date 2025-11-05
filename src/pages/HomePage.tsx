import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/theme/theme-provider';
import { Menu, Moon, Sun, X } from 'lucide-react';
import React, { useState } from 'react'
import logo from "@/assets/logo.jpg";
import hero from "@/assets/hero.jpg";
import house_construction from "@/assets/house_construction.jpg";
import house_renovation from "@/assets/house_renovation.jpg";
import material_supply from "@/assets/material_supply.jpg";
import construction_consultant from "@/assets/construction_consultant.jpg";
import welding from "@/assets/welding.jpg";
import iron_work from "@/assets/iron_work.jpg";
import coffee_shop_extension from "@/assets/coffee_shop_extension.jpg";
import house_construction_2 from "@/assets/house_construction_2.jpg";
import interior_divider from "@/assets/interior_divider.jpg";
import trusses_roofing from "@/assets/trusses_roofing.jpg";
import table_set from "@/assets/table_set.jpg";
import grils from "@/assets/grils.jpg";
import GetInTouchForm from './components/GetInTouchForm';
import ReviewCarousel from '@/components/ReviewCarousel';
import { useGetReviewList } from '@/hooks/useReview';

const HomePage = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark"
    const [isOpen, setIsOpen] = useState(false)
    const { data: reviewList, isLoading: reviewListLoading, refetch: refetchReviewList, } = useGetReviewList({
        keyword: "",
        isApprove: true,
        page: 1,
        pageSize: 1000,
    });

    return (
        <>
            <div className="min-h-screen flex flex-col">
                <header
                    className={`sticky top-0 z-50 w-full border-b shadow-sm transition-colors duration-300
      ${isDark ? "bg-gray-900 border-gray-800 text-white" : "bg-white border-gray-200 text-gray-900"}`}
                >
                    <div className="max-w-7xl flex items-center justify-between py-3 md:py-4 px-4">
                        {/* Logo / Brand (left side) */}
                        <a href="/" className="flex items-center space-x-2">
                            <img
                                src={logo}
                                alt="Logo"
                                className="h-10 w-auto"
                            />
                            {/* <span className="text-xl font-bold">JEP Construction and metal works</span> */}
                        </a>
                        {/* <div className="text-xl font-bold">JEP Construction and metal works</div> */}

                        {/* Desktop Nav (right side) */}
                        <nav className="hidden md:flex items-center space-x-6">
                            <a href="#home" className="block py-2 hover:text-blue-500">Home</a>
                            <a href="#aboutUs" className="block py-2 hover:text-blue-500">About</a>
                            <a href="#services" className="block py-2 hover:text-blue-500">Services</a>
                            <a href="#projects" className="block py-2 hover:text-blue-500">Projects</a>
                            {/* <a href="#" className="block py-2 hover:text-blue-500">Feedback</a> */}
                            <a href="#contactUs" className="block py-2 hover:text-blue-500">Contact Us</a>

                            {/* Theme toggle */}
                            <div
                                onClick={() => setTheme(isDark ? "light" : "dark")}
                                className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"}`}
                            >
                                {isDark ? (
                                    <Sun className="h-6 w-6 text-yellow-500 transition-all" />
                                ) : (
                                    <Moon className="h-6 w-6 text-blue-500 transition-all" />
                                )}
                            </div>
                        </nav>

                        {/* Mobile Toggle (hamburger) */}
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
                            <a href="#home" className="block py-2 hover:text-blue-500">Home</a>
                            <a href="#aboutUs" className="block py-2 hover:text-blue-500">About</a>
                            <a href="#services" className="block py-2 hover:text-blue-500">Services</a>
                            <a href="#projects" className="block py-2 hover:text-blue-500">Projects</a>
                            {/* <a href="#" className="block py-2 hover:text-blue-500">Feedback</a> */}
                            <a href="#contactUs" className="block py-2 hover:text-blue-500">Contact Us</a>
                        </nav>
                    )}
                </header>

                {/* Hero Section */}
                <section id="home" className="flex-1"> {/* pt-20 = header height offset */}
                    <div className="w-full h-[calc(100vh-80px)] relative">
                        {/* Background image */}
                        <img
                            src={hero}
                            alt="Hero"
                            className="w-full h-full object-cover"
                        />

                        {/* Overlay text */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/40">
                            <h2 className="text-5xl md:text-7xl font-bold">We Provide Best Service</h2>
                            <p className="mt-4 text-xl md:text-2xl max-w-2xl">
                                House construction is the process of building a home, involving site preparation, foundation, framing, roofing, electrical
                                and plumbing installation, insulation, fishing, and exterior work.
                            </p>
                            <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg text-lg">
                                Get Started
                            </button>
                        </div>
                    </div>
                </section>
                <h2 id="aboutUs" className="text-2xl font-bold text-center mt-2">About Us</h2>
                <p className="mt-4 text-xl md:text-2xl max-w-2xl mx-auto text-center leading-relaxed text-gray-700">
                    JEP Construction and Metal Works is a company specializing in high-quality construction
                    services with a passion for excellence and innovation. With years of experience, we pride
                    ourselves on delivering exceptional results for every project.
                </p>

                <div className="flex flex-wrap justify-center gap-12 px-4 py-10">
                    {/* Card 1 */}
                    <Card className="w-64 shadow-md rounded-2xl border border-gray-200 text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-blue-600">5+</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-600">Years experience</p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="w-64 shadow-md rounded-2xl border border-gray-200 text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-blue-600">150+</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-600">Projects completed</p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="w-64 shadow-md rounded-2xl border border-gray-200 text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-blue-600">200+</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-600">Satisfied Customers</p>
                        </CardContent>
                    </Card>

                    {/* Card 4 */}
                    <Card className="w-64 shadow-md rounded-2xl border border-gray-200 text-center">
                        <CardHeader>
                            <CardTitle className="text-4xl font-bold text-blue-600">50+</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg text-gray-600">Active Workers</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex justify-center px-4 py-8">
                    {/* Card takes 10/12 of the container width */}
                    <Card className="w-10/12 shadow-lg rounded-2xl border border-gray-200">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-center">Our Mission</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg md:text-xl text-center leading-relaxed text-gray-700">
                                To provide our clients with the highest quality construction services while maintaining a focus
                                on integrity, safety, and sustainability.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <h2 id="services" className="text-2xl font-bold mb-6 text-center">Our Services</h2>
                <div className="flex flex-wrap justify-center gap-6 px-6 py-10">
                    {/* Card 1 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={house_construction}
                                alt="House Construction"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">House Construction</CardTitle>
                            <p className="mt-2 text-gray-600">House construction the process of building a home, involving site
                                preparation, foundation, framing, roofing, electrical and plumbing installation, insulation,
                                fishing, and exterior work.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={house_renovation}
                                alt="House Renovation"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">House Renovation</CardTitle>
                            <p className="mt-2 text-gray-600">
                                House renovation is the process of improving or updating an existing
                                home. It involves repairing, upgrading, or altering various parts of the house.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={material_supply}
                                alt="Material Supply"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">Material Supply</CardTitle>
                            <p className="mt-2 text-gray-600">
                                Material supply refers to the process of sourcing and providing
                                the necessary materials for construction or renovation projects.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <div className="flex flex-wrap justify-center gap-6 px-6 py-10">
                    {/* Card 1 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={construction_consultant}
                                alt="Construction Consultant"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">Construction Consultant</CardTitle>
                            <p className="mt-2 text-gray-600">
                                A construction consultant is a professional who provides expert advice and guidance
                                throughout a construction project consultants.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 2 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={welding}
                                alt="Welding"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">Welding</CardTitle>
                            <p className="mt-2 text-gray-600">
                                Welding is a process of joining two or more pieces of metal by applying heat, pressure,
                                or both, often with a filler material it creates.
                            </p>
                        </CardContent>
                    </Card>

                    {/* Card 3 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={iron_work}
                                alt="Iron Work"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>
                        <CardContent className="p-4 text-center">
                            <CardTitle className="text-xl font-bold">Iron Work</CardTitle>
                            <p className="mt-2 text-gray-600">
                                Ironwork refers to the process of shaping, fabricating, and installing iron or steel into structures
                                and decorative elements it involves.
                            </p>
                        </CardContent>
                    </Card>
                </div>
                <h2 id="projects" className="text-2xl font-bold mb-6 text-center">Our Projects</h2>
                <div className="flex flex-wrap justify-center gap-6 px-6 py-10">
                    {/* Card 1 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={coffee_shop_extension}
                                alt="Coffee Shop Extension"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Coffee Shop Extension</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 2 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={house_construction_2}
                                alt="House Construction"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">House Construction</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 3 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={interior_divider}
                                alt="Interior Divider"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Interior Divider</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
                <div className="flex flex-wrap justify-center gap-6 px-6 py-10">
                    {/* Card 1 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={trusses_roofing}
                                alt="Trusses/Roofing"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Trusses/Roofing</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 2 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={table_set}
                                alt="Table Set"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Table Set</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>

                    {/* Card 3 */}
                    <Card className="w-80 shadow-md rounded-2xl border border-gray-200">
                        <CardHeader className="p-0">
                            <img
                                src={grils}
                                alt="Grils"
                                className="w-full h-48 object-cover rounded-t-2xl"
                            />
                        </CardHeader>

                        <CardFooter className="bg-gray-100 dark:bg-gray-800 p-4 rounded-b-2xl">
                            <div>
                                <p className="font-semibold text-gray-800 dark:text-gray-100">Grils</p>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">
                                    Construction, Design
                                </p>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
            <h2 id="reviews" className="text-2xl font-bold mb-6 text-center">Reviews</h2>
            {reviewList?.ReviewList?.length ? (
                <ReviewCarousel reviews={reviewList.ReviewList} interval={5000} />
            ) : (
                <p className="text-center text-muted-foreground">No reviews found.</p>
            )}

            <h2 id="contactUs" className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

            <GetInTouchForm />
            <footer className="border-t backdrop-blur py-12 supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto px-4 text-center text-gray-400">
                    <p>JEP Construction and Metal Works &copy; 2025</p>
                </div>
            </footer>
        </>


    )
}

export default HomePage

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, Menu, X, LogIn, LogOut } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import DarkModeToggle from './DarkModeToggle';

const Blog = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Posts');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    const handleAuth = () => {
        setIsLoggedIn(!isLoggedIn);
        // TODO: Implement actual authentication logic
    };

    const filteredPosts = selectedCategory === 'All Posts' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link to="/" className="text-xl tracking-tight font-medium text-stone-900 dark:text-stone-100">
                        Moses Mwangi
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link
                            to="/"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/blog"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Blog
                        </Link>
                        <a
                            href="/#projects"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Projects
                        </a>
                        <a
                            href="/#contact"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Contact
                        </a>
                        <button
                            onClick={handleAuth}
                            className="inline-flex items-center gap-2 text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            {isLoggedIn ? (
                                <>
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-4 h-4" />
                                    Login
                                </>
                            )}
                        </button>
                        <DarkModeToggle />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex md:hidden items-center gap-4">
                        <DarkModeToggle />
                        <button
                            onClick={toggleMobileMenu}
                            className="text-stone-900 dark:text-stone-100 p-2 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-lg transition-colors"
                            aria-label="Toggle mobile menu"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div 
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                >
                    <div className="px-6 py-4 bg-stone-50 dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex flex-col space-y-4">
                            <Link
                                to="/"
                                onClick={closeMobileMenu}
                                className="text-base tracking-wide text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                Home
                            </Link>
                            <Link
                                to="/blog"
                                onClick={closeMobileMenu}
                                className="text-base tracking-wide text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                Blog
                            </Link>
                            <a
                                href="/#projects"
                                onClick={closeMobileMenu}
                                className="text-base tracking-wide text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                Projects
                            </a>
                            <a
                                href="/#contact"
                                onClick={closeMobileMenu}
                                className="text-base tracking-wide text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                Contact
                            </a>
                            <button
                                onClick={() => {
                                    handleAuth();
                                    closeMobileMenu();
                                }}
                                className="inline-flex items-center gap-2 text-base tracking-wide text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors py-2 text-left"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                {isLoggedIn ? (
                                    <>
                                        <LogOut className="w-5 h-5" />
                                        Logout
                                    </>
                                ) : (
                                    <>
                                        <LogIn className="w-5 h-5" />
                                        Login
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`pt-32 pb-16 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-4">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Musings & Meanderings
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl leading-tight mb-8">
                        <span className="block font-normal text-stone-900 dark:text-stone-100">Thoughts on</span>
                        <span className="block italic text-blue-500 dark:text-blue-400">things that matter</span>
                    </h1>
                    
                    <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Products, tech bubbles, life philosophies, and the occasional existential crisis. 
                        Sometimes insightful, always honest, frequently caffeinated. Think of this as my 
                        digital notebook—except you're invited to read it.
                    </p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="px-6 pb-12">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap gap-3">
                        {blogCategories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                                    selectedCategory === category
                                        ? 'bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900'
                                        : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                                }`}
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8">
                        {filteredPosts.map((post, index) => (
                            <Link
                                key={post.id}
                                to={`/blog/${post.id}`}
                                className={`group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-lg overflow-hidden hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-lg dark:hover:shadow-stone-900/50 transition-all duration-300 ${
                                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {post.category}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-medium text-stone-900 dark:text-stone-100 mb-3 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-stone-400 dark:text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 text-stone-600 dark:text-stone-400 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        <span className="text-sm">Read article</span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="px-8 pb-6">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded"
                                                style={{ fontFamily: 'system-ui, sans-serif' }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-400 dark:text-stone-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        © 2025 Moses Mwangi
                    </p>
                    <p className="text-stone-400 dark:text-stone-500 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Product Analyst • London, England
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Blog;

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Tag, Menu, X, LogIn, LogOut } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import DarkModeToggle from './DarkModeToggle';

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const post = blogPosts.find(p => p.id === id);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
            return;
        }
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, [post, navigate]);

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

    if (!post) {
        return null;
    }

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link 
                        to="/blog" 
                        className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Blog</span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Article
                        </span>
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
                        isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
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
            </header>

            {/* Hero */}
            <article className={`pt-32 pb-20 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.category}
                        </span>
                    </div>
                    
                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-stone-900 dark:text-stone-100">
                        {post.title}
                    </h1>
                    
                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-6 text-sm text-stone-500 dark:text-stone-400 mb-8 pb-8 border-b border-stone-200 dark:border-stone-800" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                        </div>
                    </div>

                    {/* Introduction */}
                    <div className="prose prose-lg max-w-none mb-12">
                        <p className="text-xl text-stone-700 dark:text-stone-300 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.content.introduction}
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-12">
                        {post.content.sections.map((section, index) => (
                            <section key={index} className="border-t border-stone-200 dark:border-stone-800 pt-8">
                                <h2 className="text-3xl font-normal mb-6 text-stone-900 dark:text-stone-100">
                                    {section.heading}
                                </h2>
                                
                                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {section.content}
                                </p>

                                {section.keyPoints && section.keyPoints.length > 0 && (
                                    <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-400 p-6 rounded-r">
                                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-3 tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            KEY TAKEAWAYS
                                        </h3>
                                        <ul className="space-y-2">
                                            {section.keyPoints.map((point, pointIndex) => (
                                                <li key={pointIndex} className="flex gap-3 text-stone-700 dark:text-stone-300" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    <span className="text-blue-500 dark:text-blue-400 mt-1">—</span>
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {section.quotes && section.quotes.length > 0 && (
                                    <div className="mt-8 space-y-6">
                                        {section.quotes.map((quote, quoteIndex) => (
                                            <blockquote key={quoteIndex} className="border-l-4 border-stone-300 dark:border-stone-700 pl-6 py-2">
                                                <p className="text-xl italic text-stone-700 dark:text-stone-300 mb-2 leading-relaxed">
                                                    "{quote.text}"
                                                </p>
                                                <cite className="text-sm text-stone-500 dark:text-stone-400 not-italic" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    — {quote.author}
                                                </cite>
                                            </blockquote>
                                        ))}
                                    </div>
                                )}
                            </section>
                        ))}
                    </div>

                    {/* Conclusion */}
                    <div className="mt-12 pt-12 border-t border-stone-200 dark:border-stone-800">
                        <h2 className="text-3xl font-normal mb-6 text-stone-900 dark:text-stone-100">
                            Conclusion
                        </h2>
                        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.content.conclusion}
                        </p>
                    </div>

                    {/* Sources (if available) */}
                    {post.sources && post.sources.length > 0 && (
                        <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
                            <h3 className="text-xl font-medium mb-4 text-stone-900 dark:text-stone-100">
                                Sources
                            </h3>
                            <ul className="space-y-2">
                                {post.sources.map((source, index) => (
                                    <li key={index} className="text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        <a 
                                            href={source} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline break-all"
                                        >
                                            {source}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Tags */}
                    <div className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800">
                        <div className="flex items-center gap-3 flex-wrap">
                            <Tag className="w-4 h-4 text-stone-400 dark:text-stone-500" />
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="text-sm px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full"
                                    style={{ fontFamily: 'system-ui, sans-serif' }}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back to Blog CTA */}
                    <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 text-center">
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to all articles
                        </Link>
                    </div>
                </div>
            </article>

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

export default BlogPost;

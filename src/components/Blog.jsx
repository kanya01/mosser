import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';

const Blog = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Posts');

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const filteredPosts = selectedCategory === 'All Posts' 
        ? blogPosts 
        : blogPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link to="/" className="text-xl tracking-tight font-medium text-stone-900">
                        Moses Mwangi
                    </Link>
                    <div className="flex gap-8">
                        <Link
                            to="/"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Home
                        </Link>
                        <Link
                            to="/blog"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Blog
                        </Link>
                        <a
                            href="/#projects"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Projects
                        </a>
                        <a
                            href="/#contact"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`pt-32 pb-16 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto">
                    <div className="mb-4">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Digital Product Analysis
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl leading-tight mb-8">
                        <span className="block font-normal text-stone-900">Insights on</span>
                        <span className="block italic text-blue-500">product design</span>
                    </h1>
                    
                    <p className="text-lg text-stone-600 max-w-2xl leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Here are my thoughts—sometimes on products, sometimes on life. 
                        Mostly trying to make sense of both, occasionally succeeding.
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
                                        ? 'bg-stone-900 text-stone-50'
                                        : 'bg-white text-stone-600 border border-stone-200 hover:border-stone-300'
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
                                className={`group bg-white border border-stone-200 rounded-lg overflow-hidden hover:border-stone-300 hover:shadow-lg transition-all duration-300 ${
                                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {post.category}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl font-medium text-stone-900 mb-3 group-hover:text-blue-500 transition-colors">
                                        {post.title}
                                    </h2>

                                    <p className="text-stone-600 mb-6 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-6 text-stone-600 group-hover:text-blue-500 transition-colors" style={{ fontFamily: 'system-ui, sans-serif' }}>
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
                                                className="text-xs px-2 py-1 bg-stone-100 text-stone-600 rounded"
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
            <footer className="py-8 px-6 border-t border-stone-200">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        © 2025 Moses Mwangi
                    </p>
                    <p className="text-stone-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Product Analyst • London, England
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Blog;

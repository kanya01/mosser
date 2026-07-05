import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts, blogCategories } from '../data/blogPosts';
import DarkModeToggle from './DarkModeToggle';

const easing = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: 0.2 };

const listVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.08 }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 26, scale: 0.98 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.65, ease: easing }
    },
    exit: {
        opacity: 0,
        y: 20,
        scale: 0.98,
        transition: { duration: 0.2 }
    }
};

const Blog = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('All Posts');
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const filteredPosts = useMemo(() => (
        selectedCategory === 'All Posts'
            ? blogPosts
            : blogPosts.filter((post) => post.category === selectedCategory)
    ), [selectedCategory]);

    const motionEnabled = !shouldReduceMotion;

    return (
        <div className="min-h-screen overflow-x-hidden bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            <nav className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link to="/" className="text-xl tracking-tight font-medium text-stone-900 dark:text-stone-100">
                        Moses Mwangi
                    </Link>
                    <div className="flex items-center gap-8">
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
                        <DarkModeToggle />
                    </div>
                </div>
            </nav>

            <section className="relative overflow-hidden px-6 pt-32 pb-16">
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-10 left-[8%] h-64 w-64 rounded-full bg-blue-200/35 dark:bg-blue-500/15 blur-3xl"
                        animate={motionEnabled ? { y: [0, 20, 0], x: [0, -14, 0] } : undefined}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-24 right-[12%] h-72 w-72 rounded-full bg-violet-200/30 dark:bg-violet-500/12 blur-3xl"
                        animate={motionEnabled ? { y: [0, -18, 0], x: [0, 18, 0] } : undefined}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <motion.div
                    className="max-w-6xl mx-auto relative z-10"
                    initial={motionEnabled ? 'hidden' : false}
                    animate={motionEnabled ? (isLoaded ? 'visible' : 'hidden') : undefined}
                    variants={listVariants}
                >
                    <motion.div variants={cardVariants} className="mb-4">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Musings & Meanderings
                        </span>
                    </motion.div>

                    <motion.h1 variants={cardVariants} className="text-5xl md:text-7xl leading-tight mb-8 max-w-4xl">
                        <span className="block font-normal text-stone-900 dark:text-stone-100">Thoughts with a little</span>
                        <span className="block italic text-blue-500 dark:text-blue-400">more movement</span>
                    </motion.h1>

                    <motion.p
                        variants={cardVariants}
                        className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl leading-relaxed"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        Products, tech bubbles, life philosophies, and the occasional existential crisis.
                        The motion here leans editorial: calmer while reading, livelier while discovering what to open next.
                    </motion.p>
                </motion.div>
            </section>

            <motion.section
                className="px-6 pb-12"
                initial={motionEnabled ? 'hidden' : false}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={viewport}
                variants={listVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-wrap gap-3">
                        {blogCategories.map((category) => {
                            const isSelected = selectedCategory === category;

                            return (
                                <motion.button
                                    key={category}
                                    variants={cardVariants}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                                        isSelected
                                            ? 'bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 shadow-lg shadow-stone-950/10 dark:shadow-stone-100/10'
                                            : 'bg-white/90 dark:bg-stone-900/90 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-800 hover:border-blue-200 dark:hover:border-blue-500/30'
                                    }`}
                                    style={{ fontFamily: 'system-ui, sans-serif' }}
                                    whileHover={motionEnabled ? { y: -3 } : undefined}
                                    whileTap={motionEnabled ? { scale: 0.98 } : undefined}
                                >
                                    {category}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </motion.section>

            <section className="px-6 pb-24">
                <div className="max-w-6xl mx-auto">
                    <motion.div layout className="grid md:grid-cols-2 gap-8" variants={listVariants} initial={false} animate="visible">
                        <AnimatePresence mode="popLayout">
                            {filteredPosts.map((post) => (
                                <motion.div
                                    key={post.id}
                                    layout
                                    variants={cardVariants}
                                    initial={motionEnabled ? 'hidden' : false}
                                    animate={motionEnabled ? 'visible' : undefined}
                                    exit={motionEnabled ? 'exit' : undefined}
                                    whileHover={motionEnabled ? { y: -8 } : undefined}
                                >
                                    <Link
                                        to={`/blog/${post.id}`}
                                        className="group relative block h-full overflow-hidden rounded-[28px] border border-stone-200/80 dark:border-stone-800/80 bg-white/90 dark:bg-stone-900/90 transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-500/30 hover:shadow-xl dark:hover:shadow-stone-950/40"
                                    >
                                        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_35%),linear-gradient(180deg,transparent,rgba(59,130,246,0.04))] dark:bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_35%),linear-gradient(180deg,transparent,rgba(96,165,250,0.06))]" />
                                        <div className="relative p-8">
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
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </section>

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

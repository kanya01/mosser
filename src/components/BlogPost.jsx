import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import DarkModeToggle from './DarkModeToggle';

const easing = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: 0.2 };

const sectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: easing }
    }
};

const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionBlockquote = motion.blockquote;

const BlogPost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

    const post = blogPosts.find((entry) => entry.id === id);

    useEffect(() => {
        if (!post) {
            navigate('/blog');
            return;
        }
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, [post, navigate]);

    if (!post) {
        return null;
    }

    const motionEnabled = !shouldReduceMotion;

    return (
        <div className="min-h-screen overflow-x-hidden bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            <MotionDiv
                className="fixed left-0 top-0 z-[60] h-1 w-full origin-left bg-gradient-to-r from-blue-500 via-violet-500 to-blue-400 dark:from-blue-400 dark:via-violet-400 dark:to-cyan-400"
                style={{ scaleX: motionEnabled ? progress : 0 }}
            />

            <header className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link
                        to="/blog"
                        className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Blog</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Article
                        </span>
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            <article className="relative px-6 pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <MotionDiv
                        className="absolute top-12 left-[8%] h-64 w-64 rounded-full bg-blue-200/30 dark:bg-blue-500/12 blur-3xl"
                        animate={motionEnabled ? { y: [0, 18, 0], x: [0, 10, 0] } : undefined}
                        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <MotionDiv
                        className="absolute top-48 right-[10%] h-72 w-72 rounded-full bg-violet-200/25 dark:bg-violet-500/10 blur-3xl"
                        animate={motionEnabled ? { y: [0, -16, 0], x: [0, -14, 0] } : undefined}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    />
                </div>

                <MotionDiv
                    className="max-w-4xl mx-auto relative z-10"
                    initial={motionEnabled ? { opacity: 0, y: 30 } : false}
                    animate={motionEnabled ? (isLoaded ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: easing } } : undefined) : undefined}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.category}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-normal mb-6 leading-tight text-stone-900 dark:text-stone-100">
                        {post.title}
                    </h1>

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

                    <MotionDiv
                        className="mb-12 rounded-[28px] border border-stone-200/80 dark:border-stone-800/80 bg-white/80 dark:bg-stone-900/70 p-8 shadow-sm backdrop-blur"
                        initial={motionEnabled ? { opacity: 0, y: 24 } : false}
                        animate={motionEnabled ? (isLoaded ? { opacity: 1, y: 0, transition: { duration: 0.85, delay: 0.08, ease: easing } } : undefined) : undefined}
                    >
                        <p className="text-xl text-stone-700 dark:text-stone-300 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.content.introduction}
                        </p>
                    </MotionDiv>

                    <div className="space-y-12">
                        {post.content.sections.map((section) => (
                            <MotionSection
                                key={section.heading}
                                className="border-t border-stone-200 dark:border-stone-800 pt-8"
                                initial={motionEnabled ? 'hidden' : false}
                                whileInView={motionEnabled ? 'visible' : undefined}
                                viewport={viewport}
                                variants={sectionVariants}
                            >
                                <h2 className="text-3xl font-normal mb-6 text-stone-900 dark:text-stone-100">
                                    {section.heading}
                                </h2>

                                <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {section.content}
                                </p>

                                {section.keyPoints && section.keyPoints.length > 0 && (
                                    <MotionDiv
                                        className="rounded-r-[28px] border-l-4 border-blue-500 dark:border-blue-400 bg-blue-50/80 dark:bg-blue-900/20 p-6"
                                        initial={motionEnabled ? { opacity: 0, x: -16 } : false}
                                        whileInView={motionEnabled ? { opacity: 1, x: 0, transition: { duration: 0.55, ease: easing } } : undefined}
                                        viewport={viewport}
                                    >
                                        <h3 className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-3 tracking-wide" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            KEY TAKEAWAYS
                                        </h3>
                                        <ul className="space-y-2">
                                            {section.keyPoints.map((point) => (
                                                <li key={point} className="flex gap-3 text-stone-700 dark:text-stone-300" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                                                    {point}
                                                </li>
                                            ))}
                                        </ul>
                                    </MotionDiv>
                                )}

                                {section.quotes && section.quotes.length > 0 && (
                                    <div className="mt-8 space-y-6">
                                        {section.quotes.map((quote) => (
                                            <MotionBlockquote
                                                key={`${quote.author}-${quote.text}`}
                                                className="border-l-4 border-stone-300 dark:border-stone-700 pl-6 py-2"
                                                initial={motionEnabled ? { opacity: 0, x: -18 } : false}
                                                whileInView={motionEnabled ? { opacity: 1, x: 0, transition: { duration: 0.55, ease: easing } } : undefined}
                                                viewport={viewport}
                                            >
                                                <p className="text-xl italic text-stone-700 dark:text-stone-300 mb-2 leading-relaxed">
                                                    &quot;{quote.text}&quot;
                                                </p>
                                                <cite className="text-sm text-stone-500 dark:text-stone-400 not-italic" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    — {quote.author}
                                                </cite>
                                            </MotionBlockquote>
                                        ))}
                                    </div>
                                )}
                            </MotionSection>
                        ))}
                    </div>

                    <MotionDiv
                        className="mt-12 pt-12 border-t border-stone-200 dark:border-stone-800"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={sectionVariants}
                    >
                        <h2 className="text-3xl font-normal mb-6 text-stone-900 dark:text-stone-100">
                            Conclusion
                        </h2>
                        <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            {post.content.conclusion}
                        </p>
                    </MotionDiv>

                    {post.sources && post.sources.length > 0 && (
                        <MotionDiv
                            className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800"
                            initial={motionEnabled ? 'hidden' : false}
                            whileInView={motionEnabled ? 'visible' : undefined}
                            viewport={viewport}
                            variants={sectionVariants}
                        >
                            <h3 className="text-xl font-medium mb-4 text-stone-900 dark:text-stone-100">
                                Sources
                            </h3>
                            <ul className="space-y-2">
                                {post.sources.map((source) => (
                                    <li key={source} className="text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
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
                        </MotionDiv>
                    )}

                    <MotionDiv
                        className="mt-12 pt-8 border-t border-stone-200 dark:border-stone-800"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={sectionVariants}
                    >
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
                    </MotionDiv>

                    <MotionDiv
                        className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800 text-center"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={sectionVariants}
                    >
                        <MotionDiv whileHover={motionEnabled ? { y: -4 } : undefined}>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to all articles
                            </Link>
                        </MotionDiv>
                    </MotionDiv>
                </MotionDiv>
            </article>

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

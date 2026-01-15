import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Brain, FileText, Clock, TrendingUp, Newspaper, BookOpen, Users, Menu, X, LogIn, LogOut } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const PublicationSummarizerCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);
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

    const problemStats = [
        { value: '60%', label: 'Feel overwhelmed by information' },
        { value: '2.5h', label: 'Daily time spent reading reports' },
        { value: '73%', label: 'Miss insights due to time constraints' },
        { value: '40+', label: 'Publications tracked on average' }
    ];

    const proposedFeatures = [
        {
            icon: Brain,
            title: 'AI-Powered Extraction',
            description: 'Leverages LLMs to identify and extract salient points from economic publications and research papers.',
            status: 'Planned'
        },
        {
            icon: FileText,
            title: 'Structured Summaries',
            description: 'Generates consistent, scannable summaries with key takeaways and actionable insights.',
            status: 'Planned'
        },
        {
            icon: TrendingUp,
            title: 'Trend Analysis',
            description: 'Identifies patterns across publications, highlighting emerging themes and contrasting viewpoints.',
            status: 'Concept'
        },
        {
            icon: Clock,
            title: 'Time Optimization',
            description: 'Reduces time-to-insight from hours to minutes while maintaining accuracy.',
            status: 'Planned'
        },
        {
            icon: Newspaper,
            title: 'Multi-Source Aggregation',
            description: 'Aggregates insights from multiple publications into cohesive briefings.',
            status: 'Concept'
        },
        {
            icon: BookOpen,
            title: 'Personalized Digests',
            description: 'Learns user preferences to prioritize and customize information presented.',
            status: 'Future'
        }
    ];

    const targetUsers = [
        {
            persona: 'Financial Analyst',
            needs: 'Rapid consumption of earnings reports, economic indicators, and market analysis',
            pain: 'Drowning in quarterly reports, missing signals in less-covered publications'
        },
        {
            persona: 'Policy Researcher',
            needs: 'Tracking policy papers, think tank publications, and academic research',
            pain: 'Hours spent on literature review, difficulty synthesizing across sources'
        },
        {
            persona: 'Business Executive',
            needs: 'High-level market intelligence and strategic insights',
            pain: 'Time-starved, relies on summaries but loses nuance and context'
        }
    ];

    const researchPhases = [
        {
            phase: 'Discovery',
            questions: [
                'How do professionals currently consume economic publications?',
                'What are the primary pain points in information processing?',
                'What existing solutions do they use, and where do they fall short?'
            ]
        },
        {
            phase: 'Validation',
            questions: [
                'Would AI-summarized content be trusted for decision-making?',
                'What level of detail is required for different use cases?',
                'What is the acceptable accuracy threshold?'
            ]
        },
        {
            phase: 'Definition',
            questions: [
                'What publications should be prioritized initially?',
                'How should summaries be structured and formatted?',
                'How do we measure success and user satisfaction?'
            ]
        }
    ];

    const nextSteps = [
        { step: 1, title: 'User Research', description: 'Validate problem assumptions through interviews', status: 'upcoming' },
        { step: 2, title: 'Prototype Development', description: 'Build MVP using existing LLM APIs', status: 'upcoming' },
        { step: 3, title: 'Beta Testing', description: 'Partner with professionals for real-world testing', status: 'planned' },
        { step: 4, title: 'Iteration & Launch', description: 'Refine based on feedback and prepare for release', status: 'planned' }
    ];

    return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <header className="fixed top-0 w-full z-50 bg-stone-50/95 dark:bg-stone-950/95 backdrop-blur-sm border-b border-stone-200 dark:border-stone-800">
                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden sm:inline">Back to Portfolio</span>
                    </Link>
                    
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Product Concept
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
            <section className={`pt-32 pb-20 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            AI/ML Concept
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Concept Phase
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">Publication </span>
                        <span className="block italic text-blue-500 dark:text-blue-400">Summarizer</span>
                    </h1>
                    
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        An AI-powered tool to summarize economic and general publications into succinct, 
                        actionable insights. Designed to help professionals stay informed efficiently.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['AI/ML', 'Natural Language Processing', 'Product Strategy', 'User Research'].map((tag) => (
                            <span 
                                key={tag}
                                className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem */}
            <section className="py-20 px-6 bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        The Problem
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        Professionals are drowning in information. The volume of economic publications, 
                        research papers, and market reports has exploded, but the time to consume them hasn't.
                    </p>
                </div>
            </section>

            {/* Problem Stats */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {problemStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-normal text-blue-500 dark:text-blue-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Users */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Users
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Target </span>
                            <span className="italic text-blue-500 dark:text-blue-400">audience</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {targetUsers.map((user, index) => (
                            <div key={index} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                                <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                                    <Users className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">{user.persona}</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>Needs</span>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{user.needs}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-wide text-stone-400 dark:text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>Pain Point</span>
                                        <p className="text-stone-600 dark:text-stone-400 text-sm mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{user.pain}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proposed Features */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Solution
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Proposed </span>
                            <span className="italic text-blue-500 dark:text-blue-400">features</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proposedFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6 hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            feature.status === 'Planned' 
                                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                : feature.status === 'Concept'
                                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                                : 'bg-stone-100 dark:bg-stone-800 text-stone-500 dark:text-stone-400'
                                        }`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {feature.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">{feature.title}</h3>
                                    <p className="text-stone-600 dark:text-stone-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-20 px-6 bg-blue-500 dark:bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-blue-200 block mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Value Proposition
                    </span>
                    <p className="text-xl md:text-2xl font-light leading-relaxed">
                        For busy professionals who need to stay informed but lack time to read everything, 
                        Publication Summarizer is an AI-powered tool that transforms lengthy economic 
                        publications into actionable insights—preserving nuance while dramatically reducing 
                        time-to-insight.
                    </p>
                    <div className="grid grid-cols-3 gap-6 mt-12">
                        <div>
                            <div className="text-3xl font-normal text-white mb-1">90%</div>
                            <div className="text-sm text-blue-200" style={{ fontFamily: 'system-ui, sans-serif' }}>Time saved per publication</div>
                        </div>
                        <div>
                            <div className="text-3xl font-normal text-white mb-1">95%</div>
                            <div className="text-sm text-blue-200" style={{ fontFamily: 'system-ui, sans-serif' }}>Key insight retention</div>
                        </div>
                        <div>
                            <div className="text-3xl font-normal text-white mb-1">∞</div>
                            <div className="text-sm text-blue-200" style={{ fontFamily: 'system-ui, sans-serif' }}>Scalable coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Research Framework */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Research
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Validation </span>
                            <span className="italic text-blue-500 dark:text-blue-400">framework</span>
                        </h2>
                    </div>

                    <div className="space-y-8">
                        {researchPhases.map((phase, index) => (
                            <div key={index} className="border-t border-stone-200 dark:border-stone-800 pt-8">
                                <div className="flex gap-6">
                                    <span className="text-4xl font-light text-stone-300 dark:text-stone-700">0{index + 1}</span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-4">{phase.phase}</h3>
                                        <ul className="space-y-2">
                                            {phase.questions.map((q, i) => (
                                                <li key={i} className="flex gap-3 text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    <span className="text-blue-500 dark:text-blue-400 mt-0.5">—</span>
                                                    {q}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Roadmap
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Next </span>
                            <span className="italic text-blue-500 dark:text-blue-400">steps</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {nextSteps.map((item) => (
                            <div 
                                key={item.step}
                                className={`flex items-center gap-4 p-4 rounded-lg border ${
                                    item.status === 'upcoming' 
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' 
                                        : 'bg-stone-50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-800'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                                    item.status === 'upcoming'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-stone-300 dark:bg-stone-700 text-stone-600 dark:text-stone-400'
                                }`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {item.step}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-medium text-stone-900 dark:text-stone-100">{item.title}</h3>
                                    <p className="text-sm text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{item.description}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    item.status === 'upcoming'
                                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                        : 'bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400'
                                }`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {item.status === 'upcoming' ? 'Up Next' : 'Planned'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 px-6 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-stone-500 dark:text-stone-400 mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        This project is currently in the concept phase. Follow along as it develops.
                    </p>
                    <Link 
                        to="/"
                        className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Portfolio
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PublicationSummarizerCase;

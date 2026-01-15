import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle, Menu, X, LogIn, LogOut } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const FilmSlateCase = () => {
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

    const metrics = [
        { value: '32%', label: 'Initial Conversion', context: 'Baseline rate' },
        { value: '40%', label: 'Target Conversion', context: 'Q3 goal' },
        { value: '92%', label: 'Onboarding Completion', context: 'Up from 78%' },
        { value: '2.8min', label: 'Time to Value', context: 'Down from 8+ min' }
    ];

    const process = [
        {
            phase: '01',
            title: 'Discovery',
            description: 'Analyzed the indie film streaming landscape through stakeholder interviews, competitive analysis of MUBI and IndieFlix, and user behavior data review.',
            insights: [
                'Trial-to-paid conversion was 32%, below the 40% target',
                'Users struggled with content discovery due to lack of personalization',
                'Competitors offered either rigid curation or overwhelming catalogs'
            ]
        },
        {
            phase: '02',
            title: 'User Research',
            description: 'Conducted 12 user interviews, analyzed drop-off patterns, and surveyed 200+ potential users on content discovery preferences.',
            insights: [
                '80% of users expressed desire for personalized recommendations',
                'Average time to first meaningful interaction: 8+ minutes',
                'Primary frustration: "I don\'t know where to start"'
            ]
        },
        {
            phase: '03',
            title: 'Ideation & Design',
            description: 'Ran design thinking workshops, generated solution concepts, and prioritized features using RICE framework.',
            insights: [
                'Enhanced onboarding preferences emerged as highest-impact solution',
                'Visual genre selection preferred over text-based options',
                'Immediate personalized preview crucial for value demonstration'
            ]
        },
        {
            phase: '04',
            title: 'Validation',
            description: 'Built interactive prototypes, conducted moderated usability testing with 8 participants, and ran A/B tests against the current flow.',
            insights: [
                '75% trial activation rate achieved in testing',
                '85% content engagement in first session',
                '4.2/5 user satisfaction score'
            ]
        }
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
                            Case Study
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
                            Product Strategy
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            MVP Complete
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">Film</span>
                        <span className="italic text-blue-500 dark:text-blue-400">Slate</span>
                    </h1>
                    
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Designing an enhanced onboarding experience for an indie film streaming platform 
                        to improve trial-to-paid conversion rates through personalization.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['Product Design', 'User Research', 'Prototyping', 'A/B Testing', 'Go-to-Market'].map((tag) => (
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

            {/* Challenge */}
            <section className="py-20 px-6 bg-stone-900 dark:bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        The Challenge
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        FilmSlate's trial-to-paid conversion rate of 32% was below the target of 40%. 
                        New users struggled with content discovery due to lack of personalization, 
                        leading to early abandonment before experiencing the platform's value.
                    </p>
                </div>
            </section>

            {/* Metrics */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {metrics.map((metric, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-normal text-blue-500 dark:text-blue-400 mb-2">{metric.value}</div>
                                <div className="text-sm font-medium text-stone-900 dark:text-stone-100 mb-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{metric.label}</div>
                                <div className="text-xs text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{metric.context}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Process
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Product </span>
                            <span className="italic text-blue-500 dark:text-blue-400">development journey</span>
                        </h2>
                    </div>

                    <div className="space-y-16">
                        {process.map((step, index) => (
                            <div key={index} className="border-t border-stone-200 dark:border-stone-800 pt-8">
                                <div className="flex gap-6">
                                    <span className="text-4xl font-light text-stone-300 dark:text-stone-700">{step.phase}</span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-3">{step.title}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 mb-6 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {step.description}
                                        </p>
                                        <ul className="space-y-2">
                                            {step.insights.map((insight, i) => (
                                                <li key={i} className="flex gap-3 text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    <span className="text-blue-500 dark:text-blue-400 mt-1">—</span>
                                                    {insight}
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

            {/* Positioning */}
            <section className="py-20 px-6 bg-blue-500 dark:bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-blue-200 block mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Product Positioning
                    </span>
                    <blockquote className="text-xl md:text-2xl font-light leading-relaxed">
                        "For film enthusiasts feeling overwhelmed by mainstream streaming platforms, 
                        FilmSlate is the premier indie film streaming service that transforms content discovery 
                        through personalized curation. Unlike MUBI's rigid curation or IndieFlix's overwhelming catalog, 
                        FilmSlate uniquely combines intelligent preference-based recommendations with expert human curation."
                    </blockquote>
                </div>
            </section>

            {/* Hypothesis */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Validation
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Hypothesis & </span>
                            <span className="italic text-blue-500 dark:text-blue-400">testing</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        <div className="border-l-4 border-amber-500 bg-amber-50 dark:bg-amber-900/20 p-6 rounded-r-lg">
                            <h3 className="font-medium text-stone-900 dark:text-stone-100 mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Riskiest Assumption</h3>
                            <p className="text-stone-700 dark:text-stone-300" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                "Users will be willing to invest time in providing detailed preferences during sign-up, 
                                and this additional step won't negatively impact completion rates."
                            </p>
                        </div>

                        <div className="border-l-4 border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-r-lg">
                            <h3 className="font-medium text-stone-900 dark:text-stone-100 mb-2" style={{ fontFamily: 'system-ui, sans-serif' }}>Validated Hypothesis</h3>
                            <p className="text-stone-700 dark:text-stone-300 mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                If we implement the Enhanced Onboarding Preferences Page, then we will see a 50% increase 
                                in user engagement during onboarding without negatively impacting completion rates.
                            </p>
                            <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                <CheckCircle className="w-5 h-5" />
                                <span className="font-medium">Validated through user testing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Learnings */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Outcomes
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Key </span>
                            <span className="italic text-blue-500 dark:text-blue-400">learnings</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            'Early personalization significantly impacts conversion intent',
                            'Visual preference selection outperforms text-based alternatives',
                            'Progressive disclosure reduces cognitive load without losing depth',
                            'Immediate value demonstration is critical for niche platforms'
                        ].map((learning, index) => (
                            <div key={index} className="flex gap-3 p-4 bg-stone-50 dark:bg-stone-800 rounded-lg">
                                <span className="text-blue-500 dark:text-blue-400 mt-0.5">—</span>
                                <p className="text-stone-700 dark:text-stone-300" style={{ fontFamily: 'system-ui, sans-serif' }}>{learning}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 px-6 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-stone-500 dark:text-stone-400 mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        This project was completed as part of the King's College London Product Management program.
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

export default FilmSlateCase;

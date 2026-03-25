import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, ExternalLink, Music, MessageCircle, Users, ShoppingBag, Zap, Layout, CheckCircle2, Clock, Bell, CreditCard, Search, Lock, Star, Package } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const LiveOCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const techStack = {
        backend: ['Ruby on Rails', 'PostgreSQL', 'OAuth', 'Stripe API', 'Action Cable', 'Redis', 'Sentry', 'SolidQueue', 'Resend'],
        frontend: ['Next.js', 'React 18', 'Tailwind CSS', 'Stripe Elements', 'Active Storage']
    };

    const builtFeatures = [
        {
            icon: Lock,
            title: 'Auth & User Profiles',
            description: 'JWT authentication (24-hour expiry), Auth0 OAuth (Google & GitHub), user profiles with avatar, bio, skills, and role.'
        },
        {
            icon: Search,
            title: 'Creator Discovery',
            description: 'Unified /discover page with role-based filtering (Producer, Vocalist, Engineer), experience level filtering, and keyword search.'
        },
        {
            icon: ShoppingBag,
            title: 'Services & Tiers',
            description: 'Full service CRUD with tiered pricing (Basic, Standard, Premium), features list per tier, and comparison view UI.'
        },
        {
            icon: CreditCard,
            title: 'Stripe Payments',
            description: 'PaymentIntent integration, Stripe Connect for seller payouts, 14-day earnings hold, payout requests, and webhook handling.'
        },
        {
            icon: Package,
            title: 'Orders & Delivery',
            description: 'Full order lifecycle (pending → paid → in_progress → in_review → completed), revision flows, and deliverable upload/download.'
        },
        {
            icon: MessageCircle,
            title: 'Messaging',
            description: 'Direct conversations between users with real-time message display and read status tracking via Action Cable.'
        },
        {
            icon: Bell,
            title: 'Email & Notifications',
            description: 'Branded emails via Resend, in-app notification bell, 12 event types, async delivery via SolidQueue, and newsletter with double opt-in.'
        },
        {
            icon: Layout,
            title: 'Seller Dashboard',
            description: 'Earnings overview (available, pending, total), order management, and Stripe Connect account status.'
        }
    ];

    const roadmap = [
        {
            phase: 'Phase 1 & 2',
            title: 'Core Platform & Email',
            description: 'Full marketplace, payments, orders, messaging, email notifications, and seller dashboard.',
            status: 'complete',
            label: 'Complete'
        },
        {
            phase: 'Phase 3',
            title: 'Tech Debt Resolution',
            description: 'Auth persistence improvements, lint & type check fixes, hardcoded data cleanup, and order scoping.',
            status: 'active',
            label: 'In Progress'
        },
        {
            phase: 'Phase 4',
            title: 'Admin Hub',
            description: 'Private admin panel for user management, sign-up monitoring, support queries, newsletter, and platform metrics.',
            status: 'complete',
            label: 'Complete'
        },
        {
            phase: 'Phase 5',
            title: 'Support System',
            description: 'User-facing help form, support ticket lifecycle, admin responses, and FAQ / knowledge base.',
            status: 'planned',
            label: 'Planned'
        },
        {
            phase: 'Phase 6a',
            title: 'Reviews & Ratings',
            description: 'Review model tied to completed orders, star ratings with aggregate computation, and seller responses.',
            status: 'planned',
            label: 'Planned'
        },
        {
            phase: 'Phase 6b',
            title: 'Service-Oriented Messaging',
            description: 'File sharing in chat, in-conversation service offers, order initiation from chat, order updates in thread, and rich message types.',
            status: 'next',
            label: 'Key Next Feature'
        },
        {
            phase: 'Phase 7',
            title: 'Polish & Scale',
            description: 'Waveform audio player, infinite scroll, comprehensive test suite (90%+ coverage), rate limiting, and mobile audit.',
            status: 'future',
            label: 'Future'
        }
    ];

    const statusStyles = {
        complete: {
            badge: 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
            dot: 'bg-emerald-500',
            border: 'border-emerald-200 dark:border-emerald-800'
        },
        active: {
            badge: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
            dot: 'bg-amber-500',
            border: 'border-amber-200 dark:border-amber-800'
        },
        next: {
            badge: 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
            dot: 'bg-blue-500',
            border: 'border-blue-200 dark:border-blue-800'
        },
        planned: {
            badge: 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400',
            dot: 'bg-stone-400',
            border: 'border-stone-200 dark:border-stone-800'
        },
        future: {
            badge: 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
            dot: 'bg-purple-400',
            border: 'border-stone-200 dark:border-stone-800'
        }
    };

    const platformStats = [
        { value: '2', label: 'Phases shipped' },
        { value: '12+', label: 'Notification event types' },
        { value: '5', label: 'Order lifecycle stages' },
        { value: '78%', label: 'Creators want a unified platform' }
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
                        <span>Back to Portfolio</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Case Study
                        </span>
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className={`pt-32 pb-20 px-6 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Full-Stack Development
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Live &amp; Growing
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">live</span>
                        <span className="italic text-blue-500 dark:text-blue-400">.o</span>
                    </h1>
                    
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        A community-first music collaboration marketplace—live at{' '}
                        <a href="https://liveo.space" target="_blank" rel="noopener noreferrer" className="text-blue-500 dark:text-blue-400 underline underline-offset-2">liveo.space</a>
                        {' '}and onboarding new creators. Built with Ruby on Rails and Next.js, it connects musicians, producers, vocalists, and engineers through a full-featured service marketplace.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['Next.js', 'Ruby on Rails', 'Stripe', 'PostgreSQL', 'Action Cable', 'Resend'].map((tag) => (
                            <span 
                                key={tag}
                                className="px-4 py-2 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-10">
                        <a
                            href="https://liveo.space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            Explore the Platform
                        </a>
                    </div>
                </div>
            </section>

            {/* Vision */}
            <section className="py-20 px-6 bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        The Vision
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        A platform built with community at its core—where creative professionals 
                        don&apos;t just transact, they collaborate, grow together, and shape the 
                        platform they work on.
                    </p>
                </div>
            </section>

            {/* Platform Stats */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {platformStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-normal text-blue-500 dark:text-blue-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What's Built */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Platform — Live Now
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">What&apos;s </span>
                            <span className="italic text-blue-500 dark:text-blue-400">shipped</span>
                        </h2>
                        <p className="mt-4 text-stone-600 dark:text-stone-400 max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Phases 1 &amp; 2 are fully deployed. Everything below is live and accessible to users at liveo.space.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {builtFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6 hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                                        </div>
                                        <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1" />
                                    </div>
                                    <h3 className="text-base font-medium text-stone-900 dark:text-stone-100 mb-2">{feature.title}</h3>
                                    <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Key Differentiator */}
            <section className="py-20 px-6 bg-blue-500 dark:bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-blue-200 block mb-6 text-center" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        What Sets live.o Apart
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light leading-relaxed mb-10 text-center">
                        Community-First Collaboration
                    </h3>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Users className="w-5 h-5 text-blue-100" />
                                <h4 className="font-medium text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Built with Community</h4>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                Unlike Fiverr or SoundCloud, live.o is being shaped by the community it serves. 
                                Creators influence the roadmap, and the platform is designed to foster genuine 
                                professional relationships—not just one-off transactions.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <MessageCircle className="w-5 h-5 text-blue-100" />
                                <h4 className="font-medium text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Service-Oriented Messaging <span className="text-xs ml-1 opacity-75">(Coming Next)</span></h4>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                The next major differentiator: transforming chat into a full service collaboration hub. 
                                Send service proposals, accept offers, initiate orders, share files, and track 
                                deliverables—all within a single conversation thread.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Music className="w-5 h-5 text-blue-100" />
                                <h4 className="font-medium text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Audio-Native Marketplace</h4>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                Portfolio previews with audio playback directly on creator cards. The platform understands 
                                the creative workflow—not just job listings, but the ability to hear and evaluate work 
                                before engaging a professional.
                            </p>
                        </div>
                        <div className="bg-white/10 rounded-xl p-6">
                            <div className="flex items-center gap-3 mb-3">
                                <Star className="w-5 h-5 text-blue-100" />
                                <h4 className="font-medium text-white" style={{ fontFamily: 'system-ui, sans-serif' }}>Trust Through Reviews <span className="text-xs ml-1 opacity-75">(Coming Soon)</span></h4>
                            </div>
                            <p className="text-blue-100 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                A reviews system tied to completed orders will bring transparency and trust. 
                                Sellers can respond to reviews, and aggregate ratings will surface the most 
                                reliable professionals in the community.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Roadmap */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Where We Are &amp; Where We&apos;re Going
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Platform </span>
                            <span className="italic text-blue-500 dark:text-blue-400">roadmap</span>
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {roadmap.map((item, index) => {
                            const styles = statusStyles[item.status];
                            return (
                                <div key={index} className={`border ${styles.border} rounded-lg p-6 transition-colors`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${styles.dot}`} />
                                            <div>
                                                <div className="flex items-center gap-3 mb-1">
                                                    <span className="text-xs tracking-[0.2em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                        {item.phase}
                                                    </span>
                                                </div>
                                                <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">{item.title}</h3>
                                                <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>{item.description}</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs px-3 py-1 rounded-full flex-shrink-0 ${styles.badge}`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {item.label}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 px-6 bg-white dark:bg-stone-900">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Architecture
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Tech </span>
                            <span className="italic text-blue-500 dark:text-blue-400">stack</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Backend</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.backend.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Frontend</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.frontend.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <section className="py-20 px-6 border-t border-stone-200 dark:border-stone-800">
                <div className="max-w-4xl mx-auto text-center">
                    <p className="text-stone-500 dark:text-stone-400 mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        live.o is live and onboarding creators. Explore the platform or check out the open-source repository.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="https://liveo.space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ExternalLink className="w-4 h-4" />
                            View Live
                        </a>
                        <a 
                            href="https://github.com/kanya01/live.o"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <Github className="w-4 h-4" />
                            View on GitHub
                        </a>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Portfolio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LiveOCase;

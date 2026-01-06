import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Github, Music, MessageCircle, Users, ShoppingBag, Zap, Layout } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const FreqSpaceCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const techStack = {
        backend: ['Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'JWT', 'Sharp', 'FFmpeg'],
        frontend: ['React 18', 'Redux Toolkit', 'React Router v6', 'Tailwind CSS', 'Axios']
    };

    const features = [
        {
            icon: Music,
            title: 'Multi-Format Upload',
            description: 'Support for audio (MP3, WAV, FLAC), video (MP4, WebM), and images.',
            status: 'Complete'
        },
        {
            icon: Zap,
            title: 'Waveform Visualization',
            description: 'Interactive audio waveforms with timestamp-based comments.',
            status: 'Complete'
        },
        {
            icon: Layout,
            title: 'Portfolio System',
            description: 'Organize and showcase creative work with customizable pages.',
            status: 'Complete'
        },
        {
            icon: Users,
            title: 'User Profiles',
            description: 'Customizable profiles with bio, skills, and social links.',
            status: 'Complete'
        },
        {
            icon: MessageCircle,
            title: 'Real-time Comments',
            description: 'Live commenting powered by Socket.IO for instant collaboration.',
            status: 'Complete'
        },
        {
            icon: ShoppingBag,
            title: 'Marketplace',
            description: 'Service listings and professional search functionality.',
            status: 'In Progress'
        }
    ];

    const process = [
        {
            phase: '01',
            title: 'Problem Identification',
            description: 'Creative professionals lack a unified platform combining portfolio showcasing, real-time collaboration, and marketplace functionality. Existing solutions are fragmented across SoundCloud, Behance, and Fiverr.'
        },
        {
            phase: '02',
            title: 'Market Research',
            description: 'Analyzed competitors to identify key gaps: no timestamp-based audio feedback, no integrated marketplace in portfolio platforms, and poor real-time collaboration tools.'
        },
        {
            phase: '03',
            title: 'User Research',
            description: 'Conducted interviews with musicians, producers, and engineers. 78% wanted a single platform, 85% valued real-time feedback, and 92% struggled with client acquisition.'
        },
        {
            phase: '04',
            title: 'Technical Architecture',
            description: 'Built with MERN stack for scalability. Implemented Socket.IO for real-time features, Sharp and FFmpeg for media processing, and JWT authentication.'
        }
    ];

    const researchStats = [
        { value: '78%', label: 'Want unified platform' },
        { value: '85%', label: 'Need real-time feedback' },
        { value: '92%', label: 'Struggle with client acquisition' }
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
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            In Development
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">freq</span>
                        <span className="italic text-blue-500 dark:text-blue-400">.space</span>
                    </h1>
                    
                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        The marketplace for creative professionals. A full-stack platform connecting 
                        musicians, producers, and engineers with clients who need their services.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['React 18', 'Node.js', 'MongoDB', 'Socket.IO', 'Redux Toolkit'].map((tag) => (
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

            {/* Vision */}
            <section className="py-20 px-6 bg-stone-900 text-stone-50">
                <div className="max-w-4xl mx-auto">
                    <span className="text-xs tracking-[0.3em] uppercase text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        The Vision
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        A unified platform where creative professionals can showcase their work, 
                        connect with collaborators, and build sustainable careers—all without 
                        fragmenting their presence across multiple services.
                    </p>
                </div>
            </section>

            {/* Research Stats */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-3 gap-8">
                        {researchStats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-normal text-blue-500 dark:text-blue-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{stat.label}</div>
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
                            Development
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Product </span>
                            <span className="italic text-blue-500 dark:text-blue-400">journey</span>
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {process.map((step, index) => (
                            <div key={index} className="border-t border-stone-200 dark:border-stone-800 pt-8">
                                <div className="flex gap-6">
                                    <span className="text-4xl font-light text-stone-300 dark:text-stone-700">{step.phase}</span>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-3">{step.title}</h3>
                                        <p className="text-stone-600 dark:text-stone-400 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Features
                        </span>
                        <h2 className="text-3xl md:text-4xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Core </span>
                            <span className="italic text-blue-500 dark:text-blue-400">functionality</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div key={index} className="border border-stone-200 dark:border-stone-800 rounded-lg p-6 hover:border-stone-300 dark:hover:border-stone-700 transition-colors">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                            <Icon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            feature.status === 'Complete' 
                                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                                                : 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
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

            {/* Key Differentiator */}
            <section className="py-20 px-6 bg-blue-500 dark:bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-blue-200 block mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Key Differentiator
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light leading-relaxed mb-6">
                        Interactive Waveform Comments
                    </h3>
                    <p className="text-blue-100 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Unlike SoundCloud's basic commenting or Behance's visual-only feedback, freq.space enables 
                        precise timestamp-based comments on audio waveforms. Creative professionals can receive 
                        specific feedback at exact moments in their tracks—essential for collaborative music 
                        production and audio engineering workflows.
                    </p>
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
                        freq.space is an open-source project. Check out the repository to see the full implementation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="https://github.com/kanya01/freq.space"
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

export default FreqSpaceCase;

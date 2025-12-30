import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Users, Search, Lightbulb, Code, Database, Layout, Zap, Music, MessageCircle, UserCircle, ShoppingBag, Github, ExternalLink, CheckCircle, Server, Globe } from 'lucide-react';

const FreqSpaceCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState('problem');

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const techStack = {
        backend: [
            { name: 'Node.js', desc: 'Runtime environment' },
            { name: 'Express.js', desc: 'Web framework' },
            { name: 'MongoDB', desc: 'Database' },
            { name: 'Socket.IO', desc: 'Real-time communication' },
            { name: 'JWT', desc: 'Authentication' },
            { name: 'Sharp', desc: 'Image processing' },
            { name: 'FFmpeg', desc: 'Audio processing' }
        ],
        frontend: [
            { name: 'React 18', desc: 'UI framework' },
            { name: 'Redux Toolkit', desc: 'State management' },
            { name: 'React Router v6', desc: 'Navigation' },
            { name: 'Tailwind CSS', desc: 'Styling' },
            { name: 'Axios', desc: 'HTTP client' },
            { name: 'Heroicons', desc: 'Icon system' }
        ]
    };

    const features = [
        {
            icon: Music,
            title: 'Multi-Format Upload',
            description: 'Support for audio (MP3, WAV, FLAC), video (MP4, WebM), and images (JPG, PNG, GIF)',
            status: 'Complete'
        },
        {
            icon: Zap,
            title: 'Waveform Visualization',
            description: 'Interactive audio waveforms with timestamp-based comments for precise feedback',
            status: 'Complete'
        },
        {
            icon: Layout,
            title: 'Portfolio System',
            description: 'Organize and showcase creative work with customizable portfolio pages',
            status: 'Complete'
        },
        {
            icon: UserCircle,
            title: 'User Profiles',
            description: 'Customizable profiles with bio, skills, social links, and role-based access',
            status: 'Complete'
        },
        {
            icon: MessageCircle,
            title: 'Real-time Comments',
            description: 'Live commenting system powered by Socket.IO for instant collaboration',
            status: 'Complete'
        },
        {
            icon: ShoppingBag,
            title: 'Marketplace',
            description: 'Service listings, client reviews, and professional search functionality',
            status: 'In Progress'
        }
    ];

    const processSteps = [
        {
            phase: '01',
            title: 'Problem Identification',
            content: 'Creative professionals struggle to find a unified platform that combines portfolio showcasing, real-time collaboration, and marketplace functionality. Existing solutions are fragmented—SoundCloud for audio, Behance for visuals, Fiverr for services—forcing creatives to maintain multiple profiles and losing potential connections.',
            color: 'from-rose-500 to-pink-600'
        },
        {
            phase: '02',
            title: 'Market Research',
            content: 'Analyzed competitor platforms including SoundCloud, Behance, Fiverr, and Upwork. Identified key gaps: lack of timestamp-based feedback on audio, no integrated marketplace in portfolio platforms, poor real-time collaboration tools, and fragmented professional networking for audio professionals.',
            color: 'from-amber-500 to-orange-600'
        },
        {
            phase: '03',
            title: 'User Research',
            content: 'Conducted interviews with musicians, producers, and engineers. Key findings: 78% wanted a single platform for portfolio and services, 85% valued real-time feedback capabilities, and 92% struggled with client acquisition through existing platforms.',
            color: 'from-blue-500 to-indigo-600'
        },
        {
            phase: '04',
            title: 'Solution Design',
            content: 'Designed a full-stack platform combining social networking, portfolio management, and marketplace. Core differentiator: interactive waveform visualization with timestamp comments enabling precise creative feedback—something no competitor offers effectively.',
            color: 'from-emerald-500 to-teal-600'
        },
        {
            phase: '05',
            title: 'Technical Architecture',
            content: 'Built with MERN stack (MongoDB, Express, React, Node.js) for scalability. Implemented Socket.IO for real-time features, Sharp and FFmpeg for media processing, and JWT authentication. Designed modular architecture for future marketplace expansion.',
            color: 'from-violet-500 to-purple-600'
        },
        {
            phase: '06',
            title: 'Current Status & Roadmap',
            content: 'Core platform features complete including user authentication, profile management, content upload, and real-time commenting. Currently developing marketplace functionality with service listings and payment integration. Planning beta launch for Q2.',
            color: 'from-cyan-500 to-blue-600'
        }
    ];

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            {/* Navigation Header */}
            <header className="fixed top-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-neutral-400 hover:text-neutral-100 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>
                    <span className="text-sm text-neutral-500 tracking-wide uppercase">Product Case Study</span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
                </div>

                <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-violet-500/20 text-violet-300 text-sm font-medium rounded-full border border-violet-500/30">Full-Stack Development</span>
                        <span className="px-3 py-1 bg-amber-500/20 text-amber-300 text-sm font-medium rounded-full border border-amber-500/30">In Development</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-blue-400 bg-clip-text text-transparent">
                        freq.space
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-neutral-400 leading-relaxed mb-8 max-w-3xl">
                        The marketplace for creative professionals. A full-stack platform connecting talented 
                        musicians, producers, and engineers with clients who need their services.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {['React 18', 'Node.js', 'MongoDB', 'Socket.IO', 'Redux Toolkit', 'Tailwind CSS'].map((tag) => (
                            <span 
                                key={tag}
                                className="px-4 py-2 bg-neutral-800/50 text-neutral-300 rounded-lg text-sm font-medium border border-neutral-700"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Vision Statement */}
            <section className="py-20 px-6 bg-gradient-to-r from-violet-900/50 to-blue-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-sm uppercase tracking-widest text-violet-400 mb-6">The Vision</h2>
                    <p className="text-3xl md:text-4xl font-light leading-relaxed text-neutral-100">
                        A unified platform where creative professionals can showcase their work, 
                        connect with collaborators, and build sustainable careers—all without 
                        fragmenting their presence across multiple services.
                    </p>
                </div>
            </section>

            {/* Product Development Process */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Product Development Journey</h2>
                    <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
                        From identifying the market gap to building a production-ready platform
                    </p>

                    <div className="space-y-6">
                        {processSteps.map((step, index) => (
                            <div 
                                key={step.phase}
                                className={`bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 transition-all duration-500 hover:border-neutral-700 ${
                                    isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
                                }`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex items-start gap-6">
                                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center flex-shrink-0`}>
                                        <span className="text-2xl font-bold text-white">{step.phase}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-neutral-100 mb-3">{step.title}</h3>
                                        <p className="text-neutral-400 leading-relaxed">{step.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 bg-neutral-900/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Core Features</h2>
                    <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
                        Built with creative professionals in mind, every feature addresses a real pain point
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={feature.title}
                                    className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 hover:border-violet-500/50 transition-all duration-300 group"
                                >
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                        <Icon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-semibold text-neutral-100">{feature.title}</h3>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                                            feature.status === 'Complete' 
                                                ? 'bg-emerald-500/20 text-emerald-400' 
                                                : 'bg-amber-500/20 text-amber-400'
                                        }`}>
                                            {feature.status}
                                        </span>
                                    </div>
                                    <p className="text-neutral-400 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Tech Stack */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center">Technical Architecture</h2>
                    <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
                        Built on the MERN stack for scalability and performance
                    </p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Backend */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Server className="w-6 h-6 text-emerald-400" />
                                <h3 className="text-xl font-semibold">Backend</h3>
                            </div>
                            <div className="space-y-3">
                                {techStack.backend.map((tech) => (
                                    <div key={tech.name} className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0">
                                        <span className="font-medium text-neutral-200">{tech.name}</span>
                                        <span className="text-sm text-neutral-500">{tech.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Frontend */}
                        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Globe className="w-6 h-6 text-blue-400" />
                                <h3 className="text-xl font-semibold">Frontend</h3>
                            </div>
                            <div className="space-y-3">
                                {techStack.frontend.map((tech) => (
                                    <div key={tech.name} className="flex items-center justify-between py-2 border-b border-neutral-800 last:border-0">
                                        <span className="font-medium text-neutral-200">{tech.name}</span>
                                        <span className="text-sm text-neutral-500">{tech.desc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Differentiator */}
            <section className="py-20 px-6 bg-gradient-to-r from-violet-900/30 to-fuchsia-900/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center">Key Differentiator</h2>
                    
                    <div className="bg-neutral-900/80 border border-violet-500/30 rounded-2xl p-8">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-violet-600 flex items-center justify-center flex-shrink-0">
                                <Zap className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Interactive Waveform Comments</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    Unlike SoundCloud's basic commenting or Behance's visual-only feedback, freq.space enables 
                                    precise timestamp-based comments on audio waveforms. Creative professionals can receive 
                                    specific feedback at exact moments in their tracks—essential for collaborative music 
                                    production and audio engineering workflows.
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-neutral-800">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-violet-400">78%</div>
                                <div className="text-sm text-neutral-500">Want unified platform</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-fuchsia-400">85%</div>
                                <div className="text-sm text-neutral-500">Need real-time feedback</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">92%</div>
                                <div className="text-sm text-neutral-500">Struggle with client acquisition</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 px-6 bg-neutral-900/50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6">Explore the Code</h2>
                    <p className="text-neutral-400 mb-8">
                        freq.space is an open-source project. Check out the repository to see the full implementation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="https://github.com/kanya01/freq.space"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl hover:from-violet-500 hover:to-blue-500 transition-all"
                        >
                            <Github className="w-5 h-5" />
                            View on GitHub
                        </a>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-800 text-neutral-100 border border-neutral-700 rounded-xl hover:bg-neutral-700 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Portfolio
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FreqSpaceCase;

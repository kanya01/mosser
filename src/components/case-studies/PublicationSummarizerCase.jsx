import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Users, Search, Lightbulb, Brain, FileText, Clock, BarChart3, Sparkles, BookOpen, TrendingUp, Newspaper, ExternalLink, CheckCircle } from 'lucide-react';

const PublicationSummarizerCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeFeature, setActiveFeature] = useState(0);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const problemStats = [
        { value: '60%', label: 'of professionals feel overwhelmed by information' },
        { value: '2.5h', label: 'average daily time spent reading reports' },
        { value: '73%', label: 'miss important insights due to time constraints' },
        { value: '40+', label: 'publications tracked by avg. finance professional' }
    ];

    const proposedFeatures = [
        {
            icon: Brain,
            title: 'AI-Powered Extraction',
            description: 'Leverages large language models to identify and extract the most salient points from economic publications, research papers, and market reports.',
            status: 'Planned'
        },
        {
            icon: FileText,
            title: 'Structured Summaries',
            description: 'Generates consistent, scannable summaries with key takeaways, methodology notes, and actionable insights clearly separated.',
            status: 'Planned'
        },
        {
            icon: TrendingUp,
            title: 'Trend Analysis',
            description: 'Identifies patterns across multiple publications, highlighting emerging themes and contrasting viewpoints from different sources.',
            status: 'Concept'
        },
        {
            icon: Clock,
            title: 'Time Optimization',
            description: 'Reduces time-to-insight from hours to minutes while maintaining accuracy and nuance of original publications.',
            status: 'Planned'
        },
        {
            icon: Newspaper,
            title: 'Multi-Source Aggregation',
            description: 'Aggregates insights from multiple publications into cohesive briefings, eliminating redundant reading across similar reports.',
            status: 'Concept'
        },
        {
            icon: BookOpen,
            title: 'Personalized Digests',
            description: 'Learns user preferences and professional focus areas to prioritize and customize the information presented.',
            status: 'Future'
        }
    ];

    const researchPhases = [
        {
            phase: 'Discovery',
            questions: [
                'How do professionals currently consume economic publications?',
                'What are the primary pain points in information processing?',
                'What existing solutions do they use, and where do they fall short?',
                'How much time is lost to inefficient information consumption?'
            ],
            methods: ['User Interviews', 'Survey Research', 'Competitive Analysis']
        },
        {
            phase: 'Validation',
            questions: [
                'Would AI-summarized content be trusted for decision-making?',
                'What level of detail is required for different use cases?',
                'How should uncertainty and nuance be communicated?',
                'What's the acceptable accuracy threshold?'
            ],
            methods: ['Concept Testing', 'Prototype Feedback', 'A/B Testing']
        },
        {
            phase: 'Definition',
            questions: [
                'What publications should be prioritized initially?',
                'How should summaries be structured and formatted?',
                'What additional context enhances comprehension?',
                'How do we measure success and user satisfaction?'
            ],
            methods: ['Jobs-to-be-Done', 'User Story Mapping', 'MVP Scoping']
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

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
            {/* Navigation Header */}
            <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>
                    <span className="text-sm text-slate-500 tracking-wide uppercase">Product Concept</span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 z-0 opacity-30">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(100,116,139,0.3) 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                <div className={`max-w-4xl mx-auto relative z-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-sm font-medium rounded-full">AI-Powered Tool</span>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-medium rounded-full">Concept Phase</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Publication
                        <span className="block bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Summarizer
                        </span>
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-slate-600 leading-relaxed mb-8 max-w-3xl">
                        An AI-powered tool to summarize economic and general publications into succinct, 
                        actionable insights. Designed to help professionals stay informed efficiently.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {['AI/ML', 'Natural Language Processing', 'Product Strategy', 'User Research'].map((tag) => (
                            <span 
                                key={tag}
                                className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-sm uppercase tracking-widest text-slate-400 mb-4 text-center">The Problem</h2>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-center max-w-3xl mx-auto mb-16" style={{ fontFamily: 'Georgia, serif' }}>
                        Professionals are drowning in information. The volume of economic publications, 
                        research papers, and market reports has exploded, but the time to consume them hasn't.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {problemStats.map((stat, index) => (
                            <div 
                                key={index}
                                className="text-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700"
                            >
                                <div className="text-4xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                                <div className="text-sm text-slate-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Target Users */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Target Users
                    </h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        Understanding who would benefit most from automated publication summarization
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {targetUsers.map((user, index) => (
                            <div 
                                key={user.persona}
                                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center mb-4">
                                    <Users className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{user.persona}</h3>
                                <div className="space-y-3">
                                    <div>
                                        <span className="text-xs uppercase tracking-wide text-slate-500">Needs</span>
                                        <p className="text-slate-600 text-sm">{user.needs}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase tracking-wide text-slate-500">Pain Point</span>
                                        <p className="text-slate-600 text-sm">{user.pain}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Proposed Solution */}
            <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Proposed Solution
                    </h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        A smart summarization tool that distills publications to their essential insights
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {proposedFeatures.map((feature, index) => {
                            const Icon = feature.icon;
                            return (
                                <div 
                                    key={feature.title}
                                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-white" />
                                        </div>
                                        <span className={`text-xs px-2 py-1 rounded-full ${
                                            feature.status === 'Planned' 
                                                ? 'bg-blue-100 text-blue-700'
                                                : feature.status === 'Concept'
                                                ? 'bg-amber-100 text-amber-700'
                                                : 'bg-slate-100 text-slate-600'
                                        }`}>
                                            {feature.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{feature.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Research Framework */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-4 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Research Framework
                    </h2>
                    <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                        Structured approach to validating the concept and defining the product
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {researchPhases.map((phase, index) => (
                            <div 
                                key={phase.phase}
                                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm"
                            >
                                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4">
                                    <h3 className="text-lg font-semibold text-white">Phase {index + 1}: {phase.phase}</h3>
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h4 className="text-sm font-semibold text-slate-700 mb-3">Key Questions</h4>
                                        <ul className="space-y-2">
                                            {phase.questions.map((q, i) => (
                                                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                                    <ArrowRight className="w-4 h-4 mt-0.5 text-emerald-500 flex-shrink-0" />
                                                    <span>{q}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-semibold text-slate-700 mb-2">Methods</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {phase.methods.map((method) => (
                                                <span key={method} className="text-xs px-2 py-1 bg-slate-100 text-slate-600 rounded">
                                                    {method}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Value Proposition */}
            <section className="py-20 px-6 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <Sparkles className="w-12 h-12 text-emerald-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Value Proposition
                    </h2>
                    <p className="text-xl text-slate-300 leading-relaxed mb-8">
                        For busy professionals who need to stay informed but lack time to read everything, 
                        Publication Summarizer is an AI-powered tool that transforms lengthy economic 
                        publications into actionable insights. Unlike manual summarization or generic 
                        news aggregators, our solution preserves nuance while dramatically reducing 
                        time-to-insight.
                    </p>
                    <div className="grid grid-cols-3 gap-6 mt-12">
                        <div>
                            <div className="text-3xl font-bold text-emerald-400">90%</div>
                            <div className="text-sm text-slate-400">Time saved per publication</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-teal-400">95%</div>
                            <div className="text-sm text-slate-400">Key insight retention</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-cyan-400">∞</div>
                            <div className="text-sm text-slate-400">Scalable coverage</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Next Steps */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Next Steps
                    </h2>
                    
                    <div className="space-y-4">
                        {[
                            { step: 1, title: 'User Research', desc: 'Conduct interviews with target users to validate problem assumptions', status: 'upcoming' },
                            { step: 2, title: 'Prototype Development', desc: 'Build MVP using existing LLM APIs to test summarization quality', status: 'upcoming' },
                            { step: 3, title: 'Beta Testing', desc: 'Partner with professionals for real-world testing and feedback', status: 'planned' },
                            { step: 4, title: 'Iteration & Launch', desc: 'Refine based on feedback and prepare for wider release', status: 'planned' }
                        ].map((item) => (
                            <div 
                                key={item.step}
                                className={`flex items-center gap-4 p-4 rounded-xl border ${
                                    item.status === 'upcoming' 
                                        ? 'bg-emerald-50 border-emerald-200' 
                                        : 'bg-slate-50 border-slate-200'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                                    item.status === 'upcoming'
                                        ? 'bg-emerald-500 text-white'
                                        : 'bg-slate-300 text-slate-600'
                                }`}>
                                    {item.step}
                                </div>
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm text-slate-600">{item.desc}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                    item.status === 'upcoming'
                                        ? 'bg-emerald-100 text-emerald-700'
                                        : 'bg-slate-200 text-slate-600'
                                }`}>
                                    {item.status === 'upcoming' ? 'Up Next' : 'Planned'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Coming Soon
                    </h2>
                    <p className="text-slate-600 mb-8">
                        This project is currently in the concept phase. Follow along as it develops.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <button 
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:from-emerald-500 hover:to-teal-500 transition-all cursor-not-allowed opacity-75"
                            disabled
                        >
                            <Sparkles className="w-5 h-5" />
                            Notify Me When Ready
                        </button>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-900 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
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

export default PublicationSummarizerCase;

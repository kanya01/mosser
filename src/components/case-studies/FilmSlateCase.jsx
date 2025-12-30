import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, Users, Search, Lightbulb, Code, BarChart3, CheckCircle, ExternalLink } from 'lucide-react';

const FilmSlateCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activePhase, setActivePhase] = useState(0);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const processPhases = [
        {
            id: 'discovery',
            title: 'Discovery',
            icon: Search,
            color: 'from-amber-500 to-orange-600',
            duration: '2 weeks',
            content: {
                overview: 'Understanding the indie film streaming landscape and identifying key user pain points.',
                activities: [
                    'Stakeholder interviews with FilmSlate leadership',
                    'Competitive analysis of MUBI, IndieFlix, and Criterion Channel',
                    'User behavior data analysis from existing platform',
                    'Market research on indie film consumption trends'
                ],
                insights: [
                    'Current trial-to-paid conversion rate was 32%, below target of 40%',
                    'Users struggled with content discovery due to lack of personalization',
                    'Competitors offered either rigid curation (MUBI) or overwhelming catalogs (IndieFlix)',
                    'Sign-up process lacked personalization touchpoints'
                ]
            }
        },
        {
            id: 'research',
            title: 'User Research',
            icon: Users,
            color: 'from-blue-500 to-indigo-600',
            duration: '3 weeks',
            content: {
                overview: 'Deep dive into user needs, behaviors, and expectations through qualitative and quantitative methods.',
                activities: [
                    'Conducted 12 user interviews with indie film enthusiasts',
                    'Analyzed drop-off patterns in existing onboarding flow',
                    'Survey of 200+ potential users on content discovery preferences',
                    'Usability testing of current sign-up experience'
                ],
                insights: [
                    '80% of users expressed desire for personalized recommendations',
                    'Average time to first meaningful content interaction: 8+ minutes',
                    'Primary frustration: "I don\'t know where to start"',
                    'Users valued expert curation combined with personal taste matching'
                ]
            }
        },
        {
            id: 'ideation',
            title: 'Ideation',
            icon: Lightbulb,
            color: 'from-purple-500 to-violet-600',
            duration: '2 weeks',
            content: {
                overview: 'Generating and evaluating solution concepts based on research insights.',
                activities: [
                    'Design thinking workshops with cross-functional team',
                    'How Might We sessions focused on onboarding optimization',
                    'Concept sketching and rapid prototyping',
                    'Feature prioritization using RICE framework'
                ],
                insights: [
                    'Enhanced onboarding preferences emerged as highest-impact solution',
                    'Three-step preference flow balances depth with completion rates',
                    'Visual genre selection preferred over text-based options',
                    'Immediate personalized preview crucial for value demonstration'
                ]
            }
        },
        {
            id: 'solution',
            title: 'Solution Design',
            icon: Code,
            color: 'from-emerald-500 to-teal-600',
            duration: '4 weeks',
            content: {
                overview: 'Designing and prototyping the Enhanced Onboarding Preferences Page.',
                activities: [
                    'High-fidelity wireframes and interactive prototypes',
                    'User flow mapping for preference collection',
                    'A/B testing framework design',
                    'Technical feasibility assessment with engineering'
                ],
                features: [
                    'Visual genre selection with film poster previews',
                    'Director and actor preference matching',
                    'Theme-based categorization (mood, era, style)',
                    'Real-time personalized content preview'
                ]
            }
        },
        {
            id: 'validation',
            title: 'Testing & Validation',
            icon: CheckCircle,
            color: 'from-cyan-500 to-blue-600',
            duration: '3 weeks',
            content: {
                overview: 'Validating the solution through usability testing and iterative refinement.',
                activities: [
                    'Moderated usability testing with 8 participants',
                    'Task completion analysis across onboarding flow',
                    'Iteration based on user feedback',
                    'A/B testing prototype vs. current flow'
                ],
                results: [
                    '2.8 minutes average completion time (target: 3 min)',
                    '75% trial activation rate achieved',
                    '85% content engagement in first session',
                    '4.2/5 user satisfaction score'
                ]
            }
        },
        {
            id: 'outcomes',
            title: 'Outcomes',
            icon: BarChart3,
            color: 'from-rose-500 to-pink-600',
            duration: 'Ongoing',
            content: {
                overview: 'Measuring impact and projecting business value of the enhanced onboarding experience.',
                metrics: [
                    { label: 'Projected Conversion Improvement', value: '+8%', context: 'Path to 40% Q3 target' },
                    { label: 'Onboarding Completion Rate', value: '92%', context: 'Up from 78%' },
                    { label: 'Time to First Engagement', value: '2.8 min', context: 'Reduced from 8+ min' },
                    { label: 'User Satisfaction', value: '4.2/5', context: 'NPS score improved' }
                ],
                learnings: [
                    'Early personalization significantly impacts conversion intent',
                    'Visual preference selection outperforms text-based alternatives',
                    'Progressive disclosure reduces cognitive load without losing depth',
                    'Immediate value demonstration is critical for niche platforms'
                ]
            }
        }
    ];

    const currentPhase = processPhases[activePhase];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900">
            {/* Navigation Header */}
            <header className="fixed top-0 w-full z-50 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link 
                        to="/" 
                        className="flex items-center gap-2 text-stone-600 hover:text-stone-900 transition-colors group"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Back to Portfolio</span>
                    </Link>
                    <span className="text-sm text-stone-500 tracking-wide uppercase">Case Study</span>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className={`max-w-4xl mx-auto transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="flex items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">Product Strategy</span>
                        <span className="px-3 py-1 bg-stone-200 text-stone-700 text-sm font-medium rounded-full">MVP Complete</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        FilmSlate
                    </h1>
                    
                    <p className="text-xl md:text-2xl text-stone-600 leading-relaxed mb-8 max-w-3xl">
                        Designing an enhanced onboarding experience for an indie film streaming platform 
                        to improve trial-to-paid conversion rates through personalization.
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {['Product Design', 'User Research', 'Prototyping', 'A/B Testing', 'Go-to-Market'].map((tag) => (
                            <span 
                                key={tag}
                                className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg text-sm font-medium"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Problem Statement */}
            <section className="py-20 px-6 bg-stone-900 text-stone-100">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-sm uppercase tracking-widest text-stone-400 mb-4">The Challenge</h2>
                    <p className="text-3xl md:text-4xl font-light leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        FilmSlate's trial-to-paid conversion rate of 32% was below the target of 40%. 
                        New users struggled with content discovery due to lack of personalization in the sign-up process, 
                        leading to early abandonment before experiencing the platform's value.
                    </p>
                </div>
            </section>

            {/* Process Timeline */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12 text-center" style={{ fontFamily: 'Georgia, serif' }}>
                        Product Process
                    </h2>

                    {/* Phase Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {processPhases.map((phase, index) => {
                            const Icon = phase.icon;
                            return (
                                <button
                                    key={phase.id}
                                    onClick={() => setActivePhase(index)}
                                    className={`flex items-center gap-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                                        activePhase === index 
                                            ? `bg-gradient-to-r ${phase.color} text-white shadow-lg scale-105` 
                                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                                    }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span className="font-medium">{phase.title}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Phase Content */}
                    <div className="bg-white rounded-3xl shadow-xl border border-stone-200 overflow-hidden">
                        <div className={`h-2 bg-gradient-to-r ${currentPhase.color}`} />
                        
                        <div className="p-8 md:p-12">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                                        {currentPhase.title}
                                    </h3>
                                    <p className="text-stone-500">Duration: {currentPhase.duration}</p>
                                </div>
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${currentPhase.color} flex items-center justify-center`}>
                                    {React.createElement(currentPhase.icon, { className: 'w-8 h-8 text-white' })}
                                </div>
                            </div>

                            <p className="text-lg text-stone-600 mb-8 leading-relaxed">
                                {currentPhase.content.overview}
                            </p>

                            <div className="grid md:grid-cols-2 gap-8">
                                {currentPhase.content.activities && (
                                    <div>
                                        <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-blue-500" />
                                            Key Activities
                                        </h4>
                                        <ul className="space-y-3">
                                            {currentPhase.content.activities.map((activity, index) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600">
                                                    <ArrowRight className="w-4 h-4 mt-1 text-stone-400 flex-shrink-0" />
                                                    <span>{activity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentPhase.content.insights && (
                                    <div>
                                        <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                            Key Insights
                                        </h4>
                                        <ul className="space-y-3">
                                            {currentPhase.content.insights.map((insight, index) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600">
                                                    <Lightbulb className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                                                    <span>{insight}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentPhase.content.features && (
                                    <div>
                                        <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-purple-500" />
                                            Core Features
                                        </h4>
                                        <ul className="space-y-3">
                                            {currentPhase.content.features.map((feature, index) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600">
                                                    <CheckCircle className="w-4 h-4 mt-1 text-emerald-500 flex-shrink-0" />
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentPhase.content.results && (
                                    <div>
                                        <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-cyan-500" />
                                            Test Results
                                        </h4>
                                        <ul className="space-y-3">
                                            {currentPhase.content.results.map((result, index) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600">
                                                    <CheckCircle className="w-4 h-4 mt-1 text-cyan-500 flex-shrink-0" />
                                                    <span>{result}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {currentPhase.content.metrics && (
                                    <div className="md:col-span-2">
                                        <h4 className="font-semibold text-stone-900 mb-6 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                                            Impact Metrics
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {currentPhase.content.metrics.map((metric, index) => (
                                                <div key={index} className="bg-stone-50 rounded-xl p-4 text-center">
                                                    <div className="text-3xl font-bold text-stone-900 mb-1">{metric.value}</div>
                                                    <div className="text-sm font-medium text-stone-700 mb-1">{metric.label}</div>
                                                    <div className="text-xs text-stone-500">{metric.context}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {currentPhase.content.learnings && (
                                    <div className="md:col-span-2">
                                        <h4 className="font-semibold text-stone-900 mb-4 flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                                            Key Learnings
                                        </h4>
                                        <ul className="grid md:grid-cols-2 gap-3">
                                            {currentPhase.content.learnings.map((learning, index) => (
                                                <li key={index} className="flex items-start gap-3 text-stone-600 bg-stone-50 rounded-lg p-3">
                                                    <Lightbulb className="w-4 h-4 mt-1 text-amber-500 flex-shrink-0" />
                                                    <span>{learning}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Phase Navigation Arrows */}
                        <div className="flex justify-between items-center px-8 py-4 bg-stone-50 border-t border-stone-200">
                            <button
                                onClick={() => setActivePhase(Math.max(0, activePhase - 1))}
                                disabled={activePhase === 0}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    activePhase === 0 
                                        ? 'text-stone-300 cursor-not-allowed' 
                                        : 'text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Previous
                            </button>
                            <span className="text-sm text-stone-500">
                                {activePhase + 1} of {processPhases.length}
                            </span>
                            <button
                                onClick={() => setActivePhase(Math.min(processPhases.length - 1, activePhase + 1))}
                                disabled={activePhase === processPhases.length - 1}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                                    activePhase === processPhases.length - 1 
                                        ? 'text-stone-300 cursor-not-allowed' 
                                        : 'text-stone-600 hover:bg-stone-200'
                                }`}
                            >
                                Next
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Positioning Statement */}
            <section className="py-20 px-6 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-sm uppercase tracking-widest text-blue-200 mb-6">Product Positioning</h2>
                    <blockquote className="text-2xl md:text-3xl font-light leading-relaxed mb-8" style={{ fontFamily: 'Georgia, serif' }}>
                        "For film enthusiasts feeling overwhelmed by mainstream streaming platforms, 
                        FilmSlate is the premier indie film streaming service that transforms content discovery 
                        through personalized curation. Unlike MUBI's rigid curation or IndieFlix's overwhelming catalog, 
                        FilmSlate uniquely combines intelligent preference-based recommendations with expert human curation."
                    </blockquote>
                    <p className="text-blue-200">— Go-to-Market Strategy Positioning Statement</p>
                </div>
            </section>

            {/* Hypothesis & Validation */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-12" style={{ fontFamily: 'Georgia, serif' }}>
                        Hypothesis & Validation
                    </h2>
                    
                    <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-6 mb-8">
                        <h3 className="font-semibold text-amber-900 mb-3">Riskiest Assumption</h3>
                        <p className="text-amber-800 leading-relaxed">
                            "Users will be willing to invest time in providing detailed preferences during sign-up, 
                            and this additional step won't negatively impact completion rates."
                        </p>
                    </div>

                    <div className="bg-emerald-50 border-l-4 border-emerald-500 rounded-r-xl p-6">
                        <h3 className="font-semibold text-emerald-900 mb-3">Validated Hypothesis</h3>
                        <p className="text-emerald-800 leading-relaxed">
                            If we implement the Enhanced Onboarding Preferences Page, then we will see a 50% increase 
                            in user engagement during onboarding without negatively impacting completion rates, 
                            because users value personalized content discovery enough to invest time in preference selection.
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-emerald-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-medium">Hypothesis validated through user testing</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer CTA */}
            <section className="py-20 px-6 bg-stone-100">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                        Interested in the Full Case Study?
                    </h2>
                    <p className="text-stone-600 mb-8">
                        This project was completed as part of the King's College London Product Management program.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a 
                            href="#"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors"
                        >
                            <ExternalLink className="w-5 h-5" />
                            View Full Documentation
                        </a>
                        <Link 
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-stone-900 border border-stone-300 rounded-xl hover:bg-stone-50 transition-colors"
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

export default FilmSlateCase;

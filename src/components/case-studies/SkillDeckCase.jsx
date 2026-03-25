import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Github, Terminal, Layers, Users, BookOpen, Globe, Zap } from 'lucide-react';
import DarkModeToggle from '../DarkModeToggle';

const SkillDeckCase = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        window.scrollTo(0, 0);
    }, []);

    const metrics = [
        { value: '~60%', label: 'Lint Errors Reduced', context: 'Across pilot projects' },
        { value: '1 cmd', label: 'Install Friction', context: 'gem install skilldeck' },
        { value: '5min', label: 'Time to First Skill', context: 'Browse → activate → ship' },
        { value: '∞', label: 'Skills Composable', context: 'Layer as many as you need' }
    ];

    const process = [
        {
            phase: '01',
            title: 'The Spark',
            description: 'Working inside Antigravity IDE on a new feature, a cascade of linting errors hit the CI pipeline after merge. The root cause: the AI agent had no awareness of the project\'s conventions.',
            insights: [
                'IDEs like Antigravity, RubyMine, and Cursor support skills and rules to guide AI',
                'The skill configuration UX is ambiguous — developers skip it entirely',
                'Skipping skills means the agent hallucinates project-specific conventions',
                'The result: compiling code that fails style, security, and test checks'
            ]
        },
        {
            phase: '02',
            title: 'Problem Definition',
            description: 'Mapped the gap between what AI agents can do and what they should do inside a specific codebase. The blocker is not model quality — it is a missing skill layer.',
            insights: [
                'Generic agents lack awareness of stack-specific conventions',
                'Existing skill/rule systems are fragmented and non-portable',
                'Rules buried in config files don\'t travel with the project',
                'No community layer exists to build and share expertise'
            ]
        },
        {
            phase: '03',
            title: 'Solution Design',
            description: 'Designed SkillDeck as a Ruby gem that surfaces a GUI for browsing, previewing, and activating curated agent skills — modelled on the familiar `gem install` workflow.',
            insights: [
                'Skill = versioned bundle of prompts, rules, and contextual knowledge',
                'GUI abstracts complexity without hiding power-user controls',
                'Skills lock into Gemfile — every team member gets the same AI behaviour',
                'Multiple skills can be layered and composed for complex projects'
            ]
        },
        {
            phase: '04',
            title: 'Community Architecture',
            description: 'Designed a public registry so developers can contribute, fork, and co-develop skills — turning individual guardrails into a shared knowledge commons.',
            insights: [
                'Registry follows the same publish flow as any Ruby gem',
                'Skills can be forked, improved, and republished as open-source packages',
                'MCP (Model Context Protocol) integrations planned as first-class skill types',
                'Domain packs: security, accessibility, performance, and more'
            ]
        }
    ];

    const features = [
        {
            icon: Terminal,
            title: 'One-Command Install',
            description: 'gem install skilldeck — zero friction to get started. No config files to hunt down, no IDE settings to memorise.',
            status: 'Available'
        },
        {
            icon: Layers,
            title: 'Skill Composition',
            description: 'Layer multiple skills for complex projects. Rails API + GDPR Compliance + Accessible Components — all active simultaneously.',
            status: 'Available'
        },
        {
            icon: BookOpen,
            title: 'Versioned & Lockable',
            description: 'Skills are locked in your Gemfile like any dependency. Every team member and CI run gets identical AI behaviour.',
            status: 'Available'
        },
        {
            icon: Zap,
            title: 'GUI Skill Browser',
            description: 'Browse, preview examples, check compatibility, and activate skills in seconds — no YAML editing required.',
            status: 'Available'
        },
        {
            icon: Users,
            title: 'Team Skill Authoring',
            description: 'Senior engineers encode their expertise as skills and share them across the team. Juniors inherit hard-won conventions automatically.',
            status: 'In Development'
        },
        {
            icon: Globe,
            title: 'Community Registry',
            description: 'A public registry where developers publish, fork, and co-develop skills — a living knowledge commons for AI-assisted development.',
            status: 'Planned'
        }
    ];

    const techStack = {
        core: ['Ruby Gem', 'MCP (Model Context Protocol)', 'YAML Skill Schema', 'Semantic Versioning'],
        integrations: ['Antigravity IDE', 'RubyMine', 'Cursor', 'VS Code', 'Rails', 'npm (planned)', 'PyPI (planned)']
    };

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
                            Developer Tools
                        </span>
                        <span className="text-xs px-2 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            In Development
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-normal mb-6">
                        <span className="text-stone-900 dark:text-stone-100">Skill</span>
                        <span className="italic text-blue-500 dark:text-blue-400">Deck</span>
                    </h1>

                    <p className="text-xl text-stone-600 dark:text-stone-400 leading-relaxed max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        An AI development accelerator that lets you load production-ready agent skills via
                        Ruby gems. Select the guardrails your project needs through a GUI — so your pipeline
                        stays clean, your agents stay focused, and your team ships faster.
                    </p>

                    <div className="flex flex-wrap gap-2 mt-8">
                        {['Ruby Gem', 'AI Agent Skills', 'Developer Tools', 'MCP', 'Community Registry'].map((tag) => (
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
                        The Problem
                    </span>
                    <p className="text-2xl md:text-3xl font-light leading-relaxed">
                        IDEs like Antigravity, RubyMine, and Cursor all support skills and rules to guide AI
                        behaviour — but the experience is ambiguous. Developers skip them, the AI hallucinates,
                        and the CI pipeline pays the price.
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
                                            feature.status === 'Available'
                                                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                                : feature.status === 'In Development'
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

            {/* Key Differentiator */}
            <section className="py-20 px-6 bg-blue-500 dark:bg-blue-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="text-xs tracking-[0.3em] uppercase text-blue-200 block mb-6" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Key Insight
                    </span>
                    <h3 className="text-2xl md:text-3xl font-light leading-relaxed mb-6">
                        The gap between what AI agents can do and what they should do in your codebase is a skill problem, not a model problem.
                    </h3>
                    <p className="text-blue-100 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Better models help, but precise, versioned, community-maintained guardrails are what keep production
                        pipelines clean. SkillDeck makes skills first-class dependencies — versioned, lockable, and
                        portable across every developer on your team.
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
                            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Core</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.core.map((tech) => (
                                    <span key={tech} className="px-3 py-1.5 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-full text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="border border-stone-200 dark:border-stone-800 rounded-lg p-6">
                            <h3 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-4">Integrations</h3>
                            <div className="flex flex-wrap gap-2">
                                {techStack.integrations.map((tech) => (
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
                        Read the full write-up on the thinking behind SkillDeck and where it is headed.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            to="/blog/skilldeck-scaffold-smarter-ship-better"
                            className="inline-flex items-center gap-2 bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ArrowRight className="w-4 h-4" />
                            Read the Blog Post
                        </Link>
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

export default SkillDeckCase;

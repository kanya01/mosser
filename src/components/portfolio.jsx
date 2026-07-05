import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { motion, useReducedMotion } from 'framer-motion';
import { Github, Mail, ArrowRight, ArrowUpRight, ExternalLink } from 'lucide-react';
import DarkModeToggle from './DarkModeToggle';

const easing = [0.22, 1, 0.36, 1];
const viewport = { once: true, amount: 0.2 };

const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: easing }
    }
};

const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.08 }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: easing }
    }
};

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const experiences = [
        {
            company: 'Raviro',
            role: 'Product Associate',
            period: 'June 2024 - Present',
            location: 'London, UK',
            achievements: [
                'Analyzed user behavior data across 12 developing regions, implementing automated validation features that increased completion rates by 13%',
                'Created comprehensive impact dashboards in Tableau for data-driven strategic decisions',
                'Collaborated with product teams and public health researchers on analytical requirements',
                'Conducted deep-dive analysis on user journey data to identify platform improvement opportunities'
            ]
        },
        {
            company: 'Trainline',
            role: 'Apprentice Software Engineer',
            period: 'September 2022 - June 2024',
            location: 'London, UK',
            achievements: [
                'Led analytical initiatives improving customer experience for 300k+ daily users',
                'Developed GDPR-compliant data processing solutions with large datasets',
                'Created real-time monitoring dashboards using New Relic and NRQL',
                'Conducted A/B testing and experimentation to validate feature improvements',
                'Served as Scrum Master facilitating data-driven sprint planning'
            ]
        },
        {
            company: 'Bentley',
            role: 'Digital Technology Solutions Apprentice',
            period: 'June 2020 - September 2020',
            location: 'London, UK',
            achievements: [
                'Supported analytical projects for digital solution implementations',
                'Participated in requirements gathering and analysis for product development'
            ]
        }
    ];

    const projects = [
        {
            id: 'filmslate',
            name: 'FilmSlate',
            description: 'Enhanced onboarding experience for an indie film streaming platform, focusing on personalization to improve trial-to-paid conversion rates.',
            category: 'Product Strategy',
            status: 'MVP Complete',
            link: '/case-study/filmslate'
        },
        {
            id: 'live-o',
            name: 'live.o',
            description: 'Building the next Fiverr for the creative space. A full-stack marketplace connecting creative professionals with clients through portfolio showcasing, pattern matching, and tiered payment systems.',
            category: 'Full-Stack Development',
            status: 'In Development',
            link: '/case-study/live-o',
            liveUrl: 'https://liveo.space'
        },
        {
            id: 'publication-summarizer',
            name: 'Publication Summarizer',
            description: 'AI-powered tool to extract key insights from economic publications, helping professionals stay informed efficiently.',
            category: 'AI/ML Concept',
            status: 'Concept Phase',
            link: '/case-study/publication-summarizer'
        },
        {
            id: 'skilldeck',
            name: 'SkillDeck',
            description: 'An AI development accelerator that scaffolds production-ready agent skills via Ruby gems. Developers select skills through a GUI to reduce hallucinations, enforce conventions, and ship cleaner code—faster. Built toward a community registry where developers share, fork, and co-develop skills.',
            category: 'Developer Tools',
            status: 'In Development',
            link: '/case-study/skilldeck'
        }
    ];

    const skills = [
        { category: 'Analytics', items: ['Tableau', 'New Relic', 'NRQL', 'A/B Testing', 'User Journey Analysis'] },
        { category: 'Development', items: ['Ruby', 'React', 'Node.js', 'MongoDB', 'Postgres', 'Rails', 'Express.js', 'Socket.IO'] },
        { category: 'Product', items: ['Product Strategy', 'User Research', 'Market Research', 'Agile/Scrum'] },
        { category: 'Data', items: ['ETL Processes', 'Large Datasets', 'GDPR Compliance', 'Statistical Analysis'] }
    ];

    const education = [
        {
            institution: "King's College London",
            degree: 'Product Management, Postgraduate Certificate',
            period: '2024 - 2025'
        },
        {
            institution: 'Multiverse',
            degree: 'Software Engineering, Apprenticeship (Merit)',
            period: '2022 - 2024'
        }
    ];

    const heroSignals = ['Insight-led', 'Research-backed', 'Creator-first'];
    const motionEnabled = !shouldReduceMotion;

    return (
        <div className="min-h-screen overflow-x-hidden bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 transition-colors duration-300" style={{ fontFamily: 'Georgia, serif' }}>
            <nav className="fixed top-0 w-full z-50 bg-stone-50/80 dark:bg-stone-950/80 backdrop-blur-xl border-b border-stone-200/80 dark:border-stone-800/80">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link to="/" className="text-xl tracking-tight font-medium text-stone-900 dark:text-stone-100">
                        Moses Mwangi
                    </Link>
                    <div className="flex items-center gap-8">
                        <a
                            href="#home"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Home
                        </a>
                        <Link
                            to="/blog"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Blog
                        </Link>
                        <a
                            href="#experience"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Experience
                        </a>
                        <a
                            href="#projects"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="text-sm tracking-wide text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Contact
                        </a>
                        <DarkModeToggle />
                    </div>
                </div>
            </nav>

            <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute -top-24 left-[8%] h-72 w-72 rounded-full bg-blue-200/40 dark:bg-blue-500/15 blur-3xl"
                        animate={motionEnabled ? { x: [0, 24, 0], y: [0, 18, 0], scale: [1, 1.08, 1] } : undefined}
                        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <motion.div
                        className="absolute top-1/3 right-[10%] h-80 w-80 rounded-full bg-violet-200/30 dark:bg-violet-500/10 blur-3xl"
                        animate={motionEnabled ? { x: [0, -32, 0], y: [0, -16, 0], scale: [1, 0.94, 1] } : undefined}
                        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.08),transparent_32%)] dark:bg-[radial-gradient(circle_at_top,rgba(96,165,250,0.15),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(129,140,248,0.12),transparent_32%)]" />
                </div>

                <motion.div
                    className="max-w-6xl mx-auto px-6 pt-24 relative z-10"
                    initial={motionEnabled ? 'hidden' : false}
                    animate={motionEnabled ? (isLoaded ? 'visible' : 'hidden') : undefined}
                    variants={staggerVariants}
                >
                    <motion.div variants={itemVariants} className="mb-4">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Product Associate • London • Building the next Fiverr for the creative space
                        </span>
                    </motion.div>

                    <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl leading-tight mb-8 max-w-4xl">
                        <span className="block font-normal text-stone-900 dark:text-stone-100">Turning data into</span>
                        <span className="block italic text-blue-500 dark:text-blue-400">product decisions</span>
                    </motion.h1>

                    <motion.p
                        variants={itemVariants}
                        className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mb-10 leading-relaxed"
                        style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                        I help product teams make better decisions through data analysis,
                        user research, and cross-functional collaboration.
                        Currently shaping product strategy at Raviro and building the future of the music industry at live.o.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-3 mb-12">
                        {heroSignals.map((signal, index) => (
                            <motion.span
                                key={signal}
                                className="rounded-full border border-stone-200/80 dark:border-stone-700/80 bg-white/70 dark:bg-stone-900/60 px-4 py-2 text-xs uppercase tracking-[0.24em] text-stone-600 dark:text-stone-300 shadow-sm backdrop-blur"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                                animate={motionEnabled ? { y: [0, index % 2 === 0 ? -6 : 6, 0] } : undefined}
                                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                            >
                                {signal}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                        <motion.a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-6 py-3 text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                            whileHover={motionEnabled ? { y: -3, scale: 1.02 } : undefined}
                            whileTap={motionEnabled ? { scale: 0.98 } : undefined}
                        >
                            <Mail className="w-4 h-4" />
                            Get in touch
                        </motion.a>
                        <motion.a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-6 py-3 text-sm tracking-wide transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-900"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                            whileHover={motionEnabled ? { y: -3 } : undefined}
                        >
                            <Github className="w-4 h-4" />
                            View GitHub
                        </motion.a>
                        <motion.div whileHover={motionEnabled ? { y: -3 } : undefined}>
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-6 py-3 text-sm tracking-wide transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-900"
                                style={{ fontFamily: 'system-ui, sans-serif' }}
                            >
                                <ArrowRight className="w-4 h-4" />
                                Read Blog
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="absolute bottom-12 left-1/2 -translate-x-1/2 pointer-events-none"
                    animate={motionEnabled ? { y: [0, 10, 0] } : undefined}
                    transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="w-px h-16 bg-gradient-to-b from-blue-500/70 to-transparent dark:from-blue-400/80 mx-auto" />
                </motion.div>
            </section>

            <motion.section
                id="experience"
                className="py-24 px-6"
                initial={motionEnabled ? 'hidden' : false}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={viewport}
                variants={sectionVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Background</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Professional </span>
                            <span className="italic text-blue-500 dark:text-blue-400">experience</span>
                        </h2>
                    </div>

                    <motion.div
                        className="relative space-y-10 md:space-y-14"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={staggerVariants}
                    >
                        <div className="absolute left-3 top-2 bottom-2 hidden md:block w-px bg-gradient-to-b from-blue-400/70 via-stone-300 to-transparent dark:from-blue-400/70 dark:via-stone-700" />
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.company}
                                className="relative md:pl-14"
                                variants={itemVariants}
                            >
                                <div className="absolute left-0 top-9 hidden md:flex h-6 w-6 items-center justify-center rounded-full border border-blue-200 bg-white shadow-sm dark:border-blue-500/40 dark:bg-stone-900">
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500 dark:bg-blue-400" />
                                </div>
                                <motion.div
                                    className="rounded-[28px] border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/70 p-8 shadow-sm backdrop-blur"
                                    whileHover={motionEnabled ? { y: -6, borderColor: 'rgba(59,130,246,0.35)' } : undefined}
                                    transition={{ duration: 0.25 }}
                                >
                                    <div className="grid md:grid-cols-3 gap-8">
                                        <div>
                                            <div className="mb-3 inline-flex rounded-full bg-blue-50 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-blue-600 dark:bg-blue-500/10 dark:text-blue-300" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                {index === 0 ? 'Current Focus' : 'Career Chapter'}
                                            </div>
                                            <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-1">{exp.company}</h3>
                                            <p className="text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.role}</p>
                                            <p className="text-sm text-stone-400 dark:text-stone-500 mt-2" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.period}</p>
                                            <p className="text-sm text-stone-400 dark:text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.location}</p>
                                        </div>
                                        <div className="md:col-span-2">
                                            <ul className="space-y-3">
                                                {exp.achievements.map((achievement) => (
                                                    <li key={achievement} className="flex gap-3 text-stone-600 dark:text-stone-400 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                        <span className="mt-1.5 h-2 w-2 rounded-full bg-blue-500 dark:bg-blue-400 shrink-0" />
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="mt-24"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={staggerVariants}
                    >
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>Education</span>
                        <div className="grid md:grid-cols-2 gap-8">
                            {education.map((edu) => (
                                <motion.div
                                    key={edu.institution}
                                    variants={itemVariants}
                                    className="rounded-[24px] border border-stone-200/80 dark:border-stone-800/80 bg-stone-50/80 dark:bg-stone-900/60 p-6"
                                    whileHover={motionEnabled ? { y: -4 } : undefined}
                                >
                                    <h4 className="text-lg font-medium text-stone-900 dark:text-stone-100 mb-1">{edu.institution}</h4>
                                    <p className="text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{edu.degree}</p>
                                    <p className="text-sm text-stone-400 dark:text-stone-500 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{edu.period}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                id="projects"
                className="py-24 px-6 bg-white/70 dark:bg-stone-900/70"
                initial={motionEnabled ? 'hidden' : false}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={viewport}
                variants={sectionVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Work</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Selected </span>
                            <span className="italic text-blue-500 dark:text-blue-400">projects</span>
                        </h2>
                    </div>

                    <motion.div
                        className="space-y-6"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={staggerVariants}
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                variants={itemVariants}
                                whileHover={motionEnabled ? { y: -8 } : undefined}
                            >
                                <Link
                                    to={project.link}
                                    className="group relative block overflow-hidden rounded-[32px] border border-stone-200/80 dark:border-stone-800/80 bg-white/85 dark:bg-stone-950/80 p-8 shadow-sm backdrop-blur transition-all duration-300 hover:border-blue-200 dark:hover:border-blue-500/30"
                                >
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.12),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.16),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(129,140,248,0.14),transparent_28%)]" />
                                    <div className="relative flex justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-3">
                                                <span className="text-xs tracking-[0.2em] uppercase text-blue-500 dark:text-blue-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    {project.category}
                                                </span>
                                                <span
                                                    className={`text-xs px-2 py-1 rounded-full ${
                                                        project.status === 'MVP Complete'
                                                            ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                                            : project.status === 'In Development'
                                                                ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
                                                                : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400'
                                                    }`}
                                                    style={{ fontFamily: 'system-ui, sans-serif' }}
                                                >
                                                    {project.status}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl font-medium text-stone-900 dark:text-stone-100 mb-2">{project.name}</h3>
                                            <p className="max-w-2xl text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{project.description}</p>
                                            {project.liveUrl && (
                                                <div className="mt-4">
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm transition-colors duration-200"
                                                        style={{ fontFamily: 'system-ui, sans-serif' }}
                                                    >
                                                        <ExternalLink className="w-3.5 h-3.5" />
                                                        View Live
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            <ArrowUpRight className="w-5 h-5 text-stone-400 dark:text-stone-500 group-hover:text-stone-900 dark:group-hover:text-stone-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                className="py-24 px-6"
                initial={motionEnabled ? 'hidden' : false}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={viewport}
                variants={sectionVariants}
            >
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Capabilities</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900 dark:text-stone-100">Skills & </span>
                            <span className="italic text-blue-500 dark:text-blue-400">expertise</span>
                        </h2>
                    </div>

                    <motion.div
                        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={staggerVariants}
                    >
                        {skills.map((skillGroup, index) => (
                            <motion.div
                                key={skillGroup.category}
                                variants={itemVariants}
                                className="rounded-[28px] border border-stone-200/80 dark:border-stone-800/80 bg-white/75 dark:bg-stone-900/70 p-6 shadow-sm backdrop-blur"
                                whileHover={motionEnabled ? { y: -6, rotate: index % 2 === 0 ? -1 : 1 } : undefined}
                            >
                                <div className="mb-5 flex items-center justify-between">
                                    <h4 className="text-sm font-medium text-stone-900 dark:text-stone-100" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                        {skillGroup.category}
                                    </h4>
                                    <span className="h-2.5 w-2.5 rounded-full bg-blue-500/80 dark:bg-blue-400/80" />
                                </div>
                                <ul className="space-y-2.5">
                                    {skillGroup.items.map((skill) => (
                                        <li key={skill} className="text-sm text-stone-600 dark:text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            <motion.section
                id="contact"
                className="py-24 px-6 bg-white/70 dark:bg-stone-900/70"
                initial={motionEnabled ? 'hidden' : false}
                whileInView={motionEnabled ? 'visible' : undefined}
                viewport={viewport}
                variants={sectionVariants}
            >
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 dark:text-stone-400 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Connect</span>
                        <h2 className="text-4xl md:text-5xl font-normal mb-6">
                            <span className="text-stone-900 dark:text-stone-100">Let's </span>
                            <span className="italic text-blue-500 dark:text-blue-400">work together</span>
                        </h2>
                        <p className="text-stone-600 dark:text-stone-400 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            I'm always interested in discussing new opportunities,
                            product challenges, or potential collaborations.
                        </p>
                    </div>

                    <motion.div
                        className="flex flex-wrap justify-center gap-4"
                        initial={motionEnabled ? 'hidden' : false}
                        whileInView={motionEnabled ? 'visible' : undefined}
                        viewport={viewport}
                        variants={staggerVariants}
                    >
                        <motion.a
                            variants={itemVariants}
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="inline-flex items-center gap-2 rounded-full bg-stone-900 dark:bg-stone-100 text-stone-50 dark:text-stone-900 px-8 py-4 text-sm tracking-wide transition-all duration-300 hover:bg-stone-800 dark:hover:bg-stone-200"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                            whileHover={motionEnabled ? { y: -4, scale: 1.02 } : undefined}
                        >
                            <Mail className="w-4 h-4" />
                            mosesmwangikanya@gmail.com
                        </motion.a>
                        <motion.a
                            variants={itemVariants}
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 px-8 py-4 text-sm tracking-wide transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-600 hover:bg-stone-100 dark:hover:bg-stone-800"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                            whileHover={motionEnabled ? { y: -4 } : undefined}
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </motion.a>
                    </motion.div>
                </div>
            </motion.section>

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

export default Portfolio;

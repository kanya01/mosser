import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, ArrowRight, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const experiences = [
        {
            company: "Raviro",
            role: "Junior Product Analyst",
            period: "June 2024 - Present",
            location: "London, UK",
            achievements: [
                "Analyzed user behavior data across 12 developing regions, implementing automated validation features that increased completion rates by 13%",
                "Created comprehensive impact dashboards in Tableau for data-driven strategic decisions",
                "Collaborated with product teams and public health researchers on analytical requirements",
                "Conducted deep-dive analysis on user journey data to identify platform improvement opportunities"
            ]
        },
        {
            company: "Trainline",
            role: "Apprentice Software Engineer",
            period: "September 2022 - June 2024",
            location: "London, UK",
            achievements: [
                "Led analytical initiatives improving customer experience for 300k+ daily users",
                "Developed GDPR-compliant data processing solutions with large datasets",
                "Created real-time monitoring dashboards using New Relic and NRQL",
                "Conducted A/B testing and experimentation to validate feature improvements",
                "Served as Scrum Master facilitating data-driven sprint planning"
            ]
        },
        {
            company: "Bentley",
            role: "Digital Technology Solutions Apprentice",
            period: "June 2020 - September 2020",
            location: "London, UK",
            achievements: [
                "Supported analytical projects for digital solution implementations",
                "Participated in requirements gathering and analysis for product development"
            ]
        }
    ];

    const projects = [
        {
            id: 'filmslate',
            name: "FilmSlate",
            description: "Enhanced onboarding experience for an indie film streaming platform, focusing on personalization to improve trial-to-paid conversion rates.",
            category: "Product Strategy",
            status: "MVP Complete",
            link: "/case-study/filmslate"
        },
        {
            id: 'freq-space',
            name: "freq.space",
            description: "Full-stack marketplace connecting creative professionals with clients through portfolio showcasing and real-time collaboration tools.",
            category: "Full-Stack Development",
            status: "In Development",
            link: "/case-study/freq-space"
        },
        {
            id: 'publication-summarizer',
            name: "Publication Summarizer",
            description: "AI-powered tool to extract key insights from economic publications, helping professionals stay informed efficiently.",
            category: "AI/ML Concept",
            status: "Concept Phase",
            link: "/case-study/publication-summarizer"
        }
    ];

    const skills = [
        { category: "Analytics", items: ["Tableau", "New Relic", "NRQL", "A/B Testing", "User Journey Analysis"] },
        { category: "Development", items: ["React", "Node.js", "MongoDB", "Express.js", "Socket.IO"] },
        { category: "Product", items: ["Product Strategy", "User Research", "Market Research", "Agile/Scrum"] },
        { category: "Data", items: ["ETL Processes", "Large Datasets", "GDPR Compliance", "Statistical Analysis"] }
    ];

    const education = [
        {
            institution: "King's College London",
            degree: "Product Management, Postgraduate Certificate",
            period: "2024 - 2025"
        },
        {
            institution: "Multiverse",
            degree: "Software Engineering, Apprenticeship (Merit)",
            period: "2022 - 2024"
        }
    ];

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900" style={{ fontFamily: 'Georgia, serif' }}>
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-stone-50/95 backdrop-blur-sm border-b border-stone-200">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link to="/" className="text-xl tracking-tight font-medium text-stone-900">
                        Moses Mwangi
                    </Link>
                    <div className="flex gap-8">
                        <a
                            href="#home"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Home
                        </a>
                        <Link
                            to="/blog"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Blog
                        </Link>
                        <a
                            href="#experience"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Experience
                        </a>
                        <a
                            href="#projects"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Projects
                        </a>
                        <a
                            href="#contact"
                            className="text-sm tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            Contact
                        </a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className={`min-h-screen flex items-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-6xl mx-auto px-6 pt-24">
                    <div className="mb-4">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            Product Analyst • London
                        </span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl leading-tight mb-8">
                        <span className="block font-normal text-stone-900">Turning data into</span>
                        <span className="block italic text-blue-500">product decisions</span>
                    </h1>
                    
                    <p className="text-lg text-stone-600 max-w-xl mb-12 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        I help product teams make better decisions through data analysis, 
                        user research, and cross-functional collaboration. 
                        Currently shaping product strategy at Raviro.
                    </p>
                    
                    <div className="flex gap-4">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <Mail className="w-4 h-4" />
                            Get in touch
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:border-stone-400 hover:bg-stone-100"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <Github className="w-4 h-4" />
                            View GitHub
                        </a>
                        <Link
                            to="/blog"
                            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300 hover:border-stone-400 hover:bg-stone-100"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <ArrowRight className="w-4 h-4" />
                            Read Blog
                        </Link>
                    </div>

                    {/* Scroll indicator */}
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
                        <div className="w-px h-16 bg-stone-300 mx-auto"></div>
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Background</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900">Professional </span>
                            <span className="italic text-blue-500">experience</span>
                        </h2>
                    </div>

                    <div className="space-y-16">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`border-t border-stone-200 pt-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 150}ms` }}
                            >
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div>
                                        <h3 className="text-xl font-medium text-stone-900 mb-1">{exp.company}</h3>
                                        <p className="text-stone-600" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.role}</p>
                                        <p className="text-sm text-stone-400 mt-2" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.period}</p>
                                        <p className="text-sm text-stone-400" style={{ fontFamily: 'system-ui, sans-serif' }}>{exp.location}</p>
                                    </div>
                                    <div className="md:col-span-2">
                                        <ul className="space-y-3">
                                            {exp.achievements.map((achievement, achIndex) => (
                                                <li key={achIndex} className="flex gap-3 text-stone-600 leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                    <span className="text-blue-500 mt-1.5">—</span>
                                                    {achievement}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Education */}
                    <div className="mt-24">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-8" style={{ fontFamily: 'system-ui, sans-serif' }}>Education</span>
                        <div className="grid md:grid-cols-2 gap-8">
                            {education.map((edu, index) => (
                                <div key={index} className="border-t border-stone-200 pt-6">
                                    <h4 className="text-lg font-medium text-stone-900 mb-1">{edu.institution}</h4>
                                    <p className="text-stone-600" style={{ fontFamily: 'system-ui, sans-serif' }}>{edu.degree}</p>
                                    <p className="text-sm text-stone-400 mt-1" style={{ fontFamily: 'system-ui, sans-serif' }}>{edu.period}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Work</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900">Selected </span>
                            <span className="italic text-blue-500">projects</span>
                        </h2>
                    </div>

                    <div className="space-y-6">
                        {projects.map((project, index) => (
                            <Link
                                key={project.id}
                                to={project.link}
                                className={`block group border border-stone-200 rounded-lg p-8 hover:border-stone-300 hover:bg-stone-50 transition-all duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-xs tracking-[0.2em] uppercase text-blue-500" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                {project.category}
                                            </span>
                                            <span className={`text-xs px-2 py-1 rounded-full ${
                                                project.status === 'MVP Complete' 
                                                    ? 'bg-blue-50 text-blue-600' 
                                                    : project.status === 'In Development'
                                                    ? 'bg-amber-50 text-amber-600'
                                                    : 'bg-stone-100 text-stone-600'
                                            }`} style={{ fontFamily: 'system-ui, sans-serif' }}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-medium text-stone-900 mb-2">{project.name}</h3>
                                        <p className="text-stone-600 max-w-2xl" style={{ fontFamily: 'system-ui, sans-serif' }}>{project.description}</p>
                                    </div>
                                    <div className="ml-6 mt-2">
                                        <ArrowUpRight className="w-5 h-5 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-16">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Capabilities</span>
                        <h2 className="text-4xl md:text-5xl font-normal">
                            <span className="text-stone-900">Skills & </span>
                            <span className="italic text-blue-500">expertise</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {skills.map((skillGroup, index) => (
                            <div key={index}>
                                <h4 className="text-sm font-medium text-stone-900 mb-4 pb-2 border-b border-stone-200" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                    {skillGroup.category}
                                </h4>
                                <ul className="space-y-2">
                                    {skillGroup.items.map((skill, sIndex) => (
                                        <li key={sIndex} className="text-stone-600 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-6 bg-white">
                <div className="max-w-6xl mx-auto text-center">
                    <div className="mb-12">
                        <span className="text-xs tracking-[0.3em] uppercase text-stone-500 block mb-4" style={{ fontFamily: 'system-ui, sans-serif' }}>Connect</span>
                        <h2 className="text-4xl md:text-5xl font-normal mb-6">
                            <span className="text-stone-900">Let's </span>
                            <span className="italic text-blue-500">work together</span>
                        </h2>
                        <p className="text-stone-600 max-w-lg mx-auto leading-relaxed" style={{ fontFamily: 'system-ui, sans-serif' }}>
                            I'm always interested in discussing new opportunities, 
                            product challenges, or potential collaborations.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 hover:bg-stone-800"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <Mail className="w-4 h-4" />
                            mosesmwangikanya@gmail.com
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 border border-stone-300 text-stone-700 px-8 py-4 rounded-full text-sm tracking-wide transition-all duration-300 hover:border-stone-400 hover:bg-stone-100"
                            style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 border-t border-stone-200">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-stone-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        © 2025 Moses Mwangi
                    </p>
                    <p className="text-stone-400 text-sm" style={{ fontFamily: 'system-ui, sans-serif' }}>
                        Product Analyst • London, England
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;

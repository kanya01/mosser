import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Github, Mail, Phone, ExternalLink, ChevronDown, ArrowRight, BarChart3, Users, Zap, Brain } from 'lucide-react';

const Portfolio = () => {
    const [activeSection, setActiveSection] = useState('home');
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
            ],
            color: "from-purple-600 to-blue-600"
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
            ],
            color: "from-green-600 to-teal-600"
        },
        {
            company: "Bentley",
            role: "Digital Technology Solutions Apprentice",
            period: "June 2020 - September 2020",
            location: "London, UK",
            achievements: [
                "Supported analytical projects for digital solution implementations",
                "Participated in requirements gathering and analysis for product development"
            ],
            color: "from-orange-600 to-red-600"
        }
    ];

    const projects = [
        {
            id: 'filmslate',
            name: "FilmSlate",
            description: "Enhanced Onboarding Experience for Indie Film Platform",
            fullDescription: "Designed and prototyped a personalized onboarding flow for an indie film streaming platform, focusing on user preference collection and immediate value delivery.",
            tech: ["Product Design", "User Research", "Prototyping", "A/B Testing"],
            features: ["Personalized Onboarding", "Preference Selection", "Film Curation", "User Journey Optimization"],
            status: "MVP Complete",
            color: "from-blue-600 to-indigo-600",
            link: "/case-study/filmslate",
            linkText: "View case study"
        },
        {
            id: 'freq-space',
            name: "freq.space",
            description: "The Marketplace for Creative Professionals",
            fullDescription: "A full-stack web application connecting talented creative professionals with clients. Features multi-format uploads, waveform visualization, social features, and marketplace functionality.",
            tech: ["React 18", "Node.js", "MongoDB", "Redux Toolkit", "Socket.IO", "Tailwind CSS"],
            features: ["Multi-format Upload", "Waveform Visualization", "Real-time Comments", "User Profiles", "Marketplace"],
            status: "In Development",
            color: "from-violet-600 to-purple-600",
            link: "/case-study/freq-space",
            linkText: "View project"
        },
        {
            id: 'publication-summarizer',
            name: "Publication Summarizer",
            description: "AI-Powered Economic Publication Analysis",
            fullDescription: "A tool to summarize economic and general publications using AI to extract succinct points and key insights for faster consumption.",
            tech: ["AI/ML", "Natural Language Processing", "Data Analysis"],
            features: ["Automated Summarization", "Key Point Extraction", "Publication Analysis"],
            status: "Concept Phase",
            color: "from-emerald-600 to-cyan-600",
            link: "/case-study/publication-summarizer",
            linkText: "Coming soon"
        }
    ];

    const education = [
        {
            institution: "King's College London",
            degree: "Product Management, Postgraduate Certificate",
            period: "2024 - 2025",
            focus: "Product Strategy, Market Research, Data-Driven Decision Making"
        },
        {
            institution: "Multiverse",
            degree: "Software Engineering, Apprenticeship (Merit)",
            period: "2022 - 2024",
            focus: "Full-stack Development, Data Analysis, ETL Processes, API Design"
        }
    ];

    const skills = [
        { category: "Analytics", items: ["Tableau", "New Relic", "NRQL", "A/B Testing", "User Journey Analysis"] },
        { category: "Development", items: ["React", "Node.js", "MongoDB", "Express.js", "Socket.IO"] },
        { category: "Product", items: ["Product Strategy", "User Research", "Market Research", "Agile/Scrum"] },
        { category: "Data", items: ["ETL Processes", "Large Datasets", "GDPR Compliance", "Statistical Analysis"] }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20"></div>
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Navigation */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-md bg-gray-900/50 rounded-b-2xl mx-4 mt-2 border border-gray-700/50">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        MM
                    </div>
                    <div className="flex gap-8">
                        {['About', 'Experience', 'Projects', 'Skills', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-gray-300 hover:text-white transition-colors duration-300 relative group"
                            >
                                {item}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-blue-400 group-hover:w-full transition-all duration-300"></span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="about" className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-20">
                <div className={`max-w-4xl text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <h1 className="text-6xl md:text-8xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                            Moses Mwangi
                        </span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-8">
                        Product Analyst | Data-Driven Problem Solver | Full-Stack Developer
                    </p>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12">
                        Transforming complex data into actionable insights. Experienced in driving product improvements
                        through analytics, user research, and cross-functional collaboration.
                    </p>
                    <div className="flex justify-center gap-4">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:-translate-y-1"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border border-gray-600 rounded-full font-semibold hover:border-purple-400 hover:text-purple-400 transition-all duration-300"
                        >
                            Get in Touch
                        </a>
                    </div>
                    <div className="mt-16 animate-bounce">
                        <ChevronDown className="w-8 h-8 mx-auto text-gray-500" />
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="relative z-10 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Experience
                    </h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                    <div>
                                        <h3 className={`text-2xl font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                                            {exp.company}
                                        </h3>
                                        <p className="text-xl text-gray-300">{exp.role}</p>
                                    </div>
                                    <div className="text-gray-400 mt-2 md:mt-0">
                                        <p>{exp.period}</p>
                                        <p>{exp.location}</p>
                                    </div>
                                </div>
                                <ul className="space-y-3">
                                    {exp.achievements.map((achievement, achIndex) => (
                                        <li key={achIndex} className="flex items-start gap-3 text-gray-300">
                                            <ArrowRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                            <span>{achievement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Selected Work Section */}
            <section id="projects" className="relative z-10 py-20 px-6 bg-gray-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Selected Work
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-2 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className={`h-2 bg-gradient-to-r ${project.color}`}></div>
                                
                                <div className="p-6">
                                    <span className="text-5xl font-bold text-gray-700/50 mb-4 block">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>

                                    <h3 className={`text-2xl font-bold mb-3 bg-gradient-to-r ${project.color} bg-clip-text text-transparent`}>
                                        {project.name}
                                    </h3>

                                    <p className="text-gray-400 mb-4 leading-relaxed">
                                        {project.fullDescription}
                                    </p>

                                    <div className="mb-6">
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                                            project.status === 'MVP Complete' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                                            project.status === 'In Development' ? 'bg-violet-500/20 text-violet-300 border border-violet-500/30' :
                                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                        }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <Link
                                        to={project.link}
                                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white group/link transition-colors"
                                    >
                                        <span className="font-medium">{project.linkText}</span>
                                        <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="relative z-10 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Skills & Expertise
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skillGroup, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <h3 className="text-xl font-bold text-white mb-4 text-center">{skillGroup.category}</h3>
                                <div className="space-y-2">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <div
                                            key={skillIndex}
                                            className="bg-gray-700/30 px-3 py-2 rounded-lg text-gray-300 text-center transition-all duration-300 hover:bg-gray-600/30 hover:text-white"
                                        >
                                            {skill}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Education Section */}
            <section className="relative z-10 py-20 px-6 bg-gray-900/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-purple-400 bg-clip-text text-transparent">
                        Education
                    </h2>

                    <div className="space-y-6">
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                                        <p className="text-lg text-purple-400">{edu.degree}</p>
                                        <p className="text-gray-400 mt-2">{edu.focus}</p>
                                    </div>
                                    <div className="text-gray-400 mt-2 md:mt-0">
                                        {edu.period}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Let's Connect
                    </h2>
                    <p className="text-xl text-gray-400 mb-12">
                        Interested in working together or just want to say hello? I'd love to hear from you.
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="flex items-center gap-3 px-6 py-3 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            <Mail className="w-5 h-5 text-purple-400" />
                            <span>mosesmwangikanya@gmail.com</span>
                        </a>
                        <a
                            href="tel:+447361507912"
                            className="flex items-center gap-3 px-6 py-3 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            <Phone className="w-5 h-5 text-purple-400" />
                            <span>+44 7361 507912</span>
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-6 py-3 bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-xl hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                        >
                            <Github className="w-5 h-5 text-purple-400" />
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-8 px-6 border-t border-gray-800">
                <div className="max-w-6xl mx-auto text-center text-gray-500">
                    <p>© 2024 Moses Mwangi. Built with React & Tailwind CSS.</p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;

import React, { useState, useEffect } from 'react';
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
            name: "freq.space",
            description: "The Marketplace for Creative Professionals",
            fullDescription: "A full-stack web application connecting talented creative professionals with clients. Features multi-format uploads, waveform visualization, social features, and marketplace functionality.",
            tech: ["React 18", "Node.js", "MongoDB", "Redux Toolkit", "Socket.IO", "Tailwind CSS"],
            features: ["Multi-format Upload", "Waveform Visualization", "Real-time Comments", "User Profiles", "Marketplace"],
            status: "In Development",
            color: "from-violet-600 to-purple-600"
        },
        {
            name: "FilmSlate",
            description: "Enhanced Onboarding Experience for Indie Film Platform",
            fullDescription: "Designed and prototyped a personalized onboarding flow for an indie film streaming platform, focusing on user preference collection and immediate value delivery.",
            tech: ["Product Design", "User Research", "Prototyping", "A/B Testing"],
            features: ["Personalized Onboarding", "Preference Selection", "Film Curation", "User Journey Optimization"],
            status: "MVP Complete",
            color: "from-blue-600 to-indigo-600"
        },
        {
            name: "AI Publication Summarizer",
            description: "AI-Powered Economic Publication Analysis",
            fullDescription: "A tool to summarize economic and general publications using AI to extract succinct points and key insights for faster consumption.",
            tech: ["AI/ML", "Natural Language Processing", "Data Analysis"],
            features: ["Automated Summarization", "Key Point Extraction", "Publication Analysis"],
            status: "Concept Phase",
            color: "from-emerald-600 to-cyan-600"
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
                <div className="bg-black/80 backdrop-blur-md border-b border-gray-700/50">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                            Moses Mwangi
                        </div>
                        <div className="flex gap-6">
                            {['Home', 'Experience', 'Projects', 'Contact'].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setActiveSection(item.toLowerCase())}
                                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                                        activeSection === item.toLowerCase()
                                            ? 'bg-purple-600 text-white'
                                            : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                                    }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className={`relative z-10 min-h-screen flex items-center justify-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="text-center max-w-4xl px-6">
                    <div className="mb-6">
                        <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent animate-pulse">
                            Product Analyst
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8">
                            Data-driven product improvements • Cross-functional collaboration • Strategic impact
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <div className="bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <BarChart3 className="w-5 h-5 text-purple-400" />
                                <span>Analytics Expert</span>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <Users className="w-5 h-5 text-blue-400" />
                                <span>Team Collaborator</span>
                            </div>
                        </div>
                        <div className="bg-gray-800/50 backdrop-blur-md px-6 py-3 rounded-full border border-gray-700/50">
                            <div className="flex items-center gap-2">
                                <Zap className="w-5 h-5 text-emerald-400" />
                                <span>Impact Driver</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center gap-6">
                        <a
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-2"
                        >
                            <Mail className="w-5 h-5" />
                            Get In Touch
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-600 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:bg-gray-800 hover:border-gray-500 flex items-center gap-2"
                        >
                            <Github className="w-5 h-5" />
                            View Code
                        </a>
                    </div>

                    <div className="mt-16 animate-bounce">
                        <ChevronDown className="w-8 h-8 mx-auto text-gray-400" />
                    </div>
                </div>
            </section>

            {/* Experience Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Professional Experience
                    </h2>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <div
                                key={index}
                                className={`group bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                style={{ transitionDelay: `${index * 200}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{exp.role}</h3>
                                        <div className={`text-xl font-semibold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent mb-1`}>
                                            {exp.company}
                                        </div>
                                        <p className="text-gray-400">{exp.location}</p>
                                    </div>
                                    <div className="bg-gray-700/50 px-4 py-2 rounded-lg mt-4 md:mt-0">
                                        <span className="text-gray-300">{exp.period}</span>
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    {exp.achievements.map((achievement, achIndex) => (
                                        <div
                                            key={achIndex}
                                            className="flex items-start gap-3 group-hover:translate-x-2 transition-transform duration-300"
                                            style={{ transitionDelay: `${achIndex * 100}ms` }}
                                        >
                                            <ArrowRight className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                                            <p className="text-gray-300 leading-relaxed">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="relative z-10 py-20 px-6 bg-gray-900/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">
                        Side Projects
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className={`group bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                                style={{ transitionDelay: `${index * 300}ms` }}
                            >
                                <div className={`w-full h-32 bg-gradient-to-r ${project.color} rounded-lg mb-6 flex items-center justify-center group-hover:shadow-lg transition-all duration-300`}>
                                    <Brain className="w-12 h-12 text-white" />
                                </div>

                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold text-white">{project.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                            project.status === 'In Development' ? 'bg-yellow-600/20 text-yellow-400' :
                                                project.status === 'MVP Complete' ? 'bg-green-600/20 text-green-400' :
                                                    'bg-blue-600/20 text-blue-400'
                                        }`}>
                      {project.status}
                    </span>
                                    </div>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{project.fullDescription}</p>
                                </div>

                                <div className="mb-4">
                                    <p className="text-sm text-gray-400 mb-2">Key Features:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.features.map((feature, fIndex) => (
                                            <span key={fIndex} className="bg-gray-700/50 px-3 py-1 rounded-full text-xs text-gray-300">
                        {feature}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Tech Stack:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, tIndex) => (
                                            <span key={tIndex} className="bg-gradient-to-r from-gray-700 to-gray-600 px-3 py-1 rounded-full text-xs text-white">
                        {tech}
                      </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                                        <ExternalLink className="w-4 h-4" />
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                        Skills & Expertise
                    </h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {skills.map((skillGroup, index) => (
                            <div
                                key={index}
                                className={`bg-gray-800/30 backdrop-blur-md border border-gray-700/50 rounded-2xl p-6 transition-all duration-500 hover:shadow-xl hover:shadow-purple-500/10 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
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
                                className={`bg-gray-800/40 backdrop-blur-md border border-gray-700/50 rounded-2xl p-8 transition-all duration-500 hover:shadow-xl ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}
                                style={{ transitionDelay: `${index * 300}ms` }}
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{edu.degree}</h3>
                                        <p className="text-xl text-purple-400 mb-2">{edu.institution}</p>
                                        <p className="text-gray-400">{edu.focus}</p>
                                    </div>
                                    <div className="bg-gray-700/50 px-4 py-2 rounded-lg mt-4 md:mt-0">
                                        <span className="text-gray-300">{edu.period}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section className="relative z-10 py-20 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Let's Connect
                    </h2>
                    <p className="text-xl text-gray-300 mb-12">
                        Ready to drive data-driven product improvements together?
                    </p>

                    <div className="flex flex-wrap justify-center gap-6">
                        <a
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 flex items-center gap-3"
                        >
                            <Mail className="w-6 h-6" />
                            mosesmwangikanya@gmail.com
                        </a>
                        <a
                            href="tel:+447361507912"
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 flex items-center gap-3"
                        >
                            <Phone className="w-6 h-6" />
                            +44 7361 507 912
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-gray-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-800 hover:border-gray-500 hover:scale-105 flex items-center gap-3"
                        >
                            <Github className="w-6 h-6" />
                            GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="relative z-10 py-8 px-6 border-t border-gray-700/50">
                <div className="max-w-6xl mx-auto text-center">
                    <p className="text-gray-400">
                        © 2025 Moses Mwangi • Product Analyst • London, England
                    </p>
                    <p className="text-gray-500 text-sm mt-2">
                        Optimized for Fly.io deployment • Built with React & Tailwind CSS
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Portfolio;
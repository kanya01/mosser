import React, { useState, useEffect } from 'react';
import { Github, Mail, Phone, ArrowRight, ArrowUpRight } from 'lucide-react';

const Portfolio = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [navScrolled, setNavScrolled] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
        
        const handleScroll = () => {
            setNavScrolled(window.scrollY > 50);
            
            // Update active section based on scroll
            const sections = ['home', 'experience', 'projects', 'skills', 'contact'];
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const experiences = [
        {
            company: "Raviro",
            role: "Junior Product Analyst",
            period: "Jun 2024 — Present",
            location: "London, UK",
            description: "Analyzing user behavior data across 12 developing regions to identify drop-off patterns. Implemented automated validation features that increased completion rates by 13%. Creating impact dashboards in Tableau and collaborating with product teams to define analytical requirements and measure feature effectiveness.",
            tags: ["Tableau", "User Analytics", "A/B Testing", "Agile"]
        },
        {
            company: "Trainline",
            role: "Apprentice Software Engineer",
            period: "Sep 2022 — Jun 2024",
            location: "London, UK",
            description: "Led analytical initiatives to identify user pain points in the booking flow, implementing solutions that improved customer experience for 300k+ daily users. Developed GDPR-compliant data processing solutions and utilized New Relic for real-time monitoring dashboards. Served as Scrum Master, facilitating data-driven sprint planning.",
            tags: ["New Relic", "NRQL", "A/B Testing", "Scrum"]
        },
        {
            company: "Bentley",
            role: "Digital Technology Solutions Apprentice",
            period: "Jun 2020 — Sep 2020",
            location: "London, UK",
            description: "Supported analytical projects for digital solution implementations. Worked with cross-functional teams to ensure data accuracy and participated in requirements gathering and analysis to support product development initiatives.",
            tags: ["Requirements Analysis", "Cross-functional"]
        }
    ];

    const projects = [
        {
            number: "01",
            name: "FilmSlate",
            description: "Go-to-market strategy and MVP design for a film industry platform. Conducted user research, defined product requirements, and created iterative development approach with measurable outcomes.",
            link: "#",
            linkText: "View case study"
        },
        {
            number: "02",
            name: "freq.space",
            description: "Full-stack marketplace connecting creative professionals with clients. Built with React, Node.js, Ruby on Rails and MongoDB. Features include audio waveform visualization, real-time comments, and portfolio management.",
            link: "https://github.com/kanya01/COLABS",
            linkText: "View on GitHub"
        },
        {
            number: "03",
            name: "Publication Summarizer",
            description: "AI-powered tool to summarize economic and general publications into succinct, actionable insights. Designed to help professionals stay informed efficiently.",
            link: "https://github.com/kanya01/ePub",
            linkText: "View on Github"
        }
    ];

    const skills = {
        analytics: ["Tableau", "SQL & NRQL", "New Relic", "A/B Testing", "User Research"],
        product: ["Product Strategy", "Requirements Analysis", "Agile / Scrum", "Stakeholder Management", "Market Research"],
        technical: ["Ruby/Ruby on Rails","React & Node.js", "Python", "MongoDB", "REST APIs", "ETL Processes"],
        education: ["King's College London — Product Management (2024-25)", "Multiverse — Software Engineering (2022-24)"]
    };

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#fafafa] text-[#0a0a0a] font-sans">
            {/* Navigation */}
            <nav className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-8 py-5 flex justify-between items-center transition-all duration-300 ${
                navScrolled ? 'bg-[#fafafa]/90 backdrop-blur-xl border-b border-[#e5e5e5]' : 'bg-transparent'
            }`}>
                <div className="font-serif text-xl tracking-tight">Moses Mwangi</div>
                <div className="hidden md:flex gap-10">
                    {['Home', 'Experience', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            className={`text-sm transition-colors duration-200 relative group ${
                                activeSection === item.toLowerCase() ? 'text-[#0a0a0a]' : 'text-[#666666] hover:text-[#0a0a0a]'
                            }`}
                        >
                            {item}
                            <span className={`absolute -bottom-1 left-0 h-px bg-[#0a0a0a] transition-all duration-300 ${
                                activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                            }`} />
                        </button>
                    ))}
                </div>
            </nav>

            {/* Hero Section */}
            <section id="home" className="min-h-screen flex flex-col justify-center px-6 md:px-8 max-w-5xl mx-auto pt-20">
                <p className={`text-xs tracking-[0.2em] uppercase text-[#666666] mb-6 transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: '200ms' }}>
                    Product Analyst • London
                </p>
                
                <h1 className={`font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.05] tracking-tight mb-8 transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`} style={{ transitionDelay: '400ms' }}>
                    Turning data into<br />
                    <span className="italic text-[#0066ff]">product decisions</span>
                </h1>
                
                <p className={`text-lg text-[#666666] max-w-xl leading-relaxed mb-10 transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: '600ms' }}>
                    I help product teams make better decisions through data analysis, 
                    user research, and cross-functional collaboration. Currently shaping 
                    product strategy at Raviro.
                </p>
                
                <div className={`flex flex-wrap gap-4 transition-all duration-700 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`} style={{ transitionDelay: '800ms' }}>
                    <a
                        href="mailto:mosesmwangikanya@gmail.com"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#0a0a0a] text-[#fafafa] text-sm font-medium rounded-full transition-all duration-300 hover:bg-[#1a1a1a] hover:-translate-y-0.5"
                    >
                        <Mail className="w-4 h-4" />
                        Get in touch
                    </a>
                    <a
                        href="https://github.com/kanya01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-7 py-3.5 bg-transparent text-[#0a0a0a] text-sm font-medium rounded-full border border-[#e5e5e5] transition-all duration-300 hover:border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-[#fafafa]"
                    >
                        <Github className="w-4 h-4" />
                        View GitHub
                    </a>
                </div>

                {/* Scroll indicator */}
                <div className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#666666] transition-all duration-700 ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                }`} style={{ transitionDelay: '1200ms' }}>
                    <span className="w-px h-10 bg-gradient-to-b from-[#0a0a0a] to-transparent animate-pulse" />
                </div>
            </section>

            {/* Experience Section */}
            <section id="experience" className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
                <div className="mb-16">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#666666] mb-4">Experience</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">Where I've worked</h2>
                </div>

                <div className="flex flex-col gap-12">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="group grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 pb-12 border-b border-[#e5e5e5] last:border-b-0 last:pb-0 transition-transform duration-300 hover:translate-x-2"
                        >
                            <div className="text-sm text-[#666666]">
                                <p className="mb-1">{exp.period}</p>
                                <p className="text-xs">{exp.location}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-medium mb-1">{exp.role}</h3>
                                <p className="text-[#0066ff] mb-4">{exp.company}</p>
                                <p className="text-[#666666] text-[15px] leading-relaxed mb-5">{exp.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {exp.tags.map((tag, tagIndex) => (
                                        <span
                                            key={tagIndex}
                                            className="text-xs px-3 py-1.5 bg-white border border-[#e5e5e5] rounded-full text-[#666666]"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 bg-white">
                <div className="px-6 md:px-8 max-w-5xl mx-auto">
                    <div className="mb-16">
                        <p className="text-xs tracking-[0.2em] uppercase text-[#666666] mb-4">Projects</p>
                        <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">Selected work</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                className="group bg-[#fafafa] border border-[#e5e5e5] rounded-2xl p-8 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#0a0a0a] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
                                <div className="font-serif text-5xl text-[#e5e5e5] leading-none mb-4">{project.number}</div>
                                <h3 className="text-xl font-medium mb-3">{project.name}</h3>
                                <p className="text-[#666666] text-[15px] leading-relaxed mb-6">{project.description}</p>
                                <a
                                    href={project.link}
                                    target={project.link.startsWith('http') ? '_blank' : undefined}
                                    rel={project.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="inline-flex items-center gap-2 text-sm font-medium text-[#0a0a0a] transition-all duration-300 group-hover:gap-3"
                                >
                                    {project.linkText}
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 px-6 md:px-8 max-w-5xl mx-auto">
                <div className="mb-16">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#666666] mb-4">Skills</p>
                    <h2 className="font-serif text-4xl md:text-5xl font-normal tracking-tight">What I work with</h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {Object.entries(skills).map(([category, items], index) => (
                        <div key={index}>
                            <h3 className="text-xs tracking-[0.15em] uppercase text-[#666666] mb-5 pb-3 border-b border-[#e5e5e5]">
                                {category}
                            </h3>
                            <ul className="space-y-2">
                                {items.map((skill, skillIndex) => (
                                    <li key={skillIndex} className="text-[15px] flex items-center gap-3">
                                        <span className="w-1 h-1 bg-[#0a0a0a] rounded-full" />
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 px-6 md:px-8 text-center">
                <div className="max-w-2xl mx-auto">
                    <p className="text-xs tracking-[0.2em] uppercase text-[#666666] mb-4">Contact</p>
                    <h2 className="font-serif text-4xl md:text-6xl font-normal tracking-tight mb-6">Let's work together</h2>
                    <p className="text-lg text-[#666666] mb-12 max-w-md mx-auto">
                        I'm always open to discussing product roles, collaboration opportunities, 
                        or just having a conversation about data and product strategy.
                    </p>
                    
                    <div className="flex flex-wrap justify-center gap-4">
                        <a
                            href="mailto:mosesmwangikanya@gmail.com"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-[#e5e5e5] rounded-full text-[15px] transition-all duration-300 hover:bg-[#0a0a0a] hover:border-[#0a0a0a] hover:text-[#fafafa] hover:-translate-y-0.5"
                        >
                            <Mail className="w-4 h-4" />
                            mosesmwangikanya@gmail.com
                        </a>
                        <a
                            href="tel:+447361507912"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-[#e5e5e5] rounded-full text-[15px] transition-all duration-300 hover:bg-[#0a0a0a] hover:border-[#0a0a0a] hover:text-[#fafafa] hover:-translate-y-0.5"
                        >
                            <Phone className="w-4 h-4" />
                            +44 7361 507912
                        </a>
                        <a
                            href="https://github.com/kanya01"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-4 bg-white border border-[#e5e5e5] rounded-full text-[15px] transition-all duration-300 hover:bg-[#0a0a0a] hover:border-[#0a0a0a] hover:text-[#fafafa] hover:-translate-y-0.5"
                        >
                            <Github className="w-4 h-4" />
                            GitHub
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-8 px-6 md:px-8 border-t border-[#e5e5e5] text-center">
                <p className="text-sm text-[#666666]">© 2025 Moses Mwangi — Designed with intention</p>
            </footer>
        </div>
    );
};

export default Portfolio;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';

const experiences = [
    {
        company: 'Skin Rocks',
        role: 'Technology Delivery Coordinator',
        period: 'Summer 2026',
        location: 'London, UK',
        achievements: [
            'Coordinated technology delivery for a leading skincare platform, ensuring timely and efficient project execution',
            'Facilitated cross-functional communication between product, engineering, and design teams',
            'Implemented process improvements that enhanced project tracking and reporting',
            'Supported the launch of new features by coordinating testing and feedback sessions',
        ],
    },
    {
        company: 'Raviro',
        role: 'Product Associate',
        period: 'June 2024 – Present',
        location: 'London, UK',
        achievements: [
            'Analyzed user behavior data across 12 developing regions, implementing automated validation features that increased completion rates by 13%',
            'Created comprehensive impact dashboards in Tableau for data-driven strategic decisions',
            'Collaborated with product teams and public health researchers on analytical requirements',
            'Conducted deep-dive analysis on user journey data to identify platform improvement opportunities',
        ],
    },
    {
        company: 'Trainline',
        role: 'Apprentice Software Engineer',
        period: 'September 2022 – June 2024',
        location: 'London, UK',
        achievements: [
            'Led analytical initiatives improving customer experience for 300k+ daily users',
            'Developed GDPR-compliant data processing solutions with large datasets',
            'Created real-time monitoring dashboards using New Relic and NRQL',
            'Conducted A/B testing and experimentation to validate feature improvements',
            'Served as Scrum Master facilitating data-driven sprint planning',
        ],
    },
    {
        company: 'Bentley',
        role: 'Digital Technology Solutions Apprentice',
        period: 'June 2020 – September 2020',
        location: 'London, UK',
        achievements: [
            'Supported analytical projects for digital solution implementations',
            'Participated in requirements gathering and analysis for product development',
        ],
    },
];

const projects = [
    {
        id: 'meridian',
        name: 'Meridian',
        description:
            'A marketplace for local services, starting in Kenya, helping people find reliable professionals and helping service providers grow their businesses.',
        category: 'Full-stack development',
        status: 'In development',
        link: '/case-study/meridian',
    },
    {
        id: 'live-o',
        name: 'live.o',
        description:
            'A marketplace connecting creative professionals with clients through portfolios, matching, and tiered payments.',
        category: 'Full-stack development',
        status: 'In development',
        link: '/case-study/live-o',
        liveUrl: 'https://liveo.space',
    },
    {
        id: 'publication-summarizer',
        name: 'Publication Summarizer',
        description:
            'An AI-powered tool for extracting useful insights from economic publications.',
        category: 'AI/ML concept',
        status: 'Concept phase',
        link: '/case-study/publication-summarizer',
    },
    {
        id: 'skilldeck',
        name: 'SkillDeck',
        description:
            'Developer tooling for scaffolding production-ready agent skills with Ruby gems, with a community registry in development.',
        category: 'Developer tools',
        status: 'In development',
        link: '/case-study/skilldeck',
    },
    {
        id: 'filmslate',
        name: 'FilmSlate',
        description:
            'A more personalised onboarding experience for an independent film streaming platform.',
        category: 'Product strategy',
        status: 'MVP complete',
        link: '/case-study/filmslate',
    },
];

const skills = [
    {
        category: 'Analytics',
        items: ['Tableau', 'New Relic', 'NRQL', 'A/B testing', 'User journey analysis'],
    },
    {
        category: 'Development',
        items: [
            'Ruby',
            'React',
            'Node.js',
            'MongoDB',
            'Postgres',
            'Rails',
            'Express.js',
            'Socket.IO',
        ],
    },
    {
        category: 'Product',
        items: ['Product strategy', 'User research', 'Market research', 'Agile/Scrum'],
    },
    {
        category: 'Data',
        items: ['ETL processes', 'Large datasets', 'GDPR compliance', 'Statistical analysis'],
    },
];

const education = [
    {
        institution: "King's College London",
        degree: 'Product Management, Postgraduate Certificate',
        period: '2024 – 2025',
    },
    {
        institution: 'Multiverse',
        degree: 'Software Engineering, Apprenticeship (Merit)',
        period: '2022 – 2024',
    },
];

const linkClass =
    'underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

function Portfolio() {
    const reduceMotion = useReducedMotion();

    const reveal = (delay = 0) => ({
        initial: reduceMotion ? false : { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.35, delay, ease: 'easeOut' },
    });

    return (
        <div
            className="min-h-screen bg-black text-white selection:bg-white selection:text-black"
            style={{
                fontFamily:
                    '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            }}
        >
            <div className="mx-auto max-w-[76ch] px-5 pb-20 pt-8 text-[14px] leading-[1.85] sm:px-8 sm:pt-14 sm:text-[15px]">
                <a
                    href="#main"
                    className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:text-black"
                >
                    Skip to content
                </a>

                <nav
                    aria-label="Main navigation"
                    className="mb-16 flex flex-wrap gap-x-6 gap-y-1 text-sm sm:mb-24"
                >
                    <a href="#about" className={linkClass}>about</a>
                    <a href="#experience" className={linkClass}>experience</a>
                    <a href="#projects" className={linkClass}>projects</a>
                    <Link to="/blog" className={linkClass}>blog</Link>
                    <a href="#contact" className={linkClass}>contact</a>
                </nav>

                <main id="main">
                    <section id="about" aria-labelledby="name" className="mb-20">
                        <motion.p {...reveal(0)} className="mb-3 text-sm">
                            moses@portfolio:~$ whoami
                        </motion.p>

                        <motion.h1
                            {...reveal(0.15)}
                            id="name"
                            className="mb-3 text-2xl font-normal leading-tight sm:text-3xl"
                        >
                            Moses Mwangi
                            <span
                                aria-hidden="true"
                                className="ml-2 inline-block h-[1em] w-[0.5em] translate-y-[0.12em] bg-white align-baseline motion-safe:animate-pulse"
                            />
                        </motion.h1>

                        <motion.p {...reveal(0.3)} className="mb-6">
                            Product associate, software engineer, and builder based in London.
                        </motion.p>

                        <motion.div {...reveal(0.45)} className="space-y-4">
                            <p>
                                I work across product strategy, data analysis, user research,
                                and software development. I like turning complex problems into
                                useful, well-considered products.
                            </p>
                            <p>
                                Currently working at Raviro and building projects including
                                Meridian and live.o.
                            </p>
                            <p>
                                <a href="#projects" className={linkClass}>view my work</a>
                                {'  /  '}
                                <a href="mailto:mosesmwangikanya@gmail.com" className={linkClass}>
                                    get in touch
                                </a>
                            </p>
                        </motion.div>
                    </section>

                    <section id="experience" aria-labelledby="experience-heading" className="mb-20">
                        <h2 id="experience-heading" className="mb-8 text-base font-normal">
                            $ cat experience.txt
                        </h2>

                        <div className="space-y-10">
                            {experiences.map((experience) => (
                                <article key={experience.company}>
                                    <h3 className="font-normal">
                                        {experience.company}
                                        <span aria-hidden="true"> — </span>
                                        {experience.role}
                                    </h3>
                                    <p>
                                        {experience.period} / {experience.location}
                                    </p>
                                    <ul className="mt-2 space-y-1">
                                        {experience.achievements.map((achievement) => (
                                            <li key={achievement} className="pl-4">
                                                <span aria-hidden="true" className="-ml-4 mr-2">-</span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section id="projects" aria-labelledby="projects-heading" className="mb-20">
                        <h2 id="projects-heading" className="mb-8 text-base font-normal">
                            $ ls projects/
                        </h2>

                        <div className="space-y-9">
                            {projects.map((project) => (
                                <article key={project.id}>
                                    <h3 className="font-normal">
                                        <Link to={project.link} className={linkClass}>
                                            {project.name}
                                        </Link>
                                    </h3>
                                    <p>{project.category} / {project.status}</p>
                                    <p className="mt-1">{project.description}</p>
                                    <p className="mt-1">
                                        <Link to={project.link} className={linkClass}>
                                            case study →
                                        </Link>
                                        {project.liveUrl && (
                                            <>
                                                {'  /  '}
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className={linkClass}
                                                >
                                                    live site ↗
                                                </a>
                                            </>
                                        )}
                                    </p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section aria-labelledby="skills-heading" className="mb-20">
                        <h2 id="skills-heading" className="mb-8 text-base font-normal">
                            $ cat skills.txt
                        </h2>

                        <dl className="space-y-4">
                            {skills.map((group) => (
                                <div key={group.category}>
                                    <dt>{group.category}</dt>
                                    <dd>{group.items.join(' / ')}</dd>
                                </div>
                            ))}
                        </dl>
                    </section>

                    <section aria-labelledby="education-heading" className="mb-20">
                        <h2 id="education-heading" className="mb-8 text-base font-normal">
                            $ cat education.txt
                        </h2>

                        <div className="space-y-5">
                            {education.map((item) => (
                                <div key={item.institution}>
                                    <h3 className="font-normal">{item.institution}</h3>
                                    <p>{item.degree}</p>
                                    <p>{item.period}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="contact" aria-labelledby="contact-heading" className="mb-20">
                        <h2 id="contact-heading" className="mb-6 text-base font-normal">
                            $ cat contact.txt
                        </h2>
                        <p>Interested in working together? Say hello.</p>
                        <p className="mt-3">
                            <a
                                href="mailto:mosesmwangikanya@gmail.com"
                                className={`${linkClass} break-all`}
                            >
                                mosesmwangikanya@gmail.com
                            </a>
                        </p>
                        <p className="mt-2">
                            <a
                                href="https://github.com/kanya01"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={linkClass}
                            >
                                github.com/kanya01
                            </a>
                            {'  /  '}
                            <Link to="/blog" className={linkClass}>blog</Link>
                        </p>
                    </section>
                </main>

                <footer className="text-sm">
                    <p>© {new Date().getFullYear()} Moses Mwangi</p>
                    <p>London, England</p>
                </footer>
            </div>
        </div>
    );
}

export default Portfolio;

import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import GithubHoverCard from './GithubHoverCard.jsx';
import BlurScrollReveal from './BlurScrollReveal.jsx';
import ProjectDemo from './ProjectDemo.jsx';
import { projectDemos } from '../data/projectDemos.js';

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
        current: true,
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

const statusGlyphs = {
    'In development': '●',
    'Concept phase': '○',
    'MVP complete': '■',
};

// Sections tracked by the status bar and the active-heading highlight.
const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];

// Retro chrome toggles.
const SHOW_STATUS_BAR = true;
const SHOW_GLOBE = true;
const ANIMATE_GLOBE = true;
const SHOW_SCANLINES = false;

const buttonLinkClass =
    'cursor-pointer underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const linkClass =
    'underline decoration-white/50 underline-offset-4 transition-colors hover:decoration-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const RULE = '─'.repeat(80);

function getScrollState() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const y = window.scrollY;
    const atBottom = max > 0 && y >= max - 2;

    let active = 'about';
    for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) active = id;
    }
    if (atBottom) active = 'contact';

    const position = y <= 2 ? 'Top' : atBottom ? 'Bot' : `${Math.round((y / max) * 100)}%`;
    return { active, position };
}

function useScrollState() {
    const [state, setState] = useState({ active: 'about', position: 'Top' });

    useEffect(() => {
        const update = () => {
            const next = getScrollState();
            setState((prev) =>
                prev.active === next.active && prev.position === next.position ? prev : next
            );
        };
        update();
        window.addEventListener('scroll', update, { passive: true });
        window.addEventListener('resize', update);
        return () => {
            window.removeEventListener('scroll', update);
            window.removeEventListener('resize', update);
        };
    }, []);

    return state;
}

function useLondonTime() {
    const [time, setTime] = useState('');

    useEffect(() => {
        const tick = () =>
            setTime(
                new Date().toLocaleTimeString('en-GB', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: 'Europe/London',
                })
            );
        tick();
        const id = setInterval(tick, 15000);
        return () => clearInterval(id);
    }, []);

    return time;
}

function renderGlobe(rot) {
    const rows = 15;
    const cols = 22;
    const step = Math.PI / 6;
    const light = [-0.55, -0.5, 0.67];
    let out = '';

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const nx = ((x + 0.5) / cols) * 2 - 1;
            const ny = ((y + 0.5) / rows) * 2 - 1;
            const r2 = nx * nx + ny * ny;
            if (r2 > 1) {
                out += ' ';
                continue;
            }
            const z = Math.sqrt(1 - r2);
            const lat = Math.asin(-ny);
            const lon = Math.atan2(nx, z) + rot;
            const lit = Math.max(0, nx * light[0] + ny * light[1] + z * light[2]);
            const dLon = Math.abs(lon / step - Math.round(lon / step));
            const dLat = Math.abs(lat / step - Math.round(lat / step));
            if (dLon < 0.07 * (1 + (1 - z) * 2) || dLat < 0.09) {
                out += lit > 0.5 ? '+' : lit > 0.2 ? ':' : '.';
            } else {
                out += lit > 0.7 ? '.' : ' ';
            }
        }
        out += '\n';
    }
    return out;
}

function Globe() {
    const reduceMotion = useReducedMotion();
    const [rot, setRot] = useState(0.4);

    useEffect(() => {
        if (!ANIMATE_GLOBE || reduceMotion) return undefined;
        const id = setInterval(() => setRot((r) => r + 0.035), 90);
        return () => clearInterval(id);
    }, [reduceMotion]);

    return (
        <pre
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-[-12px] m-0 hidden select-none min-[560px]:block"
            style={{ fontFamily: 'inherit', fontSize: 8, lineHeight: '7px', color: '#7a7a7a' }}
        >
            {renderGlobe(rot)}
        </pre>
    );
}

function BlockCursor() {
    return (
        <span
            aria-hidden="true"
            className="ml-2 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-white motion-safe:animate-blink"
        />
    );
}

function SectionHeading({ id, index, active, className = 'mb-8', children }) {
    return (
        <h2
            id={id}
            className={`${className} flex items-baseline gap-3 text-base font-normal leading-6`}
        >
            <span className="inline-flex items-baseline whitespace-nowrap">
                {children}
                {active && <BlockCursor />}
            </span>
            <span
                aria-hidden="true"
                className="min-w-6 flex-1 overflow-hidden whitespace-nowrap"
                style={{ color: active ? '#5a5a5a' : '#262626' }}
            >
                {RULE}
            </span>
            <span
                aria-hidden="true"
                className="text-[13px]"
                style={{ color: active ? '#ffffff' : '#5a5a5a' }}
            >
                [{String(index).padStart(2, '0')}]
            </span>
        </h2>
    );
}

function scrollToSection(id, reduceMotion) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 32,
        behavior: reduceMotion ? 'auto' : 'smooth',
    });
}

function StatusBar({ active, position }) {
    const reduceMotion = useReducedMotion();
    const time = useLondonTime();

    return (
        <nav
            aria-label="Section status"
            className="fixed inset-x-0 bottom-0 z-20 flex h-7 items-center border-t border-[#262626] bg-black text-xs leading-7"
        >
            <span className="whitespace-nowrap bg-white px-2.5 text-black">~/moses</span>
            <div className="flex min-w-0 flex-1 gap-0.5 overflow-x-auto whitespace-nowrap px-2 [scrollbar-width:none]">
                {sections.map((id, i) => {
                    const on = id === active;
                    return (
                        <a
                            key={id}
                            href={`#${id}`}
                            aria-current={on ? 'location' : undefined}
                            onClick={(e) => {
                                e.preventDefault();
                                scrollToSection(id, reduceMotion);
                            }}
                            className={`px-2 no-underline ${on ? 'bg-white text-black' : 'text-[#8f8f8f] hover:text-white'}`}
                        >
                            {i}:{id}
                            {on && '*'}
                        </a>
                    );
                })}
            </div>
            <span className="whitespace-nowrap px-3 text-[#8f8f8f]">
                {position}
                {'  '}LDN {time}
            </span>
        </nav>
    );
}

function Portfolio() {
    const reduceMotion = useReducedMotion();
    const { active, position } = useScrollState();
    const [openDemo, setOpenDemo] = useState(null);
    const closeDemo = useCallback(() => setOpenDemo(null), []);
    const [lastLogin] = useState(() => {
        const d = new Date();
        const date = d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
        const time = d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
        return `${date} ${time}`;
    });

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
            <div className="mx-auto max-w-[76ch] px-5 pb-[120px] pt-8 text-[14px] leading-[1.85] sm:px-8 sm:pt-14 sm:text-[15px]">
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
                    <section id="about" aria-labelledby="name" className="relative mb-20">
                        {SHOW_GLOBE && <Globe />}

                        <motion.p {...reveal(0)} className="mb-1 text-sm text-[#8f8f8f]">
                            Last login: {lastLogin} on ttys001
                        </motion.p>

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
                        <SectionHeading id="experience-heading" index={1} active={active === 'experience'}>
                            $ cat experience.txt
                        </SectionHeading>

                        <div className="flex flex-col">
                            {experiences.map((experience, i) => {
                                const last = i === experiences.length - 1;
                                return (
                                    <article
                                        key={experience.company}
                                        className="grid grid-cols-[24px_minmax(0,1fr)]"
                                        style={{ paddingBottom: last ? 0 : 40 }}
                                    >
                                        <div aria-hidden="true" className="flex flex-col items-start">
                                            <span
                                                className="leading-[1.85]"
                                                style={{ color: experience.current ? '#ffffff' : '#8f8f8f' }}
                                            >
                                                {experience.current ? '●' : '○'}
                                            </span>
                                            <span
                                                className="ml-1 w-px flex-1 bg-[#2e2e2e]"
                                                style={{ marginBottom: last ? 14 : -6 }}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="font-normal">
                                                {experience.company}
                                                <span aria-hidden="true"> — </span>
                                                {experience.role}
                                            </h3>
                                            <p className="text-[#8f8f8f]">
                                                {experience.period} / {experience.location}
                                            </p>
                                            <ul className="mt-2 space-y-1">
                                                {experience.achievements.map((achievement) => (
                                                    <li key={achievement} className="pl-4">
                                                        <span aria-hidden="true" className="-ml-4 mr-2 text-[#8f8f8f]">-</span>
                                                        <BlurScrollReveal as="span" text={achievement} />
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </article>
                                );
                            })}
                        </div>
                    </section>

                    <section id="projects" aria-labelledby="projects-heading" className="mb-20">
                        <SectionHeading id="projects-heading" index={2} active={active === 'projects'}>
                            $ ls projects/
                        </SectionHeading>

                        <div className="space-y-9">
                            {projects.map((project) => {
                                const demo = projectDemos[project.id];
                                const open = openDemo === project.id;
                                const toggleId = `demo-toggle-${project.id}`;
                                return (
                                    <article key={project.id}>
                                        <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                                            <h3 className="font-normal">
                                                <Link to={project.link} className={linkClass}>
                                                    {project.name}
                                                </Link>
                                            </h3>
                                            <span className="whitespace-nowrap text-[13px] text-[#8f8f8f]">
                                                <span aria-hidden="true">{statusGlyphs[project.status] || '○'} </span>
                                                {project.status.toLowerCase()}
                                            </span>
                                        </div>
                                        <p className="text-[#8f8f8f]">{project.category}</p>
                                        <BlurScrollReveal className="mt-1" text={project.description} />
                                        <p className="mt-1">
                                            {demo && (
                                                <>
                                                    <button
                                                        id={toggleId}
                                                        type="button"
                                                        onClick={() => setOpenDemo(open ? null : project.id)}
                                                        aria-expanded={open}
                                                        aria-controls={open ? `demo-${project.id}` : undefined}
                                                        className={buttonLinkClass}
                                                    >
                                                        {open ? '■ stop demo' : '▶ run demo'}
                                                    </button>
                                                    {'  /  '}
                                                </>
                                            )}
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
                                        {demo && open && (
                                            <ProjectDemo
                                                project={project}
                                                steps={demo}
                                                toggleId={toggleId}
                                                onClose={closeDemo}
                                            />
                                        )}
                                    </article>
                                );
                            })}
                        </div>

                        <p aria-hidden="true" className="mt-7 whitespace-pre text-[13px] text-[#8f8f8f]">
                            {'● in development   ○ concept   ■ shipped'}
                        </p>
                    </section>

                    <section id="skills" aria-labelledby="skills-heading" className="mb-20">
                        <SectionHeading id="skills-heading" index={3} active={active === 'skills'}>
                            $ cat skills.txt
                        </SectionHeading>

                        <dl className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-6 gap-y-4">
                            {skills.map((group) => (
                                <Fragment key={group.category}>
                                    <dt className="text-[#8f8f8f]">{group.category}</dt>
                                    <BlurScrollReveal as="dd" text={group.items.join(' / ')} />
                                </Fragment>
                            ))}
                        </dl>
                    </section>

                    <section id="education" aria-labelledby="education-heading" className="mb-20">
                        <SectionHeading id="education-heading" index={4} active={active === 'education'}>
                            $ cat education.txt
                        </SectionHeading>

                        <div className="space-y-5">
                            {education.map((item) => (
                                <div key={item.institution}>
                                    <h3 className="font-normal">{item.institution}</h3>
                                    <BlurScrollReveal text={item.degree} />
                                    <p className="text-[#8f8f8f]">{item.period}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section id="contact" aria-labelledby="contact-heading" className="mb-20">
                        <SectionHeading
                            id="contact-heading"
                            index={5}
                            active={active === 'contact'}
                            className="mb-6"
                        >
                            $ cat contact.txt
                        </SectionHeading>
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
                            <GithubHoverCard username="kanya01">
                                <a
                                    href="https://github.com/kanya01"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={linkClass}
                                >
                                    github.com/kanya01
                                </a>
                            </GithubHoverCard>
                            {'  /  '}
                            <Link to="/blog" className={linkClass}>blog</Link>
                        </p>
                    </section>
                </main>

                <footer className="text-sm">
                    <p>© {new Date().getFullYear()} Moses Mwangi</p>
                    <p>London, England</p>
                    <p aria-hidden="true" className="mt-6 text-[#8f8f8f]">logout</p>
                    <p aria-hidden="true" className="text-[#8f8f8f]">[Process completed]</p>
                </footer>
            </div>

            {SHOW_STATUS_BAR && <StatusBar active={active} position={position} />}

            {SHOW_SCANLINES && (
                <div
                    aria-hidden="true"
                    className="pointer-events-none fixed inset-0 z-30"
                    style={{
                        background:
                            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)',
                    }}
                />
            )}
        </div>
    );
}

export default Portfolio;

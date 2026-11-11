import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    ArrowRight,
    BadgeCheck,
    Check,
    Clock,
    Download,
    Lock,
    MapPin,
    MessageSquare,
    Music,
    Palette,
    Pause,
    Play,
    RotateCcw,
    Search,
    Send,
    ShieldCheck,
    Star,
    Zap,
} from 'lucide-react';
import {
    AMBER,
    calls,
    callCategories,
    categories,
    creators,
    findCreator,
    heroWords,
    landing,
    levels,
    orderStages,
    waveform,
} from '../../data/liveo.js';

// A clickable, scaled-down replica of liveo.space. Pages are laid out in real
// pixels at a fixed virtual width; LiveOShowcase scales the whole thing to fit.

const money = (n) => `$${n.toFixed(2)}`;

const LEVEL_STYLE = {
    Beginner: { color: '#86efac', background: 'rgba(22,101,52,.3)', borderColor: '#166534' },
    Hobbyist: { color: '#fcd34d', background: 'rgba(146,64,14,.3)', borderColor: '#92400e' },
    Pro: { color: '#c4b5fd', background: 'rgba(91,33,182,.3)', borderColor: '#5b21b6' },
};

export function LevelBadge({ level }) {
    return (
        <span className="rounded-full border px-2 py-0.5 text-[10px] font-semibold" style={LEVEL_STYLE[level]}>
            {level}
        </span>
    );
}

export function SkillChip({ children, size = 'sm' }) {
    return (
        <span
            className={`rounded-full bg-white/[.07] font-medium text-white ${size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1.5 text-[12px]'}`}
        >
            {children}
        </span>
    );
}

// Background image with a dark fallback, so a missing remote asset never leaves a hole.
function Cover({ src, className = '', children, style }) {
    const [ok, setOk] = useState(true);
    return (
        <div
            className={`${/\babsolute\b/.test(className) ? "" : "relative "}overflow-hidden bg-[#141210] ${className}`}
            style={{
                backgroundImage: 'radial-gradient(120% 80% at 30% 20%, #3a2a17 0%, #120f0c 55%, #070707 100%)',
                ...style,
            }}
        >
            {ok && (
                <img
                    src={src}
                    alt=""
                    loading="lazy"
                    draggable={false}
                    onError={() => setOk(false)}
                    className="absolute inset-0 h-full w-full object-cover"
                />
            )}
            {children}
        </div>
    );
}

function Avatar({ creator, size = 40, radius = 12 }) {
    const initials = creator.name
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    return (
        <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center justify-center font-black text-black"
            style={{
                width: size,
                height: size,
                borderRadius: radius,
                fontSize: size * 0.34,
                background: `linear-gradient(135deg, #f1c27d 0%, ${AMBER} 45%, #5b3a12 100%)`,
            }}
        >
            {initials}
        </span>
    );
}

/* ───────────────────────── chrome ───────────────────────── */

function MarketingNav({ go, compact }) {
    return (
        <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-5">
            <button type="button" onClick={() => go({ name: 'home' })} className="lo-display text-[23px] font-extrabold tracking-[-0.04em]">
                live<span style={{ color: AMBER }}>.o!</span>
            </button>
            <nav className="flex items-center gap-2 text-[14px] font-medium">
                {!compact && (
                    <>
                        <button type="button" onClick={() => go({ name: 'discover' })} className="lo-display rounded-full px-3 py-2 text-white/55 hover:text-white">
                            Hire talent
                        </button>
                        <button type="button" onClick={() => go({ name: 'calls' })} className="lo-display rounded-full px-3 py-2 text-white/55 hover:text-white">
                            Get hired
                        </button>
                    </>
                )}
                <button type="button" onClick={() => go({ name: 'discover' })} className="lo-display ml-1 rounded-full bg-[#fafafa] px-4 py-2.5 font-semibold text-[#030303] hover:bg-white">
                    Join the marketplace
                </button>
            </nav>
        </header>
    );
}

function AppNav({ route, go, compact }) {
    const tab = (name, label) => {
        const on = route.name === name || (name === 'discover' && ['profile', 'service'].includes(route.name));
        return (
            <button
                type="button"
                onClick={() => go({ name })}
                className={`rounded-full px-4 py-2 text-[13px] font-medium transition-colors ${on ? 'bg-[#fafafa] text-black' : 'text-white/55 hover:text-white'}`}
            >
                {label}
            </button>
        );
    };
    return (
        <header className="sticky top-0 z-20 flex h-[62px] items-center justify-between border-b border-white/[.06] bg-black/85 px-5 backdrop-blur-md">
            <div className="flex items-center gap-6">
                <button type="button" onClick={() => go({ name: 'home' })} className="text-[21px] font-black tracking-[-0.04em]">
                    live.o!
                </button>
                <nav className="flex gap-1">
                    {tab('discover', 'Discover')}
                    {tab('calls', 'Calls')}
                </nav>
            </div>
            <div className="flex items-center gap-4 text-[13px] font-semibold">
                {!compact && <Search size={15} className="text-white/60" />}
                {!compact && <Palette size={15} className="text-white/60" />}
                {!compact && <span>Log in</span>}
                <span className="rounded-full bg-[#fafafa] px-4 py-1.5 text-black shadow-[0_0_24px_rgba(255,255,255,.25)]">Sign up</span>
            </div>
        </header>
    );
}

function PageTitle({ children, sub }) {
    return (
        <div className="mb-6">
            <h1 className="text-[48px] font-black leading-none tracking-[-0.05em]">{children}</h1>
            {sub && <p className="mt-3 text-[18px] text-[#8f8f8f]">{sub}</p>}
        </div>
    );
}

/* ───────────────────────── landing ───────────────────────── */

function RotatingWord({ animate }) {
    const [i, setI] = useState(0);
    useEffect(() => {
        if (!animate) return undefined;
        const id = setInterval(() => setI((n) => (n + 1) % heroWords.length), 2200);
        return () => clearInterval(id);
    }, [animate]);
    return (
        <span className="lo-serif relative block italic tracking-[-0.02em]" style={{ color: AMBER }}>
            <span key={i} className={animate ? 'lo-word-in inline-block' : 'inline-block'}>
                {heroWords[i]}
            </span>
        </span>
    );
}

function SideSection({ side, label, title, accent, body, steps, cta, img, flip, compact, go, target }) {
    return (
        <section className={`grid border-t border-white/[.06] ${compact ? 'grid-cols-1' : 'grid-cols-2'}`}>
            <Cover src={img} className={`${compact ? 'h-[220px]' : 'min-h-[460px]'} ${flip && !compact ? 'order-2' : ''}`}>
                <span className="lo-mono absolute left-5 top-5 rounded-sm bg-black/60 px-2 py-1 text-[10px] tracking-[.2em] text-white/80">
                    {side}
                </span>
            </Cover>
            <div className={`flex flex-col justify-center ${compact ? 'px-6 py-10' : 'px-14 py-14'}`}>
                <p className="lo-mono mb-4 text-[11px] tracking-[.22em] text-white/50">{label}</p>
                <h2 className={`lo-display font-extrabold leading-[.95] tracking-[-0.04em] ${compact ? 'text-[38px]' : 'text-[52px]'}`}>
                    {title} <span className="lo-serif font-normal italic tracking-[-0.02em]" style={{ color: AMBER }}>{accent}</span>
                </h2>
                <p className="lo-display mt-5 max-w-[42ch] text-[16px] leading-relaxed text-white/60">{body}</p>
                <ol className="mt-7">
                    {steps.map(([n, head, rest]) => (
                        <li key={n} className="lo-display flex gap-4 border-t border-white/[.08] py-3.5 text-[14px] text-white/60">
                            <span className="lo-mono text-[12px]" style={{ color: AMBER }}>{n}</span>
                            <span><b className="font-semibold text-white">{head}</b> {rest}</span>
                        </li>
                    ))}
                </ol>
                <button
                    type="button"
                    onClick={() => go(target)}
                    className="lo-display mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-[14px] font-medium hover:border-white/50"
                >
                    {cta} <ArrowRight size={14} />
                </button>
            </div>
        </section>
    );
}

function Landing({ go, compact, animate }) {
    const [video, setVideo] = useState(true);
    return (
        <div className="lo-display bg-[#030303]">
            <section className={`relative flex items-center justify-center overflow-hidden ${compact ? 'h-[640px]' : 'h-[700px]'}`}>
                <Cover src={landing('hero-frame.jpg')} className="absolute inset-0">
                    {video && animate && (
                        <video
                            className="absolute inset-0 h-full w-full object-cover"
                            src={landing('hero.mp4')}
                            poster={landing('hero-frame.jpg')}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onError={() => setVideo(false)}
                        />
                    )}
                </Cover>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,.35)_0%,rgba(0,0,0,.8)_75%)]" />
                <MarketingNav go={go} compact={compact} />
                <div className="relative z-10 px-6 text-center">
                    <span className="lo-mono inline-block px-2.5 py-1 text-[10px] font-bold tracking-[.22em] text-black" style={{ background: AMBER }}>
                        THE MARKETPLACE FOR MUSIC TALENT
                    </span>
                    <h1
                        className={`mt-6 font-extrabold leading-[.92] tracking-[-0.038em] ${compact ? 'text-[46px]' : 'text-[88px]'}`}
                    >
                        where music gets
                        <RotatingWord animate={animate} />
                    </h1>
                    <p className={`mx-auto mt-6 max-w-[34em] leading-relaxed text-white/75 ${compact ? 'text-[15px]' : 'text-[17px]'}`}>
                        Hire producers, vocalists, and engineers — or get hired. One place to connect, collaborate, and get paid for the work.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3 text-[14px]">
                        <button
                            type="button"
                            data-guide
                            onClick={() => go({ name: 'discover' })}
                            className="inline-flex items-center gap-2 rounded-full bg-[#fafafa] px-5 py-3 font-semibold text-black hover:bg-white"
                        >
                            Start collaborating <ArrowRight size={14} />
                        </button>
                        <button
                            type="button"
                            onClick={() => go({ name: 'discover' })}
                            className="rounded-full border border-white/20 bg-black/30 px-5 py-3 font-medium backdrop-blur hover:border-white/50"
                        >
                            Browse talent
                        </button>
                    </div>
                    <p className="lo-mono mt-5 text-[11px] text-white/55">Free to join · Secure payments via Stripe</p>
                </div>
            </section>

            <SideSection
                side="SIDE A"
                label="SIDE A — FOR THE ONES HIRING"
                title="your record,"
                accent="their hands."
                body="Post a project and match with vetted producers, toplines, and engineers. Escrow holds the money; you release it when the mix is right."
                steps={[
                    ['A1', 'Post the brief.', 'Scope, refs, deadline, budget — five minutes.'],
                    ['A2', 'Quick-listen the matches.', 'Demo reels, not résumés.'],
                    ['A3', 'Approve & release.', 'Milestones, revisions included, escrowed payout.'],
                ]}
                cta="Post a project"
                target={{ name: 'discover' }}
                img={landing('side-a.jpg')}
                compact={compact}
                go={go}
            />
            <SideSection
                side="SIDE B"
                label="SIDE B — FOR THE ONES GETTING HIRED"
                title="get paid"
                accent="for the work."
                body="A profile that sounds like you — demo reels front and center, tiered pricing you control, and payouts that don't need chasing."
                steps={[
                    ['B1', 'Build your reel.', 'Upload demos; clients press play before they ping you.'],
                    ['B2', 'Set your tiers.', 'Your rates, your revision count, in writing.'],
                    ['B3', 'Deliver, get paid.', 'Escrow releases on approval — via Stripe.'],
                ]}
                cta="Create your profile"
                target={{ name: 'profile', handle: 'knya' }}
                img={landing('side-b.jpg')}
                flip
                compact={compact}
                go={go}
            />

            <Cover src={landing('band-frame.jpg')} className={`${compact ? 'h-[300px]' : 'h-[380px]'}`}>
                <div className="absolute inset-0 flex items-center justify-center bg-black/55 px-6 text-center">
                    <p className={`font-extrabold leading-[1] tracking-[-0.04em] ${compact ? 'text-[32px]' : 'text-[56px]'}`}>
                        creativity shouldn&apos;t be limited
                        <br />
                        by geography or <span className="lo-serif font-normal italic" style={{ color: AMBER }}>resources.</span>
                    </p>
                </div>
            </Cover>

            <section className="px-6 py-20 text-center">
                <p className="lo-mono text-[11px] tracking-[.22em]" style={{ color: AMBER }}>START FREE</p>
                <h2 className={`mt-3 font-extrabold tracking-[-0.04em] ${compact ? 'text-[40px]' : 'text-[64px]'}`}>ready to build?</h2>
                <p className="mt-3 text-white/60">Create a free account and post your first project in minutes.</p>
                <button
                    type="button"
                    onClick={() => go({ name: 'discover' })}
                    className="mt-7 rounded-full bg-[#fafafa] px-6 py-3 text-[14px] font-semibold text-black"
                >
                    Join the marketplace
                </button>
            </section>
            <footer className="flex flex-wrap justify-between gap-3 border-t border-white/[.06] px-6 py-6 text-[12px] text-white/45">
                <span>© 2026 live.o! Inc.</span>
                <span className="flex gap-4">
                    <span>Hire talent</span>
                    <span>Get hired</span>
                    <span>Marketplace</span>
                    <span>Terms</span>
                    <span>Privacy</span>
                </span>
            </footer>
        </div>
    );
}

/* ───────────────────────── discover ───────────────────────── */

function Checkbox({ label, checked, onChange }) {
    return (
        <label className="flex cursor-pointer items-center gap-3 py-1 text-[13px] text-white/90">
            <input type="checkbox" checked={checked} onChange={onChange} className="peer sr-only" />
            <span className="flex h-4 w-4 items-center justify-center rounded-[4px] border border-white/10 bg-white/[.06] peer-checked:border-white peer-checked:bg-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white">
                {checked && <Check size={11} strokeWidth={3} className="text-black" />}
            </span>
            {label}
        </label>
    );
}

function CreatorCard({ creator, go, guide }) {
    return (
        <article className="flex flex-col overflow-hidden rounded-xl border border-white/10 bg-[#060606] transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/20">
            <Cover src={creator.cover} className="h-[170px]" />
            <div className="flex flex-1 flex-col px-5 pb-2 pt-5">
                <div className="flex items-start justify-between gap-2">
                    <div>
                        <h3 className="text-[18px] font-bold leading-tight">{creator.name}</h3>
                        <p className="text-[13px] font-medium text-[#8f8f8f]">{creator.role}</p>
                    </div>
                    <LevelBadge level={creator.level} />
                </div>
                <p className="mt-4 line-clamp-2 min-h-[40px] text-[13px] leading-snug text-[#8f8f8f]">{creator.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                    {creator.skills.slice(0, 3).map((s) => (
                        <SkillChip key={s}>{s}</SkillChip>
                    ))}
                    {creator.skills.length > 3 && <SkillChip>+{creator.skills.length - 3}</SkillChip>}
                </div>
            </div>
            <div className="mt-3 border-t border-white/[.06] p-3">
                <button
                    type="button"
                    {...(guide ? { 'data-guide': true } : {})}
                    onClick={() => go({ name: 'profile', handle: creator.handle })}
                    className="w-full rounded-md bg-[#0e0e0e] py-2 text-[13px] font-medium hover:bg-[#161616]"
                >
                    View Profile
                </button>
            </div>
        </article>
    );
}

function Discover({ go, compact }) {
    const [q, setQ] = useState('');
    const [cats, setCats] = useState([]);
    const [lvls, setLvls] = useState([]);
    const toggle = (list, set, v) => set(list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

    const results = useMemo(() => {
        const needle = q.trim().toLowerCase();
        return creators.filter((c) => {
            if (cats.length && !cats.includes(c.category)) return false;
            if (lvls.length && !lvls.includes(c.level)) return false;
            if (!needle) return true;
            const hay = [c.name, c.handle, c.role, c.category, c.bio, ...c.skills].join(' ').toLowerCase();
            return needle.split(/\s+/).every((w) => hay.includes(w));
        });
    }, [q, cats, lvls]);

    return (
        <div className={compact ? 'px-5 py-10' : 'px-10 py-14'}>
            <PageTitle sub="Find the perfect collaborator">discover.</PageTitle>
            <label className="relative mb-10 block max-w-[540px]">
                <span className="sr-only">Search creators</span>
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder='Search creators, roles, or genres — try "hip hop producer"'
                    className="h-11 w-full rounded-full border border-white/[.08] bg-white/[.04] pl-11 pr-4 text-[13px] text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                />
            </label>
            <div className={`grid gap-8 ${compact ? 'grid-cols-1' : 'grid-cols-[200px_minmax(0,1fr)]'}`}>
                <aside className={compact ? 'flex gap-8' : ''}>
                    {!compact && <h2 className="border-b border-white/[.08] pb-5 text-[16px] font-semibold">Filters</h2>}
                    <div className={compact ? '' : 'border-b border-white/[.08] py-5'}>
                        <h3 className="mb-2 text-[14px] font-semibold">Category</h3>
                        {categories.map((c) => (
                            <Checkbox key={c} label={c} checked={cats.includes(c)} onChange={() => toggle(cats, setCats, c)} />
                        ))}
                    </div>
                    <div className={compact ? '' : 'py-5'}>
                        <h3 className="mb-2 text-[14px] font-semibold">Experience Level</h3>
                        {levels.map((l) => (
                            <Checkbox key={l} label={l} checked={lvls.includes(l)} onChange={() => toggle(lvls, setLvls, l)} />
                        ))}
                    </div>
                </aside>
                <div>
                    <p className="mb-4 text-[13px] text-[#8f8f8f]">
                        Showing {results.length} result{results.length === 1 ? '' : 's'}
                    </p>
                    {results.length ? (
                        <div className={`grid gap-5 ${compact ? 'grid-cols-1' : 'grid-cols-3'}`}>
                            {results.map((c, i) => (
                                <CreatorCard key={c.handle} creator={c} go={go} guide={i === 0} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-xl border border-dashed border-white/10 px-6 py-16 text-center">
                            <p className="text-[20px] font-black tracking-[-0.03em]">
                                nobody here <span className="italic">yet.</span>
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    setQ('');
                                    setCats([]);
                                    setLvls([]);
                                }}
                                className="mt-4 rounded-full bg-white/[.06] px-4 py-2 text-[13px] font-semibold"
                            >
                                Clear filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

/* ───────────────────────── profile ───────────────────────── */

function Stat({ icon, label, value, small }) {
    return (
        <div className="rounded-xl bg-white/[.03] p-3">
            <p className="flex items-center gap-1.5 text-[9.5px] font-semibold tracking-[.08em] text-[#8f8f8f]">
                {React.createElement(icon, { size: 11, className: label === 'RATING' ? 'fill-amber-400 text-amber-400' : '' })}
                {label}
            </p>
            <p className={`mt-1 font-bold ${small ? 'text-[12px]' : 'text-[16px]'}`}>{value}</p>
        </div>
    );
}

function TrackRow({ track, seed, playing, onToggle }) {
    const bars = useMemo(() => waveform(seed), [seed]);
    const [t, setT] = useState(0);
    useEffect(() => {
        if (!playing) return undefined;
        const id = setInterval(() => setT((x) => (x >= 1 ? 0 : x + 0.006)), 60);
        return () => clearInterval(id);
    }, [playing]);
    return (
        <div className="flex items-center gap-4 rounded-xl border border-white/[.06] bg-[#060606] p-3">
            <button
                type="button"
                onClick={onToggle}
                aria-label={playing ? `Pause ${track.title}` : `Play ${track.title}`}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fafafa] text-black"
            >
                {playing ? <Pause size={15} className="fill-black" /> : <Play size={15} className="ml-0.5 fill-black" />}
            </button>
            <div className="min-w-0 flex-1">
                <div className="flex justify-between text-[13px]">
                    <span className="truncate font-semibold">{track.title}</span>
                    <span className="text-[#8f8f8f]">{track.len}</span>
                </div>
                <div className="mt-1.5 flex h-7 items-center gap-[2px]" aria-hidden="true">
                    {bars.map((h, i) => (
                        <span
                            key={i}
                            className="flex-1 rounded-full"
                            style={{
                                height: `${h * 100}%`,
                                background: i / bars.length <= t ? AMBER : 'rgba(255,255,255,.18)',
                            }}
                        />
                    ))}
                </div>
                <p className="mt-1 text-[11px] text-[#8f8f8f]">{track.meta}</p>
            </div>
        </div>
    );
}

function ServiceCard({ creator, service, go, guide }) {
    const from = service.tiers[0];
    return (
        <button
            type="button"
            {...(guide ? { 'data-guide': true } : {})}
            onClick={() => go({ name: 'service', handle: creator.handle, serviceId: service.id })}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/[.06] bg-[#060606] text-left hover:border-white/20"
        >
            <Cover src={service.cover} className="h-[110px]">
                <span className="absolute inset-0 bg-gradient-to-b from-transparent to-[#060606]" />
                <span className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-[14px] font-bold backdrop-blur">
                    ${from.price.toFixed(1)}
                </span>
            </Cover>
            <span className="flex flex-1 flex-col px-5 pb-4 pt-2">
                <span className="text-[16px] font-bold leading-snug group-hover:underline">{service.title}</span>
                <span className="mt-1 text-[12px] leading-snug text-[#8f8f8f]">{service.blurb}</span>
                <span className="mt-auto flex justify-between pt-5 text-[11px] text-[#8f8f8f]">
                    <span className="flex items-center gap-1.5"><Clock size={11} /> {from.days} days</span>
                    <span className="flex items-center gap-1.5"><RotateCcw size={11} /> {from.revisions} Revisions</span>
                </span>
            </span>
        </button>
    );
}

function SectionHead({ children, count }) {
    return (
        <h2 className="mb-4 flex items-baseline gap-2 text-[22px] font-black tracking-[-0.04em]">
            {children}
            {count !== undefined && <span className="text-[15px] font-normal tracking-normal text-[#8f8f8f]">({count})</span>}
        </h2>
    );
}

function Profile({ handle, go, compact }) {
    const creator = findCreator(handle) ?? creators[0];
    const [playing, setPlaying] = useState(null);
    const [msg, setMsg] = useState(false);

    return (
        <div>
            <Cover src={creator.banner} className="h-[230px]">
                <span className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#030303]" />
            </Cover>
            <div className={`relative -mt-[90px] grid gap-8 ${compact ? 'grid-cols-1 px-5' : 'grid-cols-[240px_minmax(0,1fr)] px-8'} pb-16`}>
                <aside className="space-y-5">
                    <div className="rounded-3xl border border-white/[.08] bg-[#0a0a0a]/95 p-5 text-center backdrop-blur">
                        <div className="flex justify-center">
                            <Avatar creator={creator} size={112} radius={22} />
                        </div>
                        <h1 className="mt-4 text-[26px] font-black tracking-[-0.03em]">{creator.name}</h1>
                        <p className="flex items-center justify-center gap-1 text-[13px] text-[#8f8f8f]">
                            @{creator.handle} <BadgeCheck size={13} />
                        </p>
                        <span className="mt-3 inline-block rounded-full border border-white/10 bg-white/[.06] px-3 py-1 text-[12px] font-medium lowercase">
                            {creator.role}
                        </span>
                        <button
                            type="button"
                            onClick={() => go({ name: 'service', handle: creator.handle, serviceId: creator.services[0].id })}
                            className="mt-5 w-full rounded-lg bg-[#fafafa] py-2.5 text-[13px] font-bold text-black shadow-[0_8px_30px_rgba(255,255,255,.12)]"
                        >
                            Hire Me
                        </button>
                        <button
                            type="button"
                            onClick={() => setMsg((v) => !v)}
                            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2 text-[12px] font-semibold text-white/80"
                        >
                            <MessageSquare size={12} /> {msg ? 'Message sent ✓' : 'Message'}
                        </button>
                        <div className="mt-5 grid grid-cols-2 gap-2 text-left">
                            <Stat icon={Star} label="RATING" value={creator.rating.toFixed(1)} />
                            <Stat icon={MessageSquare} label="REVIEWS" value={creator.reviews} />
                            <Stat icon={Clock} label="RESPONSE" value={creator.response} />
                            <Stat icon={MapPin} label="LOCATION" value={creator.location} small />
                        </div>
                    </div>
                    <div className="rounded-3xl border border-white/[.06] bg-[#060606] p-5">
                        <h2 className="mb-3 flex items-center gap-2 text-[15px] font-bold">
                            <ShieldCheck size={15} /> Top Skills
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {creator.skills.map((s) => (
                                <SkillChip key={s} size="md">{s}</SkillChip>
                            ))}
                        </div>
                    </div>
                </aside>
                <div className={`space-y-9`}>
                    <section className="rounded-3xl border border-white/[.06] bg-[#060606] p-6">
                        <SectionHead>about.</SectionHead>
                        <p className="text-[14px] text-white/75">{creator.bio}</p>
                    </section>
                    <section>
                        <SectionHead count={creator.tracks.length}>portfolio.</SectionHead>
                        <div className="space-y-2.5">
                            {creator.tracks.map((tr, i) => (
                                <TrackRow
                                    key={tr.title}
                                    track={tr}
                                    seed={i + creator.handle.length}
                                    playing={playing === i}
                                    onToggle={() => setPlaying(playing === i ? null : i)}
                                />
                            ))}
                        </div>
                    </section>
                    <section>
                        <SectionHead count={creator.reviewList.length}>reviews.</SectionHead>
                        {creator.reviewList.length ? (
                            <div className="grid gap-3">
                                {creator.reviewList.map((r) => (
                                    <figure key={r.who} className="rounded-2xl border border-white/[.06] bg-[#060606] p-4">
                                        <div className="flex items-center justify-between text-[13px] font-semibold">
                                            {r.who}
                                            <span className="flex gap-0.5">
                                                {Array.from({ length: r.stars }, (_, i) => (
                                                    <Star key={i} size={11} className="fill-amber-400 text-amber-400" />
                                                ))}
                                            </span>
                                        </div>
                                        <blockquote className="mt-1.5 text-[13px] text-white/70">{r.text}</blockquote>
                                    </figure>
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-white/10 py-10 text-center">
                                <Star size={18} className="mx-auto text-white/50" />
                                <p className="mt-3 text-[15px] font-semibold">No reviews yet</p>
                                <p className="text-[12px] text-[#8f8f8f]">Reviews will appear here after completed orders.</p>
                            </div>
                        )}
                    </section>
                    <section>
                        <SectionHead>services.</SectionHead>
                        <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-2'}`}>
                            {creator.services.map((s, i) => (
                                <ServiceCard key={s.id} creator={creator} service={s} go={go} guide={i === 0} />
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

/* ───────────────────────── service & tiers ───────────────────────── */

function TierFeatures({ tier }) {
    return (
        <ul className="space-y-2">
            {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[13px] text-white/80">
                    <Check size={14} className="mt-0.5 shrink-0" style={{ color: AMBER }} /> {f}
                </li>
            ))}
        </ul>
    );
}

function Service({ handle, serviceId, go, compact }) {
    const creator = findCreator(handle) ?? creators[0];
    const service = creator.services.find((s) => s.id === serviceId) ?? creator.services[0];
    const [tierId, setTierId] = useState('standard');
    const tier = service.tiers.find((t) => t.id === tierId);

    return (
        <div className={compact ? 'px-5 py-8' : 'px-10 py-10'}>
            <p className="mb-4 text-[12px] text-[#8f8f8f]">
                <button type="button" onClick={() => go({ name: 'discover' })} className="hover:text-white">discover</button>
                {' / '}
                <button type="button" onClick={() => go({ name: 'profile', handle })} className="hover:text-white">@{creator.handle}</button>
                {' / services'}
            </p>
            <div className={`grid gap-10 ${compact ? 'grid-cols-1' : 'grid-cols-[minmax(0,1fr)_340px]'}`}>
                <div>
                    <h1 className="text-[36px] font-black leading-[1.05] tracking-[-0.04em]">{service.title}</h1>
                    <button
                        type="button"
                        onClick={() => go({ name: 'profile', handle })}
                        className="mt-4 flex items-center gap-3 text-left"
                    >
                        <Avatar creator={creator} size={36} radius={10} />
                        <span>
                            <span className="block text-[14px] font-semibold">{creator.name}</span>
                            <span className="flex items-center gap-1 text-[12px] text-[#8f8f8f]">
                                <Star size={11} className="fill-amber-400 text-amber-400" /> {creator.rating.toFixed(1)} · {creator.reviews} reviews
                            </span>
                        </span>
                    </button>
                    <Cover src={service.cover} className="mt-6 h-[240px] rounded-2xl" />
                    <h2 className="mt-8 text-[20px] font-black tracking-[-0.03em]">about this service.</h2>
                    <p className="mt-2 text-[14px] text-white/70">{service.blurb}. Every tier includes a written scope, escrowed payment and in-thread delivery.</p>

                    <h2 className="mt-8 text-[20px] font-black tracking-[-0.03em]">compare tiers.</h2>
                    <div className="mt-3 overflow-hidden rounded-2xl border border-white/[.08]">
                        <table className="w-full text-left text-[13px]">
                            <thead className="bg-white/[.03] text-[11px] uppercase tracking-[.08em] text-[#8f8f8f]">
                                <tr>
                                    <th className="px-4 py-3 font-semibold" />
                                    {service.tiers.map((t) => (
                                        <th key={t.id} className={`px-4 py-3 font-semibold ${t.id === tierId ? 'text-white' : ''}`}>{t.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    ['Price', (t) => `$${t.price}`],
                                    ['Delivery', (t) => `${t.days} days`],
                                    ['Revisions', (t) => t.revisions],
                                    ['Includes', (t) => t.features.length + ' items'],
                                ].map(([label, fn]) => (
                                    <tr key={label} className="border-t border-white/[.06]">
                                        <td className="px-4 py-3 text-[#8f8f8f]">{label}</td>
                                        {service.tiers.map((t) => (
                                            <td key={t.id} className={`px-4 py-3 ${t.id === tierId ? 'font-semibold text-white' : 'text-white/70'}`}>{fn(t)}</td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <aside className="self-start rounded-3xl border border-white/[.08] bg-[#060606] p-5 lg:sticky">
                    <div role="tablist" aria-label="Tiers" className="grid grid-cols-3 rounded-full bg-white/[.05] p-1 text-[12px] font-semibold">
                        {service.tiers.map((t) => (
                            <button
                                key={t.id}
                                type="button"
                                role="tab"
                                aria-selected={t.id === tierId}
                                onClick={() => setTierId(t.id)}
                                className={`rounded-full py-2 transition-colors ${t.id === tierId ? 'bg-[#fafafa] text-black' : 'text-white/60 hover:text-white'}`}
                            >
                                {t.name}
                            </button>
                        ))}
                    </div>
                    <p className="mt-6 text-[40px] font-black leading-none tracking-[-0.04em]">${tier.price}</p>
                    <p className="mt-1 text-[12px] text-[#8f8f8f]">{tier.name} package</p>
                    <div className="my-5 flex gap-5 text-[12px] text-white/80">
                        <span className="flex items-center gap-1.5"><Clock size={13} /> {tier.days} day delivery</span>
                        <span className="flex items-center gap-1.5"><RotateCcw size={13} /> {tier.revisions} revisions</span>
                    </div>
                    <TierFeatures tier={tier} />
                    <button
                        type="button"
                        data-guide
                        onClick={() => go({ name: 'checkout', handle, serviceId: service.id, tier: tier.id })}
                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fafafa] py-3 text-[14px] font-bold text-black"
                    >
                        Continue (${tier.price}) <ArrowRight size={14} />
                    </button>
                    <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-[#8f8f8f]">
                        <Lock size={11} /> Payment held in escrow until you approve
                    </p>
                </aside>
            </div>
        </div>
    );
}

/* ───────────────────────── checkout ───────────────────────── */

const orderFor = ({ handle, serviceId, tier }) => {
    const creator = findCreator(handle) ?? creators[0];
    const service = creator.services.find((s) => s.id === serviceId) ?? creator.services[0];
    const t = service.tiers.find((x) => x.id === tier) ?? service.tiers[1];
    const fee = Math.round(t.price * 0.05 * 100) / 100;
    return { creator, service, tier: t, fee, total: t.price + fee };
};

function StripeField({ label, value, className = '', right }) {
    return (
        <div className={className}>
            <span className="mb-1.5 block text-[12px] font-medium text-white/70">{label}</span>
            <div className="flex h-10 items-center justify-between rounded-md border border-white/10 bg-[#0d0d0d] px-3 text-[14px] text-white/90 shadow-[0_1px_1px_rgba(0,0,0,.3)]">
                <span>{value}</span>
                {right}
            </div>
        </div>
    );
}

function OrderSummary({ o, children }) {
    return (
        <aside className="self-start rounded-3xl border border-white/[.08] bg-[#060606] p-5">
            <div className="flex gap-3">
                <Cover src={o.service.cover} className="h-14 w-14 shrink-0 rounded-xl" />
                <div className="min-w-0">
                    <p className="truncate text-[14px] font-bold">{o.service.title}</p>
                    <p className="text-[12px] text-[#8f8f8f]">{o.tier.name} · by {o.creator.name}</p>
                </div>
            </div>
            <dl className="mt-5 space-y-2 border-t border-white/[.06] pt-4 text-[13px]">
                <div className="flex justify-between"><dt className="text-[#8f8f8f]">Subtotal</dt><dd>{money(o.tier.price)}</dd></div>
                <div className="flex justify-between"><dt className="text-[#8f8f8f]">Service fee</dt><dd>{money(o.fee)}</dd></div>
                <div className="flex justify-between border-t border-white/[.06] pt-2 text-[15px] font-bold"><dt>Total</dt><dd>{money(o.total)}</dd></div>
            </dl>
            {children}
        </aside>
    );
}

function Checkout({ route, go, compact }) {
    const o = orderFor(route);
    const [state, setState] = useState('idle');
    useEffect(() => {
        if (state !== 'processing') return undefined;
        const id = setTimeout(() => go({ ...route, name: 'order' }), 1400);
        return () => clearTimeout(id);
    }, [state, go, route]);

    return (
        <div className={compact ? 'px-5 py-8' : 'px-10 py-10'}>
            <PageTitle sub="Secure payment — funds are held until you approve the work.">checkout.</PageTitle>
            <div className={`grid gap-8 ${compact ? 'grid-cols-1' : 'grid-cols-[minmax(0,1fr)_340px]'}`}>
                <section className="rounded-3xl border border-white/[.08] bg-[#060606] p-6">
                    <h2 className="mb-4 text-[16px] font-bold">Payment</h2>
                    <div className="mb-4 grid grid-cols-2 gap-2 text-[12px] font-semibold">
                        <span className="flex items-center gap-2 rounded-md border-2 border-white/80 px-3 py-2.5">▭ Card</span>
                        <span className="flex items-center gap-2 rounded-md border border-white/10 px-3 py-2.5 text-white/50"> Pay</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <StripeField
                            className="col-span-2"
                            label="Card number"
                            value="4242 4242 4242 4242"
                            right={<span className="rounded bg-[#1a1f71] px-1.5 text-[10px] font-black italic text-white">VISA</span>}
                        />
                        <StripeField label="Expiration" value="12 / 34" />
                        <StripeField label="CVC" value="•••" />
                        <StripeField className="col-span-2" label="Country" value="United Kingdom" />
                    </div>
                    <p className="mt-4 text-[11px] text-white/45">
                        Demo only — test card shown, nothing is charged. Powered by <b className="text-white/70">stripe</b>
                    </p>
                </section>
                <OrderSummary o={o}>
                    <button
                        type="button"
                        data-guide
                        disabled={state !== 'idle'}
                        onClick={() => setState('processing')}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#fafafa] py-3 text-[14px] font-bold text-black disabled:opacity-80"
                    >
                        {state === 'idle' ? (
                            <>
                                <Lock size={13} /> Pay {money(o.total)}
                            </>
                        ) : (
                            <>
                                <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" /> Processing…
                            </>
                        )}
                    </button>
                    <p className="mt-3 flex items-start gap-2 text-[11px] leading-snug text-[#8f8f8f]">
                        <ShieldCheck size={13} className="mt-px shrink-0" />
                        Escrow: {o.creator.name} is paid when you approve delivery. Payouts clear after a 14-day hold.
                    </p>
                </OrderSummary>
            </div>
        </div>
    );
}

/* ───────────────────────── order ───────────────────────── */

const STAGE_TONE = {
    pending: '#8f8f8f',
    paid: '#60a5fa',
    in_progress: AMBER,
    in_review: '#c4b5fd',
    completed: '#86efac',
};

function Order({ route, compact }) {
    const o = orderFor(route);
    const [stage, setStage] = useState('paid');
    const [version, setVersion] = useState(0);
    const [revisionsUsed, setRevisionsUsed] = useState(0);
    const [rating, setRating] = useState(0);
    const [draft, setDraft] = useState('');
    const [thread, setThread] = useState([
        { kind: 'system', text: `Payment of ${money(o.total)} received — held in escrow.` },
    ]);
    const threadRef = useRef(null);
    const push = (m) => setThread((t) => [...t, m]);

    // Simulated seller activity, the way updates land in the real order thread.
    useEffect(() => {
        const a = setTimeout(() => {
            setStage('in_progress');
            push({ kind: 'them', text: 'Got the brief — starting today. Any refs beyond the ones you sent?' });
        }, 1300);
        return () => clearTimeout(a);
    }, []);

    useEffect(() => {
        if (stage !== 'in_progress') return undefined;
        const id = setTimeout(() => {
            setVersion((v) => v + 1);
            setStage('in_review');
            push({ kind: 'them', text: version ? 'v2 is up — brought the vocal forward and tamed the hats.' : 'First pass is up 🎧 have a listen.' });
            push({ kind: 'file', text: `${o.service.id}_v${version + 1}.wav`, size: version ? '48.1 MB' : '47.6 MB' });
        }, version ? 2600 : 4200);
        return () => clearTimeout(id);
    }, [stage, version, o.service.id]);

    useEffect(() => {
        threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: 'smooth' });
    }, [thread]);

    const send = (e) => {
        e.preventDefault();
        const text = draft.trim();
        if (!text) return;
        push({ kind: 'me', text });
        setDraft('');
        setTimeout(() => push({ kind: 'them', text: 'On it 👍' }), 1100);
    };

    const maxRev = typeof o.tier.revisions === 'number' ? o.tier.revisions : Infinity;
    const stageIdx = orderStages.findIndex((s) => s.id === stage);

    return (
        <div className={compact ? 'px-5 py-8' : 'px-10 py-10'}>
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <p className="text-[12px] text-[#8f8f8f]">order #LO-2611</p>
                    <h1 className="text-[36px] font-black leading-none tracking-[-0.04em]">{o.service.title.toLowerCase()}.</h1>
                </div>
                <span
                    className="rounded-full border px-3 py-1 text-[12px] font-semibold"
                    style={{ color: STAGE_TONE[stage], borderColor: `${STAGE_TONE[stage]}55`, background: `${STAGE_TONE[stage]}14` }}
                >
                    ● {orderStages[stageIdx].label}
                </span>
            </div>

            <ol className="mb-8 grid grid-cols-5 gap-2" aria-label="Order progress">
                {orderStages.map((s, i) => (
                    <li key={s.id} className="text-[11px]">
                        <span className="mb-2 block h-1 overflow-hidden rounded-full bg-white/[.08]">
                            <span
                                className="block h-full rounded-full transition-all duration-700"
                                style={{ width: i <= stageIdx ? '100%' : '0%', background: i <= stageIdx ? '#fafafa' : 'transparent' }}
                            />
                        </span>
                        <span className={i <= stageIdx ? 'text-white' : 'text-white/35'}>{s.label}</span>
                    </li>
                ))}
            </ol>

            <div className={`grid gap-8 ${compact ? 'grid-cols-1' : 'grid-cols-[minmax(0,1fr)_340px]'}`}>
                <section className="flex h-[400px] flex-col rounded-3xl border border-white/[.08] bg-[#060606]">
                    <header className="flex items-center gap-3 border-b border-white/[.06] px-5 py-3">
                        <Avatar creator={o.creator} size={30} radius={9} />
                        <span className="text-[13px] font-semibold">{o.creator.name}</span>
                        <span className="ml-auto flex items-center gap-1.5 text-[11px] text-[#86efac]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#86efac]" /> online
                        </span>
                    </header>
                    <div ref={threadRef} className="flex-1 space-y-2.5 overflow-y-auto px-5 py-4" aria-live="polite">
                        {thread.map((m, i) => {
                            if (m.kind === 'system')
                                return <p key={i} className="text-center text-[11px] text-[#8f8f8f]">{m.text}</p>;
                            if (m.kind === 'file')
                                return (
                                    <div key={i} className="flex max-w-[78%] items-center gap-3 rounded-2xl border border-white/10 bg-white/[.04] p-3">
                                        <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: `${AMBER}33`, color: AMBER }}>
                                            <Music size={15} />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-[12px] font-semibold">{m.text}</span>
                                            <span className="text-[11px] text-[#8f8f8f]">deliverable · {m.size}</span>
                                        </span>
                                        <Download size={14} className="text-white/60" />
                                    </div>
                                );
                            const mine = m.kind === 'me';
                            return (
                                <p
                                    key={i}
                                    className={`w-fit max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] ${mine ? 'ml-auto bg-[#fafafa] text-black' : 'bg-white/[.07]'}`}
                                >
                                    {m.text}
                                </p>
                            );
                        })}
                    </div>
                    <form onSubmit={send} className="flex gap-2 border-t border-white/[.06] p-3">
                        <input
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            placeholder="Write a message…"
                            aria-label="Message"
                            className="h-10 flex-1 rounded-full border border-white/[.08] bg-white/[.04] px-4 text-[13px] placeholder:text-white/40 focus:border-white/30 focus:outline-none"
                        />
                        <button type="submit" aria-label="Send" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fafafa] text-black">
                            <Send size={14} />
                        </button>
                    </form>
                </section>

                <OrderSummary o={o}>
                    <div className="mt-5 rounded-2xl bg-white/[.03] p-4 text-[12px]">
                        <p className="flex items-center gap-2 font-semibold">
                            <ShieldCheck size={13} style={{ color: stage === 'completed' ? '#86efac' : AMBER }} />
                            {stage === 'completed' ? 'Released to seller' : 'Held in escrow'}
                        </p>
                        <p className="mt-1 text-[#8f8f8f]">
                            {stage === 'completed'
                                ? `${money(o.tier.price)} scheduled for payout after the 14-day hold.`
                                : `Revisions used: ${revisionsUsed} / ${maxRev === Infinity ? '∞' : maxRev}`}
                        </p>
                    </div>
                    {stage === 'in_review' && (
                        <div className="mt-4 grid gap-2">
                            <button
                                type="button"
                                data-guide
                                onClick={() => {
                                    setStage('completed');
                                    push({ kind: 'system', text: 'Delivery approved — funds released.' });
                                }}
                                className="flex items-center justify-center gap-2 rounded-lg bg-[#fafafa] py-3 text-[13px] font-bold text-black"
                            >
                                <Zap size={13} /> Approve & release
                            </button>
                            <button
                                type="button"
                                disabled={revisionsUsed >= maxRev}
                                onClick={() => {
                                    setRevisionsUsed((n) => n + 1);
                                    setStage('in_progress');
                                    push({ kind: 'me', text: 'Love it — could the vocal sit a touch louder?' });
                                }}
                                className="rounded-lg border border-white/15 py-2.5 text-[13px] font-semibold disabled:opacity-40"
                            >
                                Request revision
                            </button>
                        </div>
                    )}
                    {(stage === 'paid' || stage === 'in_progress') && (
                        <p className="mt-4 flex items-center gap-2 text-[12px] text-[#8f8f8f]">
                            <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/20 border-t-white/70" />
                            {o.creator.name} is working on it…
                        </p>
                    )}
                    {stage === 'completed' && (
                        <div className="mt-4 text-center">
                            <p className="text-[13px] font-semibold">Rate {o.creator.name}</p>
                            <div className="mt-2 flex justify-center gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button key={n} type="button" aria-label={`${n} stars`} onClick={() => setRating(n)}>
                                        <Star size={20} className={n <= rating ? 'fill-amber-400 text-amber-400' : 'text-white/30'} />
                                    </button>
                                ))}
                            </div>
                            {rating > 0 && <p className="mt-2 text-[11px] text-[#86efac]">Thanks — review posted.</p>}
                        </div>
                    )}
                </OrderSummary>
            </div>
        </div>
    );
}

/* ───────────────────────── open calls ───────────────────────── */

function Calls({ compact }) {
    const [cat, setCat] = useState('All');
    const [sent, setSent] = useState({});
    const list = calls.filter((c) => cat === 'All' || c.category === cat);
    return (
        <div className={compact ? 'px-5 py-10' : 'px-10 py-14'}>
            <PageTitle>open calls.</PageTitle>
            <p className="-mt-3 mb-6 max-w-[34em] text-[14px] text-[#8f8f8f]">
                Open briefs from studios, labels and artists. Read the brief, hear the reference, send a pitch.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
                {callCategories.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => setCat(c)}
                        className={`rounded-full px-3.5 py-1.5 text-[12px] font-semibold ${cat === c ? 'bg-[#fafafa] text-black' : 'bg-white/[.05] text-white/70 hover:text-white'}`}
                    >
                        {c}
                    </button>
                ))}
            </div>
            <p className="mb-3 flex justify-between border-t border-white/[.06] pt-4 text-[12px] text-[#8f8f8f]">
                <span>{list.length} open calls</span>
                <span>Closing soonest</span>
            </p>
            {list.length ? (
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-2'}`}>
                    {list.map((c) => (
                        <article key={c.id} className="flex flex-col rounded-2xl border border-white/[.08] bg-[#060606] p-5">
                            <div className="flex justify-between text-[11px]">
                                <span className="rounded-full bg-white/[.06] px-2.5 py-0.5 font-semibold">{c.category}</span>
                                <span className="text-[#8f8f8f]">closes in {c.closes}</span>
                            </div>
                            <h3 className="mt-3 text-[17px] font-bold leading-snug">{c.title}</h3>
                            <p className="text-[12px] text-[#8f8f8f]">{c.who}</p>
                            <p className="lo-mono mt-3 text-[11px] text-white/55">{c.refs}</p>
                            <div className="mt-auto flex items-center justify-between pt-5">
                                <span className="text-[14px] font-bold">{c.budget}</span>
                                <button
                                    type="button"
                                    onClick={() => setSent((s) => ({ ...s, [c.id]: true }))}
                                    className={`rounded-full px-4 py-1.5 text-[12px] font-bold ${sent[c.id] ? 'bg-white/10 text-[#86efac]' : 'bg-[#fafafa] text-black'}`}
                                >
                                    {sent[c.id] ? 'Pitch sent ✓' : 'Send pitch'}
                                </button>
                            </div>
                            <p className="mt-2 text-[11px] text-[#8f8f8f]">{c.pitches + (sent[c.id] ? 1 : 0)} pitches so far</p>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-white/[.08] py-16 text-center">
                    <p className="text-[20px] font-black tracking-[-0.03em]">
                        nothing open <span className="italic">here.</span>
                    </p>
                    <p className="mt-1 text-[13px] text-[#8f8f8f]">We couldn&apos;t find any open calls in that category right now.</p>
                    <button type="button" onClick={() => setCat('All')} className="mt-4 rounded-full bg-white/[.06] px-4 py-2 text-[12px] font-semibold">
                        Clear filters
                    </button>
                </div>
            )}
        </div>
    );
}

/* ───────────────────────── router ───────────────────────── */

function LiveOReplica({ route, go, compact, animate }) {
    if (route.name === 'home') return <Landing go={go} compact={compact} animate={animate} />;
    let page;
    switch (route.name) {
        case 'discover':
            page = <Discover go={go} compact={compact} />;
            break;
        case 'calls':
            page = <Calls compact={compact} />;
            break;
        case 'profile':
            page = <Profile key={route.handle} handle={route.handle} go={go} compact={compact} />;
            break;
        case 'service':
            page = <Service key={route.serviceId} handle={route.handle} serviceId={route.serviceId} go={go} compact={compact} />;
            break;
        case 'checkout':
            page = <Checkout route={route} go={go} compact={compact} />;
            break;
        case 'order':
            page = <Order route={route} compact={compact} />;
            break;
        default:
            page = null;
    }
    return (
        <div className="min-h-full bg-[#030303]">
            <AppNav route={route} go={go} compact={compact} />
            {page}
        </div>
    );
}

export default LiveOReplica;

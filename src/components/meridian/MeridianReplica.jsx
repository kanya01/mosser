import React, { useEffect, useMemo, useState } from 'react';
import {
    BadgeCheck,
    BatteryFull,
    Bell,
    BookOpen,
    Briefcase,
    CalendarDays,
    Car,
    Check,
    ChevronDown,
    ChevronLeft,
    Clock,
    Hammer,
    Heart,
    House,
    List,
    Map as MapIcon,
    MapPin,
    MessageCircle,
    Phone,
    Scissors,
    Search,
    ShieldCheck,
    Signal,
    Sparkles,
    Star,
    Truck,
    User,
    Wallet,
    Wifi,
    Wrench,
    Zap,
} from 'lucide-react';
import {
    M,
    categories,
    customer,
    findProvider,
    jobTypes,
    kes,
    proWeek,
    providers,
    slots,
    takenSlots,
    trackStages,
} from '../../data/meridian.js';

// Clickable concept replica of the Meridian customer and provider apps, laid out
// at iPhone size (390 × 844). The Showcase shell draws the device and scales it.

const CAT_ICON = {
    plumbing: Wrench,
    electrical: Zap,
    cleaning: Sparkles,
    salon: Scissors,
    mechanic: Car,
    tutoring: BookOpen,
    carpentry: Hammer,
    moving: Truck,
};

const AVATAR_TONES = [M.forest, M.sun, '#8C6A3F', '#3D5A80', '#7A4E8C'];

const FEE = 75;

const days = (() => {
    const out = [];
    const base = new Date();
    for (let i = 0; i < 7; i++) {
        const d = new Date(base);
        d.setDate(base.getDate() + i);
        out.push({
            key: i,
            dow: i === 0 ? 'Today' : d.toLocaleDateString('en-GB', { weekday: 'short' }),
            date: d.getDate(),
            long: d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' }),
        });
    }
    return out;
})();

export function Avatar({ name, size = 44 }) {
    const initials = name
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();
    const tone = AVATAR_TONES[[...name].reduce((a, c) => a + c.charCodeAt(0), 0) % AVATAR_TONES.length];
    return (
        <span
            aria-hidden="true"
            className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white"
            style={{ width: size, height: size, background: tone, fontSize: size * 0.36 }}
        >
            {initials}
        </span>
    );
}

export function Verified({ small }) {
    return (
        <span className={`inline-flex items-center gap-1 font-semibold text-[#2F9E6E] ${small ? 'text-[11px]' : 'text-[12px]'}`}>
            <BadgeCheck size={small ? 13 : 14} className="fill-[#2F9E6E] text-white" /> {small ? '' : 'ID verified'}
        </span>
    );
}

export function Stars({ value, size = 12 }) {
    return (
        <span className="inline-flex items-center gap-1 font-semibold">
            <Star size={size} className="fill-[#E8693A] text-[#E8693A]" />
            {value.toFixed(1)}
        </span>
    );
}

/* ───────────────────────── device chrome ───────────────────────── */

function StatusBar({ dark }) {
    return (
        <div
            className={`sticky top-0 z-20 flex h-[54px] shrink-0 items-end justify-between px-8 pb-1.5 text-[15px] font-semibold ${dark ? 'bg-[#0E3B2E] text-white' : 'bg-[#F5EFE4] text-[#16181D]'}`}
        >
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
                <Signal size={15} />
                <Wifi size={15} />
                <BatteryFull size={20} />
            </span>
        </div>
    );
}

function HomeIndicator({ dark }) {
    return (
        <div className="flex justify-center pb-2 pt-2">
            <span className={`h-[5px] w-[134px] rounded-full ${dark ? 'bg-white/80' : 'bg-[#16181D]'}`} />
        </div>
    );
}

function TabBar({ active, go, pro }) {
    const items = pro
        ? [
              ['pro', 'Jobs', Briefcase, { name: 'pro' }],
              ['schedule', 'Schedule', CalendarDays, { name: 'pro' }],
              ['earnings', 'Earnings', Wallet, { name: 'pro' }],
              ['switch', 'Customer', User, { name: 'home' }],
          ]
        : [
              ['home', 'Home', House, { name: 'home' }],
              ['search', 'Search', Search, { name: 'search', q: '' }],
              ['track', 'Bookings', CalendarDays, { name: 'track', id: 'wanjiru' }],
              ['pro', 'Pro mode', Briefcase, { name: 'pro' }],
          ];
    return (
        <nav
            className={`sticky bottom-0 z-20 border-t ${pro ? 'border-white/10 bg-[#0E3B2E]' : 'border-[#E4DCCB] bg-[#FFFDF8]/95 backdrop-blur'}`}
        >
            <div className="grid grid-cols-4 pt-2">
                {items.map(([id, label, Icon, route]) => {
                    const on = id === active;
                    const color = pro ? (on ? '#fff' : 'rgba(255,255,255,.5)') : on ? M.forest : M.muted;
                    return (
                        <button key={id} type="button" onClick={() => go(route)} className="flex flex-col items-center gap-1 text-[11px] font-medium" style={{ color }}>
                            {React.createElement(Icon, { size: 22, strokeWidth: on ? 2.4 : 1.8 })}
                            {label}
                        </button>
                    );
                })}
            </div>
            <HomeIndicator dark={pro} />
        </nav>
    );
}

function Screen({ children, footer, tab, go, dark, pro }) {
    return (
        <div className={`flex min-h-full flex-col ${dark ? 'bg-[#0E3B2E] text-white' : 'bg-[#F5EFE4] text-[#16181D]'}`}>
            <StatusBar dark={dark} />
            <main className="flex-1">{children}</main>
            {footer && (
                <div className="sticky bottom-0 z-20 border-t border-[#E4DCCB] bg-[#FFFDF8]/95 px-5 pt-3 backdrop-blur">
                    {footer}
                    <HomeIndicator />
                </div>
            )}
            {tab && <TabBar active={tab} go={go} pro={pro} />}
        </div>
    );
}

function TopBar({ title, onBack, right }) {
    return (
        <div className="flex items-center gap-3 px-4 pb-2 pt-1">
            {onBack && (
                <button type="button" onClick={onBack} aria-label="Back" className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDF8] shadow-[0_1px_0_#E4DCCB]">
                    <ChevronLeft size={20} />
                </button>
            )}
            <h1 className="mr-display flex-1 truncate text-[20px] font-semibold">{title}</h1>
            {right}
        </div>
    );
}

function PrimaryButton({ children, onClick, disabled, guide, tone = 'forest', className = '' }) {
    const bg = tone === 'mpesa' ? M.mpesa : tone === 'sun' ? M.sun : M.forest;
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            {...(guide ? { 'data-guide': true } : {})}
            className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl text-[16px] font-semibold text-white transition-opacity disabled:opacity-35 ${className}`}
            style={{ background: bg }}
        >
            {children}
        </button>
    );
}

/* the meridian line: one thin sun-coloured rule, the brand's only flourish */
function MeridianLine({ className = '' }) {
    return <span aria-hidden="true" className={`block h-[3px] w-10 rounded-full bg-[#E8693A] ${className}`} />;
}

/* ───────────────────────── home ───────────────────────── */

function Home({ go }) {
    const top = ['wanjiru', 'amina', 'faith'].map(findProvider);
    return (
        <Screen tab="home" go={go}>
            <div className="px-5 pb-6">
                <div className="flex items-center justify-between pt-2">
                    <button type="button" className="flex items-center gap-1.5 rounded-full bg-[#FFFDF8] px-3 py-1.5 text-[13px] font-semibold shadow-[0_1px_0_#E4DCCB]">
                        <MapPin size={14} className="text-[#E8693A]" /> {customer.area} <ChevronDown size={14} />
                    </button>
                    <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDF8] shadow-[0_1px_0_#E4DCCB]">
                        <Bell size={18} />
                        <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#E8693A]" />
                    </span>
                </div>
                <h1 className="mr-display mt-6 text-[34px] font-semibold leading-[1.05] tracking-[-0.02em]">
                    Habari, {customer.name}.
                </h1>
                <MeridianLine className="mt-3" />
                <p className="mt-3 text-[15px] text-[#6B6A64]">What needs doing today?</p>

                <button
                    type="button"
                    data-guide
                    onClick={() => go({ name: 'search', q: 'plumber' })}
                    className="mt-5 flex h-[52px] w-full items-center gap-3 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] px-4 text-left text-[15px] text-[#6B6A64]"
                >
                    <Search size={18} className="text-[#16181D]" /> Try &ldquo;plumber in Kilimani&rdquo;
                </button>

                <div className="mt-6 grid grid-cols-4 gap-x-3 gap-y-4">
                    {categories.map((c) => (
                        <button key={c.id} type="button" onClick={() => go({ name: 'search', cat: c.id })} className="flex flex-col items-center gap-1.5 text-[12px] font-medium">
                            <span className="flex h-[60px] w-full items-center justify-center rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] text-[#0E3B2E]">
                                {React.createElement(CAT_ICON[c.id], { size: 24, strokeWidth: 1.8 })}
                            </span>
                            {c.label}
                        </button>
                    ))}
                </div>

                <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#0E3B2E] p-4 text-white">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10">
                        <ShieldCheck size={20} />
                    </span>
                    <p className="text-[13px] leading-snug">
                        <b className="font-semibold">Pay with M-Pesa, safely.</b>
                        <br />
                        <span className="text-white/70">Your money is released only when you say the job is done.</span>
                    </p>
                </div>

                <div className="mt-7 flex items-baseline justify-between">
                    <h2 className="mr-display text-[20px] font-semibold">Top rated near you</h2>
                    <button type="button" onClick={() => go({ name: 'search', q: '' })} className="text-[13px] font-semibold text-[#0E3B2E]">
                        See all
                    </button>
                </div>
                <div className="-mx-5 mt-3 flex gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
                    {top.map((p) => (
                        <button
                            key={p.id}
                            type="button"
                            onClick={() => go({ name: 'provider', id: p.id })}
                            className="w-[150px] shrink-0 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-3 text-left"
                        >
                            <Avatar name={p.name} size={40} />
                            <p className="mt-2 truncate text-[14px] font-semibold">{p.name}</p>
                            <p className="truncate text-[12px] text-[#6B6A64]">{p.trade}</p>
                            <p className="mt-2 flex items-center justify-between text-[12px]">
                                <Stars value={p.rating} />
                                <span className="text-[#6B6A64]">{p.km} km</span>
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        </Screen>
    );
}

/* ───────────────────────── search ───────────────────────── */

const FILTERS = [
    { id: 'verified', label: 'Verified', test: (p) => p.verified },
    { id: 'today', label: 'Available today', test: (p) => p.today },
    { id: 'near', label: 'Within 3 km', test: (p) => p.km <= 3 },
    { id: 'top', label: '4.8★ +', test: (p) => p.rating >= 4.8 },
];

// A stylised street map of Kilimani: no tiles, so it stays light on data.
function StreetMap({ height = 260, pins = [], route, mover, onPin }) {
    return (
        <svg viewBox="0 0 390 260" width="100%" height={height} preserveAspectRatio="xMidYMid slice" className="block bg-[#EAE2D2]" aria-hidden={!onPin}>
            <rect x="250" y="20" width="120" height="70" rx="10" fill="#D5DFC6" />
            <text x="262" y="60" fontSize="10" fill="#7C8B6A">Jamhuri Park</text>
            <path d="M-10 190 C 90 170, 180 150, 400 160" stroke="#fff" strokeWidth="16" fill="none" />
            <path d="M60 -10 L 120 280" stroke="#fff" strokeWidth="12" fill="none" />
            <path d="M-10 80 L 400 110" stroke="#fff" strokeWidth="10" fill="none" />
            <path d="M230 -10 L 210 280" stroke="#fff" strokeWidth="8" fill="none" />
            <path d="M300 120 L 330 280" stroke="#fff" strokeWidth="6" fill="none" />
            <text x="140" y="158" fontSize="10" fill="#8F877A" transform="rotate(-6 140 158)">Ngong Rd</text>
            <text x="12" y="76" fontSize="10" fill="#8F877A" transform="rotate(4 12 76)">Argwings Kodhek Rd</text>
            <text x="150" y="232" fontSize="11" fontWeight="600" fill="#A39A8B" letterSpacing="2">KILIMANI</text>
            {route && <polyline points={route.map((p) => p.join(',')).join(' ')} fill="none" stroke={M.sun} strokeWidth="4" strokeDasharray="1 8" strokeLinecap="round" />}
            {pins.map((p) => (
                <g key={p.id} transform={`translate(${p.x} ${p.y})`} onClick={onPin ? () => onPin(p.id) : undefined} style={onPin ? { cursor: 'pointer' } : undefined}>
                    <rect x={-p.w / 2} y="-30" width={p.w} height="24" rx="12" fill={p.home ? M.forest : M.paper} stroke={p.home ? 'none' : M.line} />
                    <text x="0" y="-14" fontSize="11" fontWeight="700" textAnchor="middle" fill={p.home ? '#fff' : M.ink}>
                        {p.label}
                    </text>
                    <circle r="4" fill={p.home ? M.forest : M.sun} stroke="#fff" strokeWidth="2" />
                </g>
            ))}
            {mover && (
                <g transform={`translate(${mover[0]} ${mover[1]})`}>
                    <circle r="16" fill={M.sun} opacity=".2" />
                    <circle r="8" fill={M.sun} stroke="#fff" strokeWidth="3" />
                </g>
            )}
        </svg>
    );
}

const PIN_SPOTS = [
    [120, 120],
    [270, 200],
    [330, 140],
    [70, 210],
    [180, 70],
    [250, 110],
    [40, 140],
    [200, 205],
];

function SearchScreen({ route, go }) {
    const [q, setQ] = useState(route.q ?? '');
    const [on, setOn] = useState(['verified']);
    const [view, setView] = useState('list');
    const cat = route.cat;

    const results = useMemo(() => {
        const needle = q.trim().toLowerCase().replace(/\bin\b|kilimani/g, ' ').trim();
        return providers.filter((p) => {
            if (cat && p.category !== cat) return false;
            if (!FILTERS.filter((f) => on.includes(f.id)).every((f) => f.test(p))) return false;
            if (!needle) return true;
            const hay = [p.name, p.trade, p.area, p.category].join(' ').toLowerCase();
            return needle.split(/\s+/).every((w) => hay.includes(w.replace(/s$/, '')));
        });
    }, [q, on, cat]);

    const catLabel = categories.find((c) => c.id === cat)?.label;

    return (
        <Screen tab="search" go={go}>
            <div className="px-4 pt-1">
                <div className="flex items-center gap-2">
                    <button type="button" onClick={() => go({ name: 'home' })} aria-label="Back" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFFDF8] shadow-[0_1px_0_#E4DCCB]">
                        <ChevronLeft size={20} />
                    </button>
                    <label className="flex h-11 flex-1 items-center gap-2 rounded-full border border-[#E4DCCB] bg-[#FFFDF8] px-4">
                        <Search size={16} />
                        <span className="sr-only">Search providers</span>
                        <input
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                            placeholder={catLabel ? `${catLabel} near you` : 'Plumber, cleaner, mechanic…'}
                            className="min-w-0 flex-1 bg-transparent text-[15px] placeholder:text-[#6B6A64] focus:outline-none"
                        />
                    </label>
                </div>
                <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
                    {FILTERS.map((f) => {
                        const active = on.includes(f.id);
                        return (
                            <button
                                key={f.id}
                                type="button"
                                aria-pressed={active}
                                onClick={() => setOn(active ? on.filter((x) => x !== f.id) : [...on, f.id])}
                                className={`flex shrink-0 items-center gap-1 rounded-full border px-3.5 py-2 text-[13px] font-medium ${active ? 'border-[#0E3B2E] bg-[#0E3B2E] text-white' : 'border-[#E4DCCB] bg-[#FFFDF8]'}`}
                            >
                                {active && <Check size={13} />} {f.label}
                            </button>
                        );
                    })}
                </div>
                <div className="mt-3 flex items-center justify-between text-[13px]">
                    <span className="text-[#6B6A64]">
                        {results.length} {catLabel ? catLabel.toLowerCase() : 'providers'} near {customer.area.split(',')[0]}
                    </span>
                    <span className="flex rounded-full bg-[#FFFDF8] p-0.5 shadow-[0_1px_0_#E4DCCB]">
                        {[
                            ['list', List],
                            ['map', MapIcon],
                        ].map(([id, Icon]) => (
                            <button
                                key={id}
                                type="button"
                                aria-label={`${id} view`}
                                aria-pressed={view === id}
                                onClick={() => setView(id)}
                                className={`flex h-8 w-9 items-center justify-center rounded-full ${view === id ? 'bg-[#16181D] text-white' : ''}`}
                            >
                                {React.createElement(Icon, { size: 15 })}
                            </button>
                        ))}
                    </span>
                </div>
            </div>

            {view === 'map' ? (
                <div className="mt-3">
                    <StreetMap
                        height={420}
                        onPin={(id) => go({ name: 'provider', id })}
                        pins={[
                            { id: 'home', x: 175, y: 150, w: 54, label: 'You', home: true },
                            ...results.slice(0, PIN_SPOTS.length).map((p, i) => ({
                                id: p.id,
                                x: PIN_SPOTS[i][0],
                                y: PIN_SPOTS[i][1],
                                w: 76,
                                label: `${(p.rate / 1000).toFixed(1)}k · ★${p.rating}`,
                            })),
                        ]}
                    />
                    <p className="px-4 py-3 text-center text-[12px] text-[#6B6A64]">Tap a pin to open a profile</p>
                </div>
            ) : (
                <ul className="mt-3 space-y-2.5 px-4 pb-6">
                    {results.map((p, i) => (
                        <li key={p.id}>
                            <button
                                type="button"
                                {...(i === 0 ? { 'data-guide': true } : {})}
                                onClick={() => go({ name: 'provider', id: p.id })}
                                className="flex w-full gap-3 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-3.5 text-left"
                            >
                                <Avatar name={p.name} size={48} />
                                <span className="min-w-0 flex-1">
                                    <span className="flex items-center gap-1.5">
                                        <span className="truncate text-[15px] font-semibold">{p.name}</span>
                                        {p.verified && <Verified small />}
                                    </span>
                                    <span className="block truncate text-[13px] text-[#6B6A64]">
                                        {p.trade} · {p.area} · {p.km} km
                                    </span>
                                    <span className="mt-2 flex items-center gap-3 text-[12px]">
                                        <span>
                                            <Stars value={p.rating} /> <span className="text-[#6B6A64]">({p.jobs} jobs)</span>
                                        </span>
                                        <span className="flex items-center gap-1 text-[#6B6A64]">
                                            <Clock size={11} /> {p.reply}
                                        </span>
                                    </span>
                                </span>
                                <span className="flex shrink-0 flex-col items-end justify-between">
                                    <span className="text-right text-[11px] text-[#6B6A64]">
                                        from
                                        <span className="mr-mono block text-[13px] font-semibold text-[#16181D]">{kes(p.rate)}</span>
                                    </span>
                                    {p.today && <span className="rounded-full bg-[#2F9E6E]/[.12] px-2 py-0.5 text-[10px] font-semibold text-[#2F9E6E]">Today</span>}
                                </span>
                            </button>
                        </li>
                    ))}
                    {!results.length && (
                        <li className="rounded-2xl border border-dashed border-[#E4DCCB] px-6 py-10 text-center">
                            <p className="mr-display text-[18px] font-semibold">No one matches that yet.</p>
                            <button
                                type="button"
                                onClick={() => {
                                    setQ('');
                                    setOn([]);
                                }}
                                className="mt-3 rounded-full bg-[#0E3B2E] px-4 py-2 text-[13px] font-semibold text-white"
                            >
                                Clear filters
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </Screen>
    );
}

/* ───────────────────────── provider ───────────────────────── */

function WorkTile({ label, i }) {
    const angles = [135, 45, 90];
    return (
        <div
            className="flex aspect-square flex-col justify-end rounded-xl border border-[#E4DCCB] p-2 text-[11px] font-medium text-[#0E3B2E]"
            style={{ background: `repeating-linear-gradient(${angles[i % 3]}deg, #FFFDF8 0 8px, #EFE7D7 8px 9px)` }}
        >
            <Wrench size={16} className="mb-auto opacity-60" />
            {label}
        </div>
    );
}

function Provider({ route, go }) {
    const p = findProvider(route.id);
    const [saved, setSaved] = useState(false);
    const [chat, setChat] = useState(false);
    return (
        <Screen
            go={go}
            footer={
                <div className="flex items-center gap-4">
                    <span className="shrink-0">
                        <span className="block text-[12px] text-[#6B6A64]">from</span>
                        <span className="mr-mono text-[17px] font-semibold">{kes(p.rate)}</span>
                    </span>
                    <PrimaryButton guide onClick={() => go({ name: 'book', id: p.id })}>
                        Book {p.name.split(' ')[0]}
                    </PrimaryButton>
                </div>
            }
        >
            <TopBar
                onBack={() => go({ name: 'search', q: p.trade.split(' ')[0].toLowerCase() })}
                title=""
                right={
                    <button type="button" aria-label="Save" aria-pressed={saved} onClick={() => setSaved((v) => !v)} className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFFDF8] shadow-[0_1px_0_#E4DCCB]">
                        <Heart size={18} className={saved ? 'fill-[#E8693A] text-[#E8693A]' : ''} />
                    </button>
                }
            />
            <div className="px-5 pb-8">
                <div className="flex items-center gap-4">
                    <Avatar name={p.name} size={76} />
                    <div className="min-w-0">
                        <h1 className="mr-display text-[26px] font-semibold leading-tight">{p.name}</h1>
                        <p className="text-[14px] text-[#6B6A64]">
                            {p.trade} · {p.area}
                        </p>
                        {p.verified ? <Verified /> : <span className="text-[12px] font-semibold text-[#6B6A64]">ID check pending</span>}
                    </div>
                </div>

                <div className="mt-5 grid grid-cols-3 divide-x divide-[#E4DCCB] rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] py-3 text-center">
                    <div>
                        <p className="text-[16px]"><Stars value={p.rating} size={14} /></p>
                        <p className="text-[11px] text-[#6B6A64]">{p.jobs} jobs</p>
                    </div>
                    <div>
                        <p className="text-[16px] font-semibold">{p.reply}</p>
                        <p className="text-[11px] text-[#6B6A64]">replies</p>
                    </div>
                    <div>
                        <p className="text-[16px] font-semibold">{p.since}</p>
                        <p className="text-[11px] text-[#6B6A64]">on Meridian</p>
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                    <button type="button" onClick={() => setChat((v) => !v)} className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E4DCCB] bg-[#FFFDF8] text-[14px] font-semibold">
                        <MessageCircle size={16} /> Chat
                    </button>
                    <button type="button" className="flex h-11 items-center justify-center gap-2 rounded-xl border border-[#E4DCCB] bg-[#FFFDF8] text-[14px] font-semibold">
                        <Phone size={16} /> Call
                    </button>
                </div>
                {chat && (
                    <div className="mt-3 space-y-2 rounded-2xl bg-[#FFFDF8] p-3 text-[13px]">
                        <p className="ml-auto w-fit max-w-[80%] rounded-2xl rounded-br-md bg-[#0E3B2E] px-3 py-2 text-white">Hi, can you come today for a leaking tap?</p>
                        <p className="w-fit max-w-[80%] rounded-2xl rounded-bl-md bg-[#F5EFE4] px-3 py-2">Yes — I&apos;m free from 2pm. Book a slot and I&apos;ll confirm 👍</p>
                    </div>
                )}

                <h2 className="mr-display mt-7 text-[19px] font-semibold">About</h2>
                <p className="mt-1.5 text-[14px] leading-relaxed text-[#3B3D42]">{p.bio}</p>

                <h2 className="mr-display mt-7 text-[19px] font-semibold">Services & prices</h2>
                <ul className="mt-2 divide-y divide-[#E4DCCB] rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8]">
                    {p.services.map((s) => (
                        <li key={s.name} className="flex items-center justify-between px-4 py-3">
                            <span>
                                <span className="block text-[14px] font-medium">{s.name}</span>
                                <span className="text-[12px] text-[#6B6A64]">{s.time}</span>
                            </span>
                            <span className="mr-mono text-[13px] font-semibold">{kes(s.price)}</span>
                        </li>
                    ))}
                </ul>

                <h2 className="mr-display mt-7 text-[19px] font-semibold">Past work</h2>
                <div className="mt-2 grid grid-cols-3 gap-2">
                    {p.work.map((w, i) => (
                        <WorkTile key={w} label={w} i={i} />
                    ))}
                </div>

                <h2 className="mr-display mt-7 flex items-baseline justify-between text-[19px] font-semibold">
                    Reviews <span className="text-[13px] font-normal text-[#6B6A64]">{p.reviews.length} recent</span>
                </h2>
                <div className="mt-2 space-y-2">
                    {p.reviews.length ? (
                        p.reviews.map((r) => (
                            <figure key={r.who} className="rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-3.5">
                                <figcaption className="flex items-center justify-between text-[13px]">
                                    <span className="font-semibold">
                                        {r.who} <span className="font-normal text-[#6B6A64]">· {r.job}</span>
                                    </span>
                                    <span className="flex gap-0.5">
                                        {Array.from({ length: r.stars }, (_, i) => (
                                            <Star key={i} size={11} className="fill-[#E8693A] text-[#E8693A]" />
                                        ))}
                                    </span>
                                </figcaption>
                                <blockquote className="mt-1 text-[13px] text-[#3B3D42]">{r.text}</blockquote>
                            </figure>
                        ))
                    ) : (
                        <p className="rounded-2xl border border-dashed border-[#E4DCCB] p-4 text-center text-[13px] text-[#6B6A64]">No reviews yet.</p>
                    )}
                </div>
            </div>
        </Screen>
    );
}

/* ───────────────────────── book ───────────────────────── */

function Book({ route, go }) {
    const p = findProvider(route.id);
    const [job, setJob] = useState(jobTypes[0]);
    const [day, setDay] = useState(1);
    const [slot, setSlot] = useState(null);
    const free = slots.filter((s) => !takenSlots.includes(s));

    return (
        <Screen
            go={go}
            footer={
                <PrimaryButton guide={!!slot} disabled={!slot} onClick={() => go({ name: 'pay', id: p.id, day, slot, job })}>
                    {slot ? `Continue · ${kes(p.rate)}` : 'Pick a time'}
                </PrimaryButton>
            }
        >
            <TopBar onBack={() => go({ name: 'provider', id: p.id })} title={`Book ${p.name.split(' ')[0]}`} />
            <div className="space-y-7 px-5 pb-8 pt-2">
                <section>
                    <h2 className="text-[13px] font-semibold uppercase tracking-[.08em] text-[#6B6A64]">What&apos;s the job?</h2>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                        {jobTypes.map((j) => (
                            <button
                                key={j}
                                type="button"
                                aria-pressed={job === j}
                                onClick={() => setJob(j)}
                                className={`rounded-full border px-3.5 py-2 text-[14px] font-medium ${job === j ? 'border-[#0E3B2E] bg-[#0E3B2E] text-white' : 'border-[#E4DCCB] bg-[#FFFDF8]'}`}
                            >
                                {j}
                            </button>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="text-[13px] font-semibold uppercase tracking-[.08em] text-[#6B6A64]">When?</h2>
                    <div className="-mx-5 mt-2.5 flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none]">
                        {days.map((d) => (
                            <button
                                key={d.key}
                                type="button"
                                aria-pressed={day === d.key}
                                onClick={() => {
                                    setDay(d.key);
                                    setSlot(null);
                                }}
                                className={`flex w-[58px] shrink-0 flex-col items-center rounded-2xl border py-2.5 ${day === d.key ? 'border-[#16181D] bg-[#16181D] text-white' : 'border-[#E4DCCB] bg-[#FFFDF8]'}`}
                            >
                                <span className={`text-[11px] ${day === d.key ? 'text-white/70' : 'text-[#6B6A64]'}`}>{d.dow}</span>
                                <span className="text-[19px] font-semibold">{d.date}</span>
                            </button>
                        ))}
                    </div>
                    <div className="mt-3 grid grid-cols-3 gap-2">
                        {slots.map((s) => {
                            const taken = takenSlots.includes(s);
                            const on = slot === s;
                            return (
                                <button
                                    key={s}
                                    type="button"
                                    disabled={taken}
                                    aria-pressed={on}
                                    onClick={() => setSlot(s)}
                                    {...(!slot && s === free[2] ? { 'data-guide': true } : {})}
                                    className={`mr-mono h-12 rounded-xl border text-[14px] font-semibold disabled:border-dashed disabled:text-[#B9B2A4] disabled:line-through ${on ? 'border-[#E8693A] bg-[#E8693A] text-white' : 'border-[#E4DCCB] bg-[#FFFDF8]'}`}
                                >
                                    {s}
                                </button>
                            );
                        })}
                    </div>
                </section>

                <section>
                    <h2 className="text-[13px] font-semibold uppercase tracking-[.08em] text-[#6B6A64]">Where?</h2>
                    <div className="mt-2.5 flex items-center gap-3 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-3.5">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EFE4]">
                            <MapPin size={18} className="text-[#E8693A]" />
                        </span>
                        <span className="flex-1 text-[14px]">
                            <span className="block font-semibold">Home · Kilimani</span>
                            <span className="text-[12px] text-[#6B6A64]">Argwings Kodhek Rd, Apt 4B · gate code at reception</span>
                        </span>
                        <span className="text-[13px] font-semibold text-[#0E3B2E]">Edit</span>
                    </div>
                </section>

                <div className="rounded-2xl bg-[#0E3B2E]/[.06] p-4 text-[13px] leading-snug">
                    <p className="font-semibold">Estimate: {kes(p.rate)}</p>
                    <p className="mt-0.5 text-[#3B3D42]">Covers call-out and the first hour. Parts and extra time are agreed on site before any work starts.</p>
                </div>
            </div>
        </Screen>
    );
}

/* ───────────────────────── pay (M-Pesa) ───────────────────────── */

function StkPush({ amount, onDone }) {
    const [pin, setPin] = useState(0);
    useEffect(() => {
        if (pin >= 4) {
            const id = setTimeout(onDone, 700);
            return () => clearTimeout(id);
        }
        const id = setTimeout(() => setPin((n) => n + 1), pin === 0 ? 900 : 320);
        return () => clearTimeout(id);
    }, [pin, onDone]);
    return (
        <div className="fixed inset-[10px] z-40 flex items-center justify-center rounded-[48px] bg-black/45 px-8" role="dialog" aria-label="M-Pesa prompt">
            <div className="w-full rounded-2xl bg-[#2b2b2b] p-5 text-white shadow-2xl">
                <p className="text-[12px] font-semibold tracking-[.12em] text-white/60">SIM TOOLKIT · M-PESA</p>
                <p className="mt-3 text-[15px] leading-snug">
                    Do you want to pay Ksh{amount.toLocaleString('en-KE')}.00 to MERIDIAN LTD account MR-4821?
                </p>
                <p className="mt-4 text-[13px] text-white/70">Enter M-PESA PIN:</p>
                <div className="mt-2 flex gap-3">
                    {[0, 1, 2, 3].map((i) => (
                        <span key={i} className={`h-3 w-3 rounded-full ${i < pin ? 'bg-white' : 'border border-white/40'}`} />
                    ))}
                </div>
                <div className="mt-5 flex justify-end gap-6 text-[14px] font-semibold text-[#7fd48a]">
                    <span className="text-white/50">Cancel</span>
                    <span className={pin >= 4 ? 'opacity-100' : 'opacity-40'}>Send</span>
                </div>
                <p className="mt-3 text-[10px] text-white/40">Demo — no PIN is entered or sent.</p>
            </div>
        </div>
    );
}

function Pay({ route, go }) {
    const p = findProvider(route.id);
    const day = days[route.day ?? 1];
    const slot = route.slot ?? '14:00';
    const job = route.job ?? jobTypes[0];
    const total = p.rate + FEE;
    const [method, setMethod] = useState('mpesa');
    const [stage, setStage] = useState('review');

    if (stage === 'paid') {
        return (
            <Screen go={go} footer={<PrimaryButton guide onClick={() => go({ name: 'track', id: p.id })}>Track booking</PrimaryButton>}>
                <div className="flex flex-col items-center px-6 pb-8 pt-14 text-center">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2F9E6E]">
                        <Check size={40} strokeWidth={3} className="text-white" />
                    </span>
                    <h1 className="mr-display mt-6 text-[28px] font-semibold">You&apos;re booked.</h1>
                    <MeridianLine className="mx-auto mt-3" />
                    <p className="mt-3 text-[15px] text-[#3B3D42]">
                        {p.name.split(' ')[0]} is coming {day.key === 0 ? 'today' : day.long} at {slot}.
                    </p>
                    <div className="mt-7 w-full rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-4 text-left text-[13px]">
                        <p className="flex justify-between"><span className="text-[#6B6A64]">M-Pesa code</span><span className="mr-mono font-semibold">SKL4H2X9QP</span></p>
                        <p className="mt-2 flex justify-between"><span className="text-[#6B6A64]">Paid</span><span className="mr-mono font-semibold">{kes(total)}</span></p>
                        <p className="mt-3 flex items-start gap-2 border-t border-[#E4DCCB] pt-3 text-[12px] text-[#3B3D42]">
                            <ShieldCheck size={14} className="mt-px shrink-0 text-[#0E3B2E]" />
                            Held by Meridian. {p.name.split(' ')[0]} is paid when you mark the job done.
                        </p>
                    </div>
                </div>
            </Screen>
        );
    }

    return (
        <Screen
            go={go}
            footer={
                <PrimaryButton guide tone={method === 'mpesa' ? 'mpesa' : 'forest'} disabled={stage !== 'review'} onClick={() => setStage('stk')}>
                    {method === 'mpesa' ? `Pay ${kes(total)} with M-PESA` : `Pay ${kes(total)} by card`}
                </PrimaryButton>
            }
        >
            <TopBar onBack={() => go({ name: 'book', id: p.id })} title="Confirm & pay" />
            <div className="space-y-5 px-5 pb-8 pt-2">
                <div className="rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-4">
                    <div className="flex items-center gap-3">
                        <Avatar name={p.name} size={44} />
                        <span>
                            <span className="block text-[15px] font-semibold">{p.name}</span>
                            <span className="text-[13px] text-[#6B6A64]">{job}</span>
                        </span>
                    </div>
                    <div className="mt-4 space-y-2 border-t border-[#E4DCCB] pt-3 text-[13px]">
                        <p className="flex items-center gap-2"><CalendarDays size={14} className="text-[#6B6A64]" /> {day.long} · {slot}</p>
                        <p className="flex items-center gap-2"><MapPin size={14} className="text-[#6B6A64]" /> Argwings Kodhek Rd, Apt 4B</p>
                    </div>
                </div>

                <dl className="space-y-2 rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-4 text-[14px]">
                    <div className="flex justify-between"><dt className="text-[#6B6A64]">Call-out + first hour</dt><dd className="mr-mono">{kes(p.rate)}</dd></div>
                    <div className="flex justify-between"><dt className="text-[#6B6A64]">Meridian fee</dt><dd className="mr-mono">{kes(FEE)}</dd></div>
                    <div className="flex justify-between border-t border-[#E4DCCB] pt-2 font-semibold"><dt>Total</dt><dd className="mr-mono">{kes(total)}</dd></div>
                </dl>

                <fieldset>
                    <legend className="text-[13px] font-semibold uppercase tracking-[.08em] text-[#6B6A64]">Pay with</legend>
                    <div className="mt-2.5 space-y-2">
                        {[
                            ['mpesa', 'M-PESA', customer.phone],
                            ['card', 'Card', 'Visa, Mastercard'],
                        ].map(([id, label, sub]) => (
                            <label
                                key={id}
                                className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-[#FFFDF8] p-3.5 ${method === id ? 'border-[#16181D]' : 'border-[#E4DCCB]'}`}
                            >
                                <input type="radio" name="method" checked={method === id} onChange={() => setMethod(id)} className="sr-only" />
                                <span
                                    className="flex h-9 w-12 items-center justify-center rounded-lg text-[10px] font-black text-white"
                                    style={{ background: id === 'mpesa' ? M.mpesa : M.ink }}
                                >
                                    {id === 'mpesa' ? 'M-PESA' : 'CARD'}
                                </span>
                                <span className="flex-1 text-[14px]">
                                    <span className="block font-semibold">{label}</span>
                                    <span className="text-[12px] text-[#6B6A64]">{sub}</span>
                                </span>
                                <span className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${method === id ? 'border-[#16181D]' : 'border-[#E4DCCB]'}`}>
                                    {method === id && <span className="h-2.5 w-2.5 rounded-full bg-[#16181D]" />}
                                </span>
                            </label>
                        ))}
                    </div>
                </fieldset>

                <p className="flex items-start gap-2 text-[12px] leading-snug text-[#3B3D42]">
                    <ShieldCheck size={14} className="mt-px shrink-0 text-[#0E3B2E]" />
                    You&apos;ll get a prompt on your phone. Meridian holds the money until you confirm the job is done.
                </p>
            </div>
            {stage === 'stk' && <StkPush amount={total} onDone={() => setStage('paid')} />}
        </Screen>
    );
}

/* ───────────────────────── track ───────────────────────── */

const ROUTE = [
    [60, 210],
    [110, 190],
    [118, 120],
    [175, 112],
    [235, 118],
    [262, 168],
];

const along = (pts, t) => {
    const segs = pts.slice(1).map((p, i) => Math.hypot(p[0] - pts[i][0], p[1] - pts[i][1]));
    let d = Math.max(0, Math.min(1, t)) * segs.reduce((a, b) => a + b, 0);
    for (let i = 0; i < segs.length; i++) {
        if (d <= segs[i]) {
            const k = d / segs[i];
            return [pts[i][0] + (pts[i + 1][0] - pts[i][0]) * k, pts[i][1] + (pts[i + 1][1] - pts[i][1]) * k];
        }
        d -= segs[i];
    }
    return pts[pts.length - 1];
};

function Track({ route, go }) {
    const p = findProvider(route.id);
    const total = p.rate + FEE;
    const [stage, setStage] = useState(0);
    const [t, setT] = useState(0);
    const [released, setReleased] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        const timers = [setTimeout(() => setStage(1), 900), setTimeout(() => setStage(2), 4200), setTimeout(() => setStage(3), 5400), setTimeout(() => setStage(4), 6600)];
        return () => timers.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (stage !== 1) return undefined;
        const id = setInterval(() => setT((x) => Math.min(1, x + 0.03)), 90);
        return () => clearInterval(id);
    }, [stage]);

    const pos = stage >= 2 ? ROUTE[ROUTE.length - 1] : along(ROUTE, t);
    const eta = Math.max(1, Math.round(12 * (1 - t)));
    const headline = released
        ? 'All done — thank you!'
        : stage === 1
          ? `Arriving in ${eta} min`
          : trackStages[stage].label;

    return (
        <Screen tab="track" go={go}>
            <TopBar title="Booking MR-4821" />
            <div className="relative">
                <StreetMap
                    height={250}
                    route={ROUTE}
                    mover={pos}
                    pins={[{ id: 'home', x: 262, y: 168, w: 54, label: 'Home', home: true }]}
                />
            </div>
            <div className="-mt-6 relative space-y-4 px-4 pb-6">
                <div className="rounded-3xl border border-[#E4DCCB] bg-[#FFFDF8] p-4 shadow-[0_10px_30px_rgba(22,24,29,.08)]">
                    <div className="flex items-center gap-3">
                        <Avatar name={p.name} size={48} />
                        <span className="flex-1">
                            <span className="mr-display block text-[20px] font-semibold leading-tight">{headline}</span>
                            <span className="text-[13px] text-[#6B6A64]">{p.name} · {p.trade}</span>
                        </span>
                        <span className="flex gap-2">
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5EFE4]"><MessageCircle size={17} /></span>
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0E3B2E] text-white"><Phone size={17} /></span>
                        </span>
                    </div>
                    <ol className="mt-4 space-y-0" aria-label="Booking progress">
                        {trackStages.map((s, i) => {
                            const done = i < stage || (released && i === stage);
                            const now = i === stage && !released;
                            return (
                                <li key={s.id} className="relative flex gap-3 pb-3 last:pb-0">
                                    {i < trackStages.length - 1 && (
                                        <span className="absolute left-[9px] top-5 h-[calc(100%-12px)] w-0.5" style={{ background: i < stage ? M.forest : M.line }} />
                                    )}
                                    <span
                                        className="relative z-10 mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2"
                                        style={{ borderColor: done || now ? (now ? M.sun : M.forest) : M.line, background: done ? M.forest : M.paper }}
                                    >
                                        {done && <Check size={11} strokeWidth={3} className="text-white" />}
                                        {now && <span className="h-2 w-2 animate-pulse rounded-full" style={{ background: M.sun }} />}
                                    </span>
                                    <span className={`text-[13px] ${i > stage ? 'text-[#B9B2A4]' : ''}`}>
                                        <span className="font-semibold">{s.label}</span>
                                        {now && <span className="block text-[12px] text-[#6B6A64]">{s.detail}</span>}
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </div>

                {stage === 4 && !released && (
                    <PrimaryButton guide onClick={() => setReleased(true)}>
                        Job done — release {kes(total)}
                    </PrimaryButton>
                )}
                {stage < 4 && (
                    <p className="flex items-center gap-2 rounded-2xl bg-[#0E3B2E]/[.06] p-3.5 text-[12px] text-[#3B3D42]">
                        <ShieldCheck size={14} className="shrink-0 text-[#0E3B2E]" /> {kes(total)} held by Meridian until you confirm.
                    </p>
                )}
                {released && (
                    <div className="rounded-2xl border border-[#E4DCCB] bg-[#FFFDF8] p-4 text-center">
                        <p className="text-[14px] font-semibold">How did {p.name.split(' ')[0]} do?</p>
                        <div className="mt-2 flex justify-center gap-1.5">
                            {[1, 2, 3, 4, 5].map((n) => (
                                <button key={n} type="button" aria-label={`${n} stars`} onClick={() => setRating(n)}>
                                    <Star size={28} className={n <= rating ? 'fill-[#E8693A] text-[#E8693A]' : 'text-[#D8CFBD]'} />
                                </button>
                            ))}
                        </div>
                        <p className="mt-2 text-[12px] text-[#2F9E6E]">
                            {rating ? 'Thanks — review posted.' : `${kes(p.rate)} sent to ${p.name.split(' ')[0]}'s M-Pesa.`}
                        </p>
                    </div>
                )}
            </div>
        </Screen>
    );
}

/* ───────────────────────── pro dashboard ───────────────────────── */

function Pro({ go }) {
    const [online, setOnline] = useState(true);
    const [request, setRequest] = useState('open');
    const [left, setLeft] = useState(45);
    const [withdrawn, setWithdrawn] = useState(false);

    useEffect(() => {
        if (request !== 'open' || left <= 0) return undefined;
        const id = setTimeout(() => setLeft((s) => s - 1), 1000);
        return () => clearTimeout(id);
    }, [request, left]);

    const schedule = [
        { time: '09:00', who: 'Brian O.', job: 'Blocked drain', area: 'Lavington' },
        { time: '11:30', who: 'Mercy A.', job: 'Tank cleaning', area: 'Kileleshwa' },
        ...(request === 'accepted' ? [{ time: '14:00', who: 'Achieng', job: 'Leaking tap', area: 'Kilimani', fresh: true }] : []),
    ];

    return (
        <Screen tab="pro" go={go} dark pro>
            <div className="px-5 pb-6">
                <div className="flex items-center justify-between pt-2">
                    <span className="mr-mono text-[11px] tracking-[.18em] text-white/55">MERIDIAN PRO</span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={online}
                        onClick={() => setOnline((v) => !v)}
                        className="flex items-center gap-2 rounded-full bg-white/10 py-1 pl-3 pr-1 text-[12px] font-semibold"
                    >
                        {online ? 'Online' : 'Offline'}
                        <span className={`flex h-6 w-10 items-center rounded-full p-0.5 transition-colors ${online ? 'bg-[#2F9E6E]' : 'bg-white/20'}`}>
                            <span className={`h-5 w-5 rounded-full bg-white transition-transform ${online ? 'translate-x-4' : ''}`} />
                        </span>
                    </button>
                </div>
                <h1 className="mr-display mt-5 text-[30px] font-semibold leading-tight">Habari, Wanjiru.</h1>
                <MeridianLine className="mt-3" />

                <div className="mt-5 rounded-3xl bg-white/[.07] p-4">
                    <p className="text-[12px] text-white/60">This week</p>
                    <p className="mr-mono mt-1 text-[30px] font-semibold">KES 18,400</p>
                    <div className="mt-3 flex h-16 items-end gap-2" aria-hidden="true">
                        {proWeek.map(([d, v], i) => (
                            <span key={i} className="flex flex-1 flex-col items-center gap-1">
                                <span className="w-full rounded-md" style={{ height: `${v * 48}px`, background: i === 4 ? M.sun : 'rgba(255,255,255,.25)' }} />
                                <span className="text-[10px] text-white/50">{d}</span>
                            </span>
                        ))}
                    </div>
                    <button
                        type="button"
                        onClick={() => setWithdrawn(true)}
                        disabled={withdrawn}
                        className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-semibold text-white disabled:opacity-80"
                        style={{ background: withdrawn ? 'rgba(255,255,255,.12)' : M.mpesa }}
                    >
                        {withdrawn ? '✓ Sent to 0722 ••• 410 · SKM1P0A7ZD' : 'Withdraw to M-PESA'}
                    </button>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    {[
                        ['14', 'jobs'],
                        ['6', 'repeat clients'],
                        ['4.9', 'rating'],
                    ].map(([v, k]) => (
                        <div key={k} className="rounded-2xl bg-white/[.07] py-3">
                            <p className="text-[18px] font-semibold">{v}</p>
                            <p className="text-[11px] text-white/55">{k}</p>
                        </div>
                    ))}
                </div>

                {request === 'open' && online && (
                    <div className="mt-5 rounded-3xl border-2 bg-[#FFFDF8] p-4 text-[#16181D]" style={{ borderColor: M.sun }}>
                        <div className="flex items-center justify-between text-[12px] font-semibold">
                            <span style={{ color: M.sun }}>● New request</span>
                            <span className="mr-mono text-[#6B6A64]">expires 0:{String(left).padStart(2, '0')}</span>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <Avatar name="Achieng Odhiambo" size={42} />
                            <span className="flex-1">
                                <span className="block text-[15px] font-semibold">Achieng · Leaking tap</span>
                                <span className="text-[12px] text-[#6B6A64]">Kilimani · 1.2 km · tomorrow 14:00</span>
                            </span>
                            <span className="mr-mono text-[14px] font-semibold">KES 1,500</span>
                        </div>
                        <div className="mt-4 grid grid-cols-[1fr_2fr] gap-2">
                            <button type="button" onClick={() => setRequest('declined')} className="h-11 rounded-xl border border-[#E4DCCB] text-[14px] font-semibold">
                                Decline
                            </button>
                            <button type="button" data-guide onClick={() => setRequest('accepted')} className="h-11 rounded-xl bg-[#0E3B2E] text-[14px] font-semibold text-white">
                                Accept job
                            </button>
                        </div>
                    </div>
                )}
                {request === 'open' && !online && (
                    <p className="mt-5 rounded-2xl bg-white/[.07] p-4 text-center text-[13px] text-white/60">You&apos;re offline — new requests are paused.</p>
                )}

                <h2 className="mr-display mt-6 text-[19px] font-semibold">Today</h2>
                <ul className="mt-2 space-y-2">
                    {schedule.map((s) => (
                        <li
                            key={s.time}
                            className={`flex items-center gap-3 rounded-2xl p-3.5 transition-colors ${s.fresh ? 'bg-[#E8693A]/20' : 'bg-white/[.07]'}`}
                        >
                            <span className="mr-mono w-12 text-[13px] font-semibold">{s.time}</span>
                            <span className="flex-1 text-[13px]">
                                <span className="block font-semibold">{s.job}</span>
                                <span className="text-white/60">
                                    {s.who} · {s.area}
                                </span>
                            </span>
                            {s.fresh && <span className="text-[11px] font-semibold" style={{ color: M.sun }}>new</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Screen>
    );
}

/* ───────────────────────── router ───────────────────────── */

function MeridianReplica({ route, go }) {
    switch (route.name) {
        case 'search':
            return <SearchScreen key={`${route.q}-${route.cat}`} route={route} go={go} />;
        case 'provider':
            return <Provider key={route.id} route={route} go={go} />;
        case 'book':
            return <Book key={route.id} route={route} go={go} />;
        case 'pay':
            return <Pay route={route} go={go} />;
        case 'track':
            return <Track route={route} go={go} />;
        case 'pro':
            return <Pro go={go} />;
        default:
            return <Home go={go} />;
    }
}

export default MeridianReplica;

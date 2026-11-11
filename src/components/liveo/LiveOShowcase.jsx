import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import LiveOReplica from './LiveOReplica.jsx';
import LiveODesign from './LiveODesign.jsx';
import { AMBER, FONT_HREF, LIVEO_ORIGIN, routeUrl, tokens } from '../../data/liveo.js';

const STEP_MS = 7000;
const TICK_MS = 100;

const KNYA_ORDER = { handle: 'knya', serviceId: 'mix-master', tier: 'standard' };

const TOUR = [
    { id: 'home', short: 'landing', title: 'Landing page', caption: 'Editorial type, studio footage and the rotating amber headline word.', route: { name: 'home' } },
    { id: 'discover', short: 'discover', title: 'Discover talent', caption: 'Search and filter creators by role and experience level. Try typing "bass".', route: { name: 'discover' } },
    { id: 'profile', short: 'profile', title: 'Creator profile', caption: 'Demo reels up front (press play), stats, reviews and services.', route: { name: 'profile', handle: 'knya' } },
    { id: 'service', short: 'tiers', title: 'Tiered services', caption: 'Basic, Standard or Premium — scope, delivery and revisions in writing.', route: { name: 'service', handle: 'knya', serviceId: 'mix-master' } },
    { id: 'checkout', short: 'checkout', title: 'Stripe checkout', caption: 'Pay once; the money sits in escrow until the work is approved.', route: { name: 'checkout', ...KNYA_ORDER } },
    { id: 'order', short: 'order', title: 'Order & delivery', caption: 'Live thread, deliverables, revisions — then approve & release.', route: { name: 'order', ...KNYA_ORDER } },
    { id: 'calls', short: 'calls', title: 'Open calls', caption: 'Briefs from studios and labels; creators pitch straight in.', route: { name: 'calls' } },
];

const pad = (n) => String(n).padStart(2, '0');
const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const isTyping = (el) => !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const ctrl = `py-1.5 transition-colors hover:text-white ${focusRing}`;

const { fonts } = tokens;
const SCOPED_CSS = `
.lo-root{font-family:${fonts.app};color:#fafafa;-webkit-font-smoothing:antialiased;line-height:1.5}
.lo-root button{cursor:pointer}
.lo-root button:focus-visible,.lo-root a:focus-visible{outline:2px solid ${AMBER};outline-offset:2px}
.lo-display{font-family:${fonts.display}}
.lo-serif{font-family:${fonts.serif}}
.lo-mono{font-family:${fonts.mono}}
.lo-scroll{scrollbar-width:thin;scrollbar-color:#2a2a2a transparent}
@keyframes lo-word{from{opacity:0;filter:blur(8px);transform:translateY(.25em)}to{opacity:1;filter:blur(0);transform:none}}
.lo-word-in{animation:lo-word .6s ease-out both}
@keyframes lo-ring{0%,100%{box-shadow:0 0 0 2px ${AMBER},0 0 0 6px ${AMBER}33}50%{box-shadow:0 0 0 2px ${AMBER},0 0 0 11px ${AMBER}00}}
.lo-guided [data-guide]{animation:lo-ring 1.6s ease-in-out infinite;position:relative;z-index:1}
@media (prefers-reduced-motion:reduce){.lo-word-in,.lo-guided [data-guide]{animation:none}.lo-guided [data-guide]{box-shadow:0 0 0 2px ${AMBER}}}
`;

function useFonts() {
    useEffect(() => {
        if (document.getElementById('liveo-fonts')) return;
        const link = document.createElement('link');
        link.id = 'liveo-fonts';
        link.rel = 'stylesheet';
        link.href = FONT_HREF;
        document.head.appendChild(link);
    }, []);
}

// Width of the stage in CSS px → the virtual page width we lay the replica out at.
const layoutFor = (w) => {
    if (w < 600) return { vw: 390, vh: 720, compact: true };
    if (w < 900) return { vw: 960, vh: 720, compact: false };
    return { vw: 1180, vh: 740, compact: false };
};

function LiveOShowcase({ project, toggleId, onClose }) {
    useFonts();
    const [reduceMotion] = useState(prefersReducedMotion);
    const [view, setView] = useState('demo');
    const [history, setHistory] = useState({ stack: [TOUR[0].route], i: 0 });
    const [autoplay, setAutoplay] = useState(!reduceMotion);
    const [hover, setHover] = useState(false);
    const [guide, setGuide] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const [stageW, setStageW] = useState(0);
    const panelRef = useRef(null);
    const stageRef = useRef(null);
    const scrollRef = useRef(null);

    const route = history.stack[history.i];
    const step = TOUR.findIndex((s) => s.id === route.name);
    const current = TOUR[Math.max(step, 0)];

    const go = useCallback((r) => {
        setElapsed(0);
        setHistory((h) => ({ stack: [...h.stack.slice(0, h.i + 1), r], i: h.i + 1 }));
    }, []);
    const goStep = useCallback((i) => go(TOUR[(i + TOUR.length) % TOUR.length].route), [go]);
    const back = () => setHistory((h) => ({ ...h, i: Math.max(0, h.i - 1) }));
    const forward = () => setHistory((h) => ({ ...h, i: Math.min(h.stack.length - 1, h.i + 1) }));
    // A user-driven navigation inside the replica ends the autoplay tour.
    const userGo = useCallback(
        (r) => {
            setAutoplay(false);
            go(r);
        },
        [go]
    );

    const close = useCallback(() => {
        const hadFocus = panelRef.current?.contains(document.activeElement);
        onClose();
        if (hadFocus) requestAnimationFrame(() => document.getElementById(toggleId)?.focus());
    }, [onClose, toggleId]);

    useLayoutEffect(() => {
        const el = stageRef.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(([entry]) => setStageW(entry.contentRect.width));
        ro.observe(el);
        setStageW(el.getBoundingClientRect().width);
        return () => ro.disconnect();
    }, []);

    useEffect(() => {
        scrollRef.current?.scrollTo({ top: 0 });
    }, [route, view]);

    useEffect(() => {
        if (!autoplay || hover || view !== 'demo') return undefined;
        const id = setInterval(() => setElapsed((t) => t + TICK_MS), TICK_MS);
        return () => clearInterval(id);
    }, [autoplay, hover, view]);

    useEffect(() => {
        if (elapsed >= STEP_MS) goStep(Math.max(step, 0) + 1);
    }, [elapsed, goStep, step]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            if (e.key === 'Escape') close();
            if (stageRef.current?.contains(e.target) || view !== 'demo') return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                e.preventDefault();
                setAutoplay(false);
                goStep(Math.max(step, 0) + (e.key === 'ArrowRight' ? 1 : -1));
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [close, goStep, step, view]);

    useEffect(() => {
        panelRef.current?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }, [reduceMotion]);

    const { vw, vh, compact } = layoutFor(stageW || 1180);
    const scale = stageW ? stageW / vw : 1;
    const url = view === 'demo' ? `liveo.space${routeUrl(route)}` : 'live.o! — design system';

    const tabClass = (on) =>
        `px-2 py-1 transition-colors ${focusRing} ${on ? 'bg-white text-black' : 'text-[#8f8f8f] hover:text-white'}`;

    return (
        <div
            ref={panelRef}
            id={`demo-${project.id}`}
            role="region"
            aria-label={`${project.name} demo and design`}
            className="relative left-1/2 mt-4 w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 scroll-mb-12 border border-[#2e2e2e] bg-[#050505]"
        >
            <style>{SCOPED_CSS}</style>

            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[#2e2e2e] px-3 text-xs leading-[22px] text-[#8f8f8f]">
                <span className="truncate py-1">~/projects/{project.id} — ./open</span>
                <div role="tablist" aria-label="View" className="flex gap-1 py-1">
                    <button type="button" role="tab" aria-selected={view === 'demo'} onClick={() => setView('demo')} className={tabClass(view === 'demo')}>
                        [1] demo
                    </button>
                    <button type="button" role="tab" aria-selected={view === 'design'} onClick={() => setView('design')} className={tabClass(view === 'design')}>
                        [2] design
                    </button>
                </div>
                <span className="flex gap-4">
                    <a href={LIVEO_ORIGIN} target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${ctrl}`}>
                        live site ↗
                    </a>
                    <button type="button" onClick={close} aria-label="Close demo" className={`whitespace-nowrap ${ctrl}`}>
                        [esc] close
                    </button>
                </span>
            </div>

            {/* browser chrome */}
            <div className="flex items-center gap-3 border-b border-[#1c1c1c] bg-[#0b0b0b] px-3 py-2 text-[12px] text-[#8f8f8f]">
                <span aria-hidden="true" className="hidden gap-1.5 sm:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </span>
                {view === 'demo' && (
                    <span className="flex gap-2">
                        <button type="button" onClick={back} disabled={history.i === 0} aria-label="Back" className={`px-1 disabled:opacity-30 ${ctrl}`}>←</button>
                        <button type="button" onClick={forward} disabled={history.i === history.stack.length - 1} aria-label="Forward" className={`px-1 disabled:opacity-30 ${ctrl}`}>→</button>
                        <button type="button" onClick={() => userGo({ name: 'home' })} aria-label="Home" className={`px-1 ${ctrl}`}>⌂</button>
                    </span>
                )}
                <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#151515] px-3 py-1">
                    <span aria-hidden="true">{view === 'demo' ? '🔒' : '◆'}</span>
                    <span className="truncate text-[#cfcfcf]">{url}</span>
                </span>
                <span className="hidden whitespace-nowrap sm:inline">replica · demo data</span>
            </div>

            <div
                ref={stageRef}
                className="relative overflow-hidden bg-[#030303]"
                style={{ height: Math.round(vh * scale) }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
            >
                <div
                    ref={scrollRef}
                    className={`lo-root lo-scroll absolute left-0 top-0 overflow-y-auto overflow-x-hidden ${guide && view === 'demo' ? 'lo-guided' : ''}`}
                    style={{ width: vw, height: vh, transform: `scale(${scale})`, transformOrigin: '0 0' }}
                    onWheel={() => autoplay && setAutoplay(false)}
                    onPointerDown={() => autoplay && setAutoplay(false)}
                >
                    {view === 'demo' ? (
                        <LiveOReplica route={route} go={userGo} compact={compact} animate={!reduceMotion} />
                    ) : (
                        <LiveODesign compact={compact} />
                    )}
                </div>
            </div>

            {view === 'demo' ? (
                <>
                    <div aria-live="polite" className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 px-4 pt-3.5">
                        <span className="text-[#8f8f8f]">
                            <span aria-hidden="true">{step < 0 ? '--' : pad(step + 1)}/{pad(TOUR.length)}</span>
                            <span className="sr-only">Step {step + 1} of {TOUR.length}:</span>
                        </span>
                        <div>
                            <p>{current.title}</p>
                            <p className="text-[#8f8f8f]">{current.caption}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 px-4 pb-1 pt-4">
                        {TOUR.map((s, i) => {
                            const fill = i < step ? 100 : i === step ? (autoplay ? Math.min(100, (elapsed / STEP_MS) * 100) : 100) : 0;
                            return (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => {
                                        setAutoplay(false);
                                        goStep(i);
                                    }}
                                    aria-label={`Step ${i + 1}: ${s.title}`}
                                    aria-current={i === step ? 'step' : undefined}
                                    className={`min-w-0 flex-1 py-1.5 text-left text-xs leading-[18px] transition-colors hover:text-white ${focusRing}`}
                                    style={{ color: i <= step ? '#fff' : '#5a5a5a' }}
                                >
                                    <span className="relative mb-2 block h-0.5 overflow-hidden bg-[#262626]">
                                        <span
                                            className="absolute inset-y-0 left-0 bg-white"
                                            style={{ width: `${fill}%`, transition: i === step && elapsed > 0 ? `width ${TICK_MS}ms linear` : 'none' }}
                                        />
                                    </span>
                                    <span className="hidden truncate sm:block">{pad(i + 1)} {s.short}</span>
                                    <span className="block truncate sm:hidden">{pad(i + 1)}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-x-4 px-4 pb-2 pt-1 text-xs leading-[22px] text-[#8f8f8f]">
                        <div className="flex gap-4">
                            <button type="button" onClick={() => { setAutoplay(false); goStep(Math.max(step, 0) - 1); }} className={ctrl}>
                                ← prev
                            </button>
                            <button
                                type="button"
                                onClick={() => setAutoplay((v) => !v)}
                                aria-label={autoplay ? 'Pause tour' : 'Play tour'}
                                className={`min-w-[9ch] text-left text-white ${ctrl}`}
                            >
                                {autoplay ? (hover ? '❚❚ held' : '❚❚ pause') : '▶ autoplay'}
                            </button>
                            <button type="button" onClick={() => { setAutoplay(false); goStep(Math.max(step, 0) + 1); }} className={ctrl}>
                                next →
                            </button>
                        </div>
                        <span className="flex gap-4">
                            <button type="button" onClick={() => setGuide((g) => !g)} aria-pressed={guide} className={ctrl}>
                                <span style={{ color: guide ? AMBER : undefined }}>◎</span> hints {guide ? 'on' : 'off'}
                            </button>
                            <span aria-hidden="true" className="hidden md:inline">click anything · ←/→ step</span>
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap items-center justify-between gap-x-4 px-4 py-3 text-xs leading-[22px] text-[#8f8f8f]">
                    <span>Type, colour and components taken from liveo.space&apos;s production CSS. Click a swatch to copy it.</span>
                    <button type="button" onClick={() => setView('demo')} className={`text-white ${ctrl}`}>
                        see it in the demo →
                    </button>
                </div>
            )}
        </div>
    );
}

export default LiveOShowcase;

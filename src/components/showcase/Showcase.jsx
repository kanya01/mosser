import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

// Shared shell for the project "demo + design" panels: terminal-style header with
// tabs, a browser or phone frame around a scaled replica, and a guided tour with
// autoplay. Each project supplies its tour, replica and design sheet.

const STEP_MS = 7000;
const TICK_MS = 100;

const pad = (n) => String(n).padStart(2, '0');
const prefersReducedMotion = () =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
const isTyping = (el) => !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

const focusRing = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';
const ctrl = `py-1.5 transition-colors hover:text-white ${focusRing}`;

const PHONE_W = 390;
const PHONE_H = 844;
const BEZEL = 10;

const shellCss = (accent) => `
.sc-root{-webkit-font-smoothing:antialiased;line-height:1.5}
.sc-root button{cursor:pointer}
.sc-root button:focus-visible,.sc-root a:focus-visible,.sc-root label:focus-within{outline:2px solid ${accent};outline-offset:2px}
.sc-scroll{scrollbar-width:thin;scrollbar-color:rgba(127,127,127,.35) transparent}
@keyframes sc-ring{0%,100%{box-shadow:0 0 0 2px ${accent},0 0 0 6px ${accent}33}50%{box-shadow:0 0 0 2px ${accent},0 0 0 11px ${accent}00}}
.sc-guided [data-guide]{animation:sc-ring 1.6s ease-in-out infinite;position:relative;z-index:1}
@media (prefers-reduced-motion:reduce){.sc-guided [data-guide]{animation:none;box-shadow:0 0 0 2px ${accent}}}
`;

function useStylesheet(id, href) {
    useEffect(() => {
        if (!href || document.getElementById(id)) return;
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    }, [id, href]);
}

function useWidth(ref) {
    const [w, setW] = useState(0);
    useLayoutEffect(() => {
        const el = ref.current;
        if (!el) return undefined;
        const ro = new ResizeObserver(([entry]) => setW(entry.contentRect.width));
        ro.observe(el);
        setW(el.getBoundingClientRect().width);
        return () => ro.disconnect();
    }, [ref]);
    return w;
}

const browserLayout = (w) => {
    if (w < 600) return { vw: 390, vh: 720, compact: true };
    if (w < 900) return { vw: 960, vh: 720, compact: false };
    return { vw: 1180, vh: 740, compact: false };
};

function Showcase({
    project,
    toggleId,
    onClose,
    tour,
    renderDemo,
    renderDesign,
    urlFor,
    designLabel,
    liveUrl,
    fontId,
    fontHref,
    css = '',
    rootClass = '',
    accent = '#ffffff',
    stageBg = '#030303',
    chromeNote = 'replica · demo data',
    designNote,
    frame = 'browser',
}) {
    useStylesheet(fontId, fontHref);
    const [reduceMotion] = useState(prefersReducedMotion);
    const [view, setView] = useState('demo');
    const [history, setHistory] = useState({ stack: [tour[0].route], i: 0 });
    const [autoplay, setAutoplay] = useState(!reduceMotion);
    const [hover, setHover] = useState(false);
    const [guide, setGuide] = useState(true);
    const [elapsed, setElapsed] = useState(0);
    const panelRef = useRef(null);
    const stageRef = useRef(null);
    const scrollRef = useRef(null);
    const stageW = useWidth(stageRef);

    const route = history.stack[history.i];
    const step = tour.findIndex((s) => s.id === route.name);
    const current = tour[Math.max(step, 0)];

    const go = useCallback((r) => {
        setElapsed(0);
        setHistory((h) => ({ stack: [...h.stack.slice(0, h.i + 1), r], i: h.i + 1 }));
    }, []);
    const goStep = useCallback((i) => go(tour[(i + tour.length) % tour.length].route), [go, tour]);
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

    const width = stageW || 1180;
    const phone = frame === 'phone' && view === 'demo';
    const phoneSplit = phone && width >= 760;

    // Geometry: the replica is laid out at a fixed virtual size and scaled to fit.
    let vw;
    let vh;
    let compact;
    let scale;
    let stageH;
    if (phone) {
        vw = PHONE_W;
        vh = PHONE_H;
        compact = true;
        scale = phoneSplit ? 640 / (PHONE_H + BEZEL * 2) : Math.min(1, (width - 32) / (PHONE_W + BEZEL * 2));
        stageH = Math.round((PHONE_H + BEZEL * 2) * scale) + 48;
    } else {
        ({ vw, vh, compact } = browserLayout(width));
        scale = width / vw;
        stageH = Math.round(vh * scale);
    }

    const replicaClass = `sc-root sc-scroll ${rootClass} ${guide && view === 'demo' ? 'sc-guided' : ''}`;
    const stopAutoplay = () => autoplay && setAutoplay(false);
    const content =
        view === 'demo' ? renderDemo({ route, go: userGo, compact, animate: !reduceMotion }) : renderDesign({ compact });

    const tabClass = (on) =>
        `px-2 py-1 transition-colors ${focusRing} ${on ? 'bg-white text-black' : 'text-[#8f8f8f] hover:text-white'}`;

    const caption = (
        <>
            <p>{current.title}</p>
            <p className="text-[#8f8f8f]">{current.caption}</p>
        </>
    );

    return (
        <div
            ref={panelRef}
            id={`demo-${project.id}`}
            role="region"
            aria-label={`${project.name} demo and design`}
            className="relative left-1/2 mt-4 w-[min(1180px,calc(100vw-2rem))] -translate-x-1/2 scroll-mb-12 border border-[#2e2e2e] bg-[#050505]"
        >
            <style>{shellCss(accent) + css}</style>

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
                    {liveUrl && (
                        <a href={liveUrl} target="_blank" rel="noopener noreferrer" className={`whitespace-nowrap ${ctrl}`}>
                            live site ↗
                        </a>
                    )}
                    <button type="button" onClick={close} aria-label="Close demo" className={`whitespace-nowrap ${ctrl}`}>
                        [esc] close
                    </button>
                </span>
            </div>

            {/* address bar */}
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
                        <button type="button" onClick={() => userGo(tour[0].route)} aria-label="Home" className={`px-1 ${ctrl}`}>⌂</button>
                    </span>
                )}
                <span className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-[#151515] px-3 py-1">
                    <span aria-hidden="true">{view === 'demo' ? (frame === 'phone' ? '▯' : '🔒') : '◆'}</span>
                    <span className="truncate text-[#cfcfcf]">{view === 'demo' ? urlFor(route) : designLabel}</span>
                </span>
                <span className="hidden whitespace-nowrap sm:inline">{chromeNote}</span>
            </div>

            <div
                ref={stageRef}
                className="relative overflow-hidden"
                style={{ height: stageH, background: phone ? '#0a0a0a' : stageBg }}
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
            >
                {phone ? (
                    <div className={`flex h-full items-center ${phoneSplit ? 'justify-between gap-8 px-10' : 'justify-center'}`}>
                        {phoneSplit && (
                            <div aria-live="polite" className="w-[min(30%,300px)] self-center text-[13px] leading-[1.85]">
                                <p className="mb-3 text-[#8f8f8f]">
                                    {pad(Math.max(step, 0) + 1)}/{pad(tour.length)}
                                </p>
                                <p className="text-[18px] leading-snug text-white">{current.title}</p>
                                <p className="mt-2 text-[#8f8f8f]">{current.caption}</p>
                            </div>
                        )}
                        <div
                            className="relative shrink-0"
                            style={{ width: (PHONE_W + BEZEL * 2) * scale, height: (PHONE_H + BEZEL * 2) * scale }}
                        >
                            <div
                                className="absolute left-0 top-0 overflow-hidden bg-[#111] shadow-[0_30px_80px_rgba(0,0,0,.6)]"
                                style={{
                                    width: PHONE_W + BEZEL * 2,
                                    height: PHONE_H + BEZEL * 2,
                                    padding: BEZEL,
                                    borderRadius: 58,
                                    transform: `scale(${scale})`,
                                    transformOrigin: '0 0',
                                    boxShadow: 'inset 0 0 0 2px #2a2a2a',
                                }}
                            >
                                <span aria-hidden="true" className="absolute left-1/2 top-[22px] z-30 h-[30px] w-[110px] -translate-x-1/2 rounded-full bg-black" />
                                <div
                                    ref={scrollRef}
                                    className={`${replicaClass} relative h-full w-full overflow-y-auto overflow-x-hidden`}
                                    style={{ borderRadius: 48 }}
                                    onWheel={stopAutoplay}
                                    onPointerDown={stopAutoplay}
                                >
                                    {content}
                                </div>
                            </div>
                        </div>
                        {phoneSplit && (
                            <div className="w-[min(30%,300px)] self-center text-[12px] leading-[1.85] text-[#8f8f8f]">
                                <p className="mb-2 text-white">design notes</p>
                                <ul className="space-y-1.5">
                                    {(current.notes || []).map((n) => (
                                        <li key={n} className="pl-4">
                                            <span aria-hidden="true" className="-ml-4 mr-2">-</span>
                                            {n}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ) : (
                    <div
                        ref={scrollRef}
                        className={`${replicaClass} absolute left-0 top-0 overflow-y-auto overflow-x-hidden`}
                        style={{ width: vw, height: vh, transform: `scale(${scale})`, transformOrigin: '0 0' }}
                        onWheel={stopAutoplay}
                        onPointerDown={stopAutoplay}
                    >
                        {content}
                    </div>
                )}
            </div>

            {view === 'demo' ? (
                <>
                    {!phoneSplit && (
                        <div aria-live="polite" className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 px-4 pt-3.5">
                            <span className="text-[#8f8f8f]">
                                <span aria-hidden="true">{step < 0 ? '--' : pad(step + 1)}/{pad(tour.length)}</span>
                                <span className="sr-only">Step {step + 1} of {tour.length}:</span>
                            </span>
                            <div>{caption}</div>
                        </div>
                    )}

                    <div className="flex gap-2 px-4 pb-1 pt-4">
                        {tour.map((s, i) => {
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
                                <span style={{ color: guide ? accent : undefined }}>◎</span> hints {guide ? 'on' : 'off'}
                            </button>
                            <span aria-hidden="true" className="hidden md:inline">
                                {frame === 'phone' ? 'tap anything' : 'click anything'} · ←/→ step
                            </span>
                        </span>
                    </div>
                </>
            ) : (
                <div className="flex flex-wrap items-center justify-between gap-x-4 px-4 py-3 text-xs leading-[22px] text-[#8f8f8f]">
                    <span>{designNote}</span>
                    <button type="button" onClick={() => setView('demo')} className={`text-white ${ctrl}`}>
                        see it in the demo →
                    </button>
                </div>
            )}
        </div>
    );
}

export default Showcase;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import DemoScreen from './DemoScreen.jsx';
import { STEP_MS, TICK_MS } from '../data/projectDemos.js';

const pad = (n) => String(n).padStart(2, '0');

const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const isTyping = (el) =>
    !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable);

const focusRing =
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white';

const ctrlClass = `py-1.5 transition-colors hover:text-white ${focusRing}`;

const SWIPE_PX = 40;

// Inline, autoplaying walkthrough of a project. Owns its own timer so the rest of
// the page doesn't re-render on every tick.
function ProjectDemo({ project, steps, toggleId, onClose }) {
    const [reduceMotion] = useState(prefersReducedMotion);
    const [pos, setPos] = useState({ step: 0, t: 0 });
    const [playing, setPlaying] = useState(!reduceMotion);
    const [hover, setHover] = useState(false);
    const panelRef = useRef(null);
    const touchRef = useRef(null);

    const count = steps.length;
    const { step, t } = pos;
    const current = steps[step];

    const goTo = useCallback((i) => setPos({ step: (i + count) % count, t: 0 }), [count]);
    const stepBy = useCallback((d) => setPos((s) => ({ step: (s.step + d + count) % count, t: 0 })), [count]);

    const close = useCallback(() => {
        // Keep keyboard users in place: if focus was inside the panel, hand it back
        // to the toggle button instead of dropping it on <body>.
        const hadFocus = panelRef.current?.contains(document.activeElement);
        onClose();
        if (hadFocus) requestAnimationFrame(() => document.getElementById(toggleId)?.focus());
    }, [onClose, toggleId]);

    useEffect(() => {
        if (!playing || hover) return undefined;
        const id = setInterval(() => {
            setPos((s) =>
                s.t + TICK_MS >= STEP_MS ? { step: (s.step + 1) % count, t: 0 } : { ...s, t: s.t + TICK_MS }
            );
        }, TICK_MS);
        return () => clearInterval(id);
    }, [playing, hover, count]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || isTyping(e.target)) return;
            if (e.key === 'Escape') {
                close();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stepBy(1);
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stepBy(-1);
            } else if (e.key === ' ' && e.target?.tagName !== 'BUTTON') {
                e.preventDefault();
                setPlaying((v) => !v);
            }
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [close, stepBy]);

    // Bring the whole panel into view when it opens.
    useEffect(() => {
        panelRef.current?.scrollIntoView({ block: 'nearest', behavior: reduceMotion ? 'auto' : 'smooth' });
    }, [reduceMotion]);

    // A paused step with no elapsed time shows its finished state (reduced motion,
    // or stepping while paused), so there's always something to look at.
    const progressOf = (i) => {
        if (i < step) return 1;
        if (i > step) return 0;
        return t === 0 && !playing ? 1 : t / STEP_MS;
    };

    const onTouchStart = (e) => {
        const touch = e.touches[0];
        touchRef.current = { x: touch.clientX, y: touch.clientY };
    };
    const onTouchEnd = (e) => {
        const start = touchRef.current;
        touchRef.current = null;
        if (!start) return;
        const touch = e.changedTouches[0];
        const dx = touch.clientX - start.x;
        const dy = touch.clientY - start.y;
        if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) stepBy(dx < 0 ? 1 : -1);
    };

    const playLabel = playing ? (hover ? '❚❚ held' : '❚❚ pause') : '▶ play';

    return (
        <div
            ref={panelRef}
            id={`demo-${project.id}`}
            role="region"
            aria-label={`${project.name} demo`}
            className="mt-4 scroll-mb-12 border border-[#2e2e2e] bg-[#050505]"
        >
            <div className="flex items-center justify-between gap-3 border-b border-[#2e2e2e] px-3 text-xs leading-[22px] text-[#8f8f8f]">
                <span className="truncate py-1">~/projects/{project.id} — ./demo</span>
                <button
                    type="button"
                    onClick={close}
                    aria-label="Close demo"
                    className={`whitespace-nowrap ${ctrlClass}`}
                >
                    [esc] close
                </button>
            </div>

            <div
                aria-hidden="true"
                className="relative aspect-[4/3] touch-pan-y select-none overflow-hidden border-b border-[#2e2e2e] bg-[#0a0a0a] [container-type:inline-size] sm:aspect-[16/10]"
                onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(true)}
                onPointerLeave={(e) => e.pointerType === 'mouse' && setHover(false)}
                onTouchStart={onTouchStart}
                onTouchEnd={onTouchEnd}
            >
                {steps.map((s, i) => (
                    <div
                        key={s.short}
                        className="absolute inset-0 text-[length:2.2cqw] leading-normal text-white sm:text-[length:1.875cqw]"
                        style={{
                            opacity: i === step ? 1 : 0,
                            transition: reduceMotion ? 'none' : 'opacity .6s ease',
                        }}
                    >
                        <DemoScreen screen={s.screen} p={progressOf(i)} />
                    </div>
                ))}
            </div>

            <div aria-live="polite" className="grid grid-cols-[max-content_minmax(0,1fr)] gap-x-4 px-4 pt-3.5">
                <span className="text-[#8f8f8f]">
                    <span aria-hidden="true">{pad(step + 1)}/{pad(count)}</span>
                    <span className="sr-only">Step {step + 1} of {count}:</span>
                </span>
                <div>
                    <p>{current.title}</p>
                    <p className="text-[#8f8f8f]">{current.caption}</p>
                </div>
            </div>

            <div className="flex gap-2 px-4 pb-1 pt-4">
                {steps.map((s, i) => {
                    const fill = i < step ? 100 : i === step ? Math.min(100, (t / STEP_MS) * 100) : 0;
                    return (
                        <button
                            key={s.short}
                            type="button"
                            onClick={() => goTo(i)}
                            aria-label={`Step ${i + 1}: ${s.title}`}
                            aria-current={i === step ? 'step' : undefined}
                            className={`min-w-0 flex-1 py-1.5 text-left text-xs leading-[18px] transition-colors hover:text-white ${focusRing}`}
                            style={{ color: i <= step ? '#fff' : '#5a5a5a' }}
                        >
                            <span className="relative mb-2 block h-0.5 overflow-hidden bg-[#262626]">
                                <span
                                    className="absolute inset-y-0 left-0 bg-white"
                                    style={{
                                        width: `${fill}%`,
                                        transition: i === step && t > 0 ? `width ${TICK_MS}ms linear` : 'none',
                                    }}
                                />
                            </span>
                            <span className="block truncate">
                                {pad(i + 1)} {s.short}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-x-4 px-4 pb-2 pt-1 text-xs leading-[22px] text-[#8f8f8f]">
                <div className="flex gap-4">
                    <button type="button" onClick={() => stepBy(-1)} className={ctrlClass}>
                        ← prev
                    </button>
                    <button
                        type="button"
                        onClick={() => setPlaying((v) => !v)}
                        aria-label={playing ? 'Pause demo' : 'Play demo'}
                        className={`min-w-[7ch] text-left text-white ${ctrlClass}`}
                    >
                        {playLabel}
                    </button>
                    <button type="button" onClick={() => stepBy(1)} className={ctrlClass}>
                        next →
                    </button>
                </div>
                <span aria-hidden="true" className="[@media(pointer:coarse)]:hidden">
                    ←/→ step · space pause
                </span>
                <span aria-hidden="true" className="hidden [@media(pointer:coarse)]:inline">
                    swipe to step
                </span>
            </div>
        </div>
    );
}

export default ProjectDemo;

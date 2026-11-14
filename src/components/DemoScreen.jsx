import React from 'react';

// Renders one demo screen at progress `p` (0 → 1 through its step).
// Everything inside is sized in em so the whole stage scales with its container.

const clamp01 = (x) => Math.max(0, Math.min(1, x));

const EASE =
    'opacity .35s ease, transform .35s ease, background-color .25s ease, color .25s ease, border-color .25s ease';

// Fade/slide an element in once `on` becomes true.
const enter = (on) => ({
    opacity: on ? 1 : 0,
    transform: on ? 'translateY(0)' : 'translateY(.6em)',
    transition: EASE,
});

const SELECTED = { borderColor: '#fff', background: '#fff', color: '#000' };
const IDLE = { borderColor: '#2e2e2e', background: 'transparent', color: '#fff' };
const pick = (on) => (on ? SELECTED : IDLE);

const HATCH = 'repeating-linear-gradient(135deg,#151515 0 6px,#0d0d0d 6px 12px)';

function Cta({ label, p, at, className = '' }) {
    const on = p >= at;
    return (
        <span
            className={`border border-white px-[1.1em] py-[.5em] ${className}`}
            style={{
                background: on ? '#fff' : 'transparent',
                color: on ? '#000' : '#fff',
                transform: on && p < at + 0.05 ? 'scale(.93)' : 'scale(1)',
                transition: 'all .2s ease',
            }}
        >
            {label}
        </span>
    );
}

function GridScreen({ screen, p }) {
    let n = 0;
    return (
        <>
            {screen.profile && (
                <div className="mb-[1em] flex flex-wrap items-baseline justify-between gap-x-[1em] gap-y-[.5em]">
                    <span>
                        {screen.profile.name} <span className="text-[#8f8f8f]">· {screen.profile.role}</span>
                    </span>
                    <span className="flex gap-[.4em]">
                        {screen.profile.chips.map((chip) => (
                            <span key={chip} className="border border-[#3a3a3a] px-[.5em] text-[#8f8f8f]">
                                {chip}
                            </span>
                        ))}
                    </span>
                </div>
            )}
            <div className="flex flex-col gap-[.9em]">
                {screen.rows.map((row) => (
                    <div key={row.heading}>
                        <p className="mb-[.5em] text-[#8f8f8f]">{row.heading}</p>
                        <div className="grid grid-cols-3 gap-[.6em]">
                            {row.tiles.map((label) => (
                                <div
                                    key={label}
                                    className="relative border border-[#262626]"
                                    style={{ height: screen.tileH, background: HATCH, ...enter(p >= 0.06 + n++ * 0.08) }}
                                >
                                    <span className="absolute bottom-[.4em] left-[.6em] text-[.85em] text-[#8f8f8f]">
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

// Types each command, then reveals its output lines, sharing one budget across the step.
function TermScreen({ screen, p }) {
    const costs = screen.lines.map((l) => (l.cmd ? l.cmd.length + 6 : 5));
    let left = clamp01(p / 0.85) * costs.reduce((a, c) => a + c, 0);

    return (
        <div className="flex flex-col gap-[.2em]">
            {screen.lines.map((line, i) => {
                const started = left > 0;
                const cost = costs[i];
                const prog = clamp01(left / cost);
                left -= cost;

                if (line.cmd) {
                    const n = Math.round(clamp01(prog * (cost / (cost - 6))) * line.cmd.length);
                    return (
                        <span key={i} className="min-h-[1.5em] whitespace-pre-wrap" style={{ opacity: started ? 1 : 0 }}>
                            $ {line.cmd.slice(0, n)}
                            {started && prog < 1 ? '▌' : ''}
                        </span>
                    );
                }
                return (
                    <span
                        key={i}
                        className="min-h-[1.5em] whitespace-pre-wrap"
                        style={{ opacity: prog >= 1 ? 1 : 0, color: line.out.startsWith('✓') ? '#fff' : '#8f8f8f' }}
                    >
                        {line.out}
                    </span>
                );
            })}
        </div>
    );
}

function ChipsScreen({ screen, p }) {
    return (
        <>
            <p className="text-[1.3em]">{screen.heading}</p>
            <p className="mb-[1.2em] text-[#8f8f8f]">{screen.sub}</p>
            <div className="flex flex-wrap gap-[.6em]">
                {screen.chips.map((chip, i) => {
                    const order = screen.picks.indexOf(i);
                    return (
                        <span
                            key={chip}
                            className="border px-[.9em] py-[.45em]"
                            style={{ ...enter(p >= 0.02 + i * 0.025), ...pick(order >= 0 && p >= 0.3 + order * 0.11) }}
                        >
                            {chip}
                        </span>
                    );
                })}
            </div>
            <div className="mt-[1.1em] flex justify-end">
                <Cta label={screen.cta} p={p} at={0.8} />
            </div>
        </>
    );
}

const clock = (secs) => `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

function PlayerScreen({ screen, p }) {
    const playing = p >= 0.16;
    const prog = clamp01((p - 0.16) / 0.84) * 0.04;
    const elapsed = Math.round(prog * screen.mins * 60);
    const total = `${Math.floor(screen.mins / 60)}:${String(screen.mins % 60).padStart(2, '0')}:00`;

    return (
        <>
            <div
                className="relative flex min-h-0 flex-1 items-center justify-center border border-[#262626]"
                style={{ background: HATCH }}
            >
                <span className="absolute left-[.8em] top-[.5em] text-[.85em] text-[#8f8f8f]">film still</span>
                <span style={{ opacity: p >= 0.35 ? 0 : 1, transition: 'opacity .3s ease' }}>
                    <Cta label={playing ? '❚❚' : '▶ play'} p={p} at={0.1} />
                </span>
            </div>
            <div className="mt-[.7em] flex justify-between gap-[1em]">
                <span>
                    {screen.title} <span className="text-[#8f8f8f]">· {screen.meta}</span>
                </span>
                <span className="text-[#8f8f8f]">
                    {clock(elapsed)} / {total}
                </span>
            </div>
            <div className="relative mt-[.5em] h-[.3em] bg-[#262626]">
                <span
                    className="absolute inset-y-0 left-0 bg-white"
                    style={{ width: `${(prog * 100).toFixed(2)}%`, transition: 'width .1s linear' }}
                />
            </div>
        </>
    );
}

const SCREENS = {
    grid: GridScreen,
    term: TermScreen,
    chips: ChipsScreen,
    player: PlayerScreen,
};

function DemoScreen({ screen, p }) {
    const Body = SCREENS[screen.type];
    const toastOn = p >= 0.76;

    return (
        <div className="flex h-full flex-col">
            <div className="flex justify-between gap-[1em] border-b border-[#1f1f1f] px-[1.4em] py-[.55em] text-[.9em] text-[#8f8f8f]">
                <span className="text-white">{screen.app}</span>
                <span>{screen.url}</span>
            </div>
            <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden px-[1.4em] py-[1.2em]">
                {Body && <Body screen={screen} p={p} />}
                {screen.done && (
                    <div
                        className="absolute bottom-[1.2em] left-[1.4em] right-[1.4em] bg-white px-[.9em] py-[.6em] text-black"
                        style={{
                            opacity: toastOn ? 1 : 0,
                            transform: toastOn ? 'translateY(0)' : 'translateY(.8em)',
                            transition: 'opacity .35s ease, transform .35s ease',
                        }}
                    >
                        {screen.done}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DemoScreen;

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

function SearchScreen({ screen, p }) {
    const typed = screen.query.slice(0, Math.round(clamp01(p / 0.32) * screen.query.length));
    return (
        <>
            <div className="mb-[1em] flex items-center gap-[.6em] border border-[#3a3a3a] px-[.8em] py-[.55em]">
                <span className="text-[#8f8f8f]">&gt;</span>
                <span>{typed}</span>
                <span className="inline-block h-[1.1em] w-[.5em] bg-white" style={{ opacity: p < 0.4 ? 1 : 0 }} />
            </div>
            <div className="flex flex-col gap-[.5em]">
                {screen.results.map((r, i) => (
                    <div
                        key={r.name}
                        className="flex justify-between gap-[1em] border px-[.8em] py-[.55em]"
                        style={{ ...enter(p >= 0.4 + i * 0.07), ...pick(i === screen.pick && p >= 0.78) }}
                    >
                        <span className="flex min-w-0 flex-col">
                            <span>{r.name}</span>
                            <span className="opacity-60">{r.meta}</span>
                        </span>
                        <span className="whitespace-nowrap">{r.tag}</span>
                    </div>
                ))}
            </div>
        </>
    );
}

function CompareScreen({ screen, p }) {
    return (
        <>
            {screen.brief && <p className="mb-[.9em] text-[#8f8f8f]">{screen.brief}</p>}
            <div className="grid grid-cols-3 gap-[.7em]">
                {screen.cards.map((c, i) => (
                    <div
                        key={c.name}
                        className="flex flex-col gap-[.3em] border p-[.9em]"
                        style={{ ...enter(p >= 0.04 + i * 0.1), ...pick(i === screen.pick && p >= 0.46) }}
                    >
                        <span className="mb-[.3em] flex justify-between gap-[.5em]">
                            <span>{c.name}</span>
                            {c.badge && <span className="whitespace-nowrap opacity-60">{c.badge}</span>}
                        </span>
                        {c.lines.map((line) => (
                            <span key={line} className="opacity-60">{line}</span>
                        ))}
                        <span className="mt-[.7em]">{c.price}</span>
                    </div>
                ))}
            </div>
            <div className="mt-[1.1em] flex justify-end">
                <Cta label={screen.cta} p={p} at={0.64} />
            </div>
        </>
    );
}

function BookScreen({ screen, p }) {
    return (
        <>
            <p>{screen.label}</p>
            <p className="mb-[1em] text-[#8f8f8f]">{screen.sub}</p>
            <div className="grid grid-cols-3 gap-[.6em]">
                {screen.slots.map((slot, i) => (
                    <span
                        key={slot}
                        className="border p-[.7em] text-center"
                        style={{ ...enter(p >= 0.04 + i * 0.05), ...pick(i === screen.pick && p >= 0.38) }}
                    >
                        {slot}
                    </span>
                ))}
            </div>
            <div className="mt-[1.1em] flex justify-end">
                <Cta label={screen.cta} p={p} at={0.58} />
            </div>
        </>
    );
}

function DashScreen({ screen, p }) {
    const grow = clamp01((p - 0.2) / 0.45);
    return (
        <>
            <div className="mb-[1.2em] grid grid-cols-3 gap-[.7em]">
                {screen.tiles.map((tile, i) => (
                    <div
                        key={tile.k}
                        className="border border-[#2e2e2e] px-[.9em] py-[.6em]"
                        style={enter(p >= 0.04 + i * 0.08)}
                    >
                        <span className="block text-[.85em] text-[#8f8f8f]">{tile.k}</span>
                        <span className="text-[1.7em]">{tile.v}</span>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-[1.6em]">
                <div className="flex flex-col gap-[.35em]">
                    <span className="mb-[.2em] text-[#8f8f8f]">jobs / day</span>
                    {screen.bars.map(([label, value]) => (
                        <div key={label} className="grid grid-cols-[2.5em_minmax(0,1fr)] items-center gap-[.6em]">
                            <span className="text-[#8f8f8f]">{label}</span>
                            <span
                                className="h-[.75em] bg-white"
                                style={{ width: `${(value * grow * 100).toFixed(1)}%`, transition: 'width .2s linear' }}
                            />
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-[.5em]">
                    <span className="text-[#8f8f8f]">activity</span>
                    {screen.feed.map((item, i) => (
                        <span key={item} style={enter(p >= 0.4 + i * 0.12)}>
                            - {item}
                        </span>
                    ))}
                </div>
            </div>
        </>
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

function UploadScreen({ screen, p }) {
    const prog = clamp01((p - 0.2) / 0.45);
    const status = prog < 1 ? `uploading… ${Math.round(prog * 100)}%` : p < 0.74 ? 'parsing…' : screen.parsed;
    return (
        <>
            <div
                className="mb-[1em] border border-dashed px-[1em] py-[2.4em] text-center text-[#8f8f8f]"
                style={{ borderColor: p >= 0.06 && p < 0.2 ? '#fff' : '#3a3a3a', transition: 'border-color .3s' }}
            >
                drop a pdf here, or browse
            </div>
            <div className="border border-[#3a3a3a] px-[.9em] py-[.8em]" style={enter(p >= 0.14)}>
                <div className="flex justify-between gap-[1em]">
                    <span>{screen.file}</span>
                    <span className="text-[#8f8f8f]">{screen.size}</span>
                </div>
                <div className="relative mt-[.7em] h-[.35em] bg-[#262626]">
                    <span
                        className="absolute inset-y-0 left-0 bg-white"
                        style={{ width: `${(prog * 100).toFixed(1)}%`, transition: 'width .1s linear' }}
                    />
                </div>
                <p className="mt-[.6em] text-[#8f8f8f]">{status}</p>
            </div>
        </>
    );
}

const DOC_LINES = ['92%', '86%', '95%', '70%', '90%', '88%', '60%', '94%', '82%', '91%', '75%', '89%', '93%', '55%'];

function ExtractScreen({ screen, p }) {
    const shown = screen.insights.map((_, i) => p >= 0.12 + i * 0.17);
    return (
        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] gap-[1.4em]">
            <div className="flex flex-col gap-[.55em] overflow-hidden border border-[#262626] p-[.9em]">
                <span className="text-[.85em] text-[#8f8f8f]">{screen.file}</span>
                {DOC_LINES.map((width, j) => {
                    const k = screen.highlights.indexOf(j);
                    return (
                        <span
                            key={j}
                            className="h-[.5em] flex-none"
                            style={{
                                width,
                                background: k >= 0 && shown[k] ? '#fff' : '#262626',
                                transition: 'background-color .3s',
                            }}
                        />
                    );
                })}
            </div>
            <div className="flex flex-col gap-[.7em]">
                <span className="text-[#8f8f8f]">key insights</span>
                {screen.insights.map((insight, i) => (
                    <div key={insight} className="grid grid-cols-[2.2em_minmax(0,1fr)]" style={enter(shown[i])}>
                        <span className="text-[#8f8f8f]">{String(i + 1).padStart(2, '0')}</span>
                        <span>{insight}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ChatScreen({ screen, p }) {
    const { question: q, answer: a } = screen;
    const qText = q.text.slice(0, Math.round(clamp01(p / 0.28) * q.text.length));
    const aText = p < 0.45 ? '…' : a.text.slice(0, Math.round(clamp01((p - 0.45) / 0.4) * a.text.length));
    const bubble = 'max-w-[78%] border px-[.9em] py-[.6em]';
    const who = 'mb-[.2em] block text-[.8em] opacity-60';

    return (
        <div className="flex flex-col gap-[1em]">
            <div
                className={`${bubble} self-end`}
                style={{ ...enter(p > 0), borderColor: '#3a3a3a', background: '#141414', color: '#fff' }}
            >
                <span className={who}>{q.who}</span>
                {qText || ' '}
            </div>
            <div className={`${bubble} self-start`} style={{ ...enter(p >= 0.34), ...IDLE }}>
                <span className={who}>{a.who}</span>
                {aText}
            </div>
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
    search: SearchScreen,
    compare: CompareScreen,
    book: BookScreen,
    dash: DashScreen,
    grid: GridScreen,
    term: TermScreen,
    upload: UploadScreen,
    extract: ExtractScreen,
    chat: ChatScreen,
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

import React, { useState } from 'react';
import { palette, reminderCopy, todayWin, totals } from '../../data/smallwins.js';
import { DayDots, GoalChip, Mark, TickButton } from './SmallWinsReplica.jsx';

// Small Wins' concept design system, laid out as a spec sheet in its own style.
// The components here read the same state as the demo, so they are live.

function Label({ children }) {
    return <p className="sw-mono mb-3 text-[11px] tracking-[.2em] text-[#6C6988]">{children}</p>;
}

function Block({ label, title, children, className = '' }) {
    return (
        <section className={`border-t border-[#DFDBEE] py-10 ${className}`}>
            <Label>{label}</Label>
            <h2 className="sw-display mb-6 text-[30px] font-medium tracking-[-0.015em]">{title}</h2>
            {children}
        </section>
    );
}

function Card({ children, className = '' }) {
    return <div className={`rounded-[22px] border border-[#DFDBEE] bg-[#FDFCFF] p-6 ${className}`}>{children}</div>;
}

function Spec({ children }) {
    return <p className="sw-mono mt-4 text-[10.5px] leading-relaxed text-[#6C6988]">{children}</p>;
}

function Swatch({ c }) {
    const [copied, setCopied] = useState(false);
    const dark = ['ink', 'iris', 'muted', 'leaf'].includes(c.name);
    return (
        <button
            type="button"
            onClick={() => {
                navigator.clipboard?.writeText(c.hex).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 1100);
            }}
            aria-label={`Copy ${c.name} ${c.hex}`}
            className="group text-left"
        >
            <span className="flex h-[84px] items-end rounded-2xl border border-[#DFDBEE] p-2.5 transition-transform group-hover:-translate-y-0.5" style={{ background: c.hex }}>
                <span className={`sw-mono text-[10px] ${dark ? 'text-white/80' : 'text-black/60'}`}>{copied ? 'copied ✓' : 'copy'}</span>
            </span>
            <span className="mt-2 block text-[13px] font-semibold">{c.name}</span>
            <span className="sw-mono block text-[10.5px] text-[#6C6988]">
                {c.hex} · {c.role}
            </span>
        </button>
    );
}

// The six product principles. Each one rules a pattern out of the design.
const PRINCIPLES = [
    ['Pick a win you control', 'Every goal is rewritten as an action the user can finish alone.', 'Offers, followers or revenue as the daily measure'],
    ['Drop the deadline', 'Goals have no due date. The only horizons are today and this week.', 'Overdue items, countdowns, red states'],
    ['Count what has already moved', 'A wins log of every finished action, with totals since the start.', 'Opening on a list of what is left'],
    ['A missed day is data', 'Total days shown up. The number only goes up.', 'Streaks that fall back to zero'],
    ['One or two things, not ten', 'Active goals are capped at two; the rest are parked.', 'Urgency spread across many goals'],
    ['No comparison', 'Private by default. Sharing is opt-in, with one trusted person.', 'Feeds, leaderboards, public profiles'],
];

const NEVER = [
    ['3 overdue', 'An overdue badge'],
    ['🔥 0 day streak', 'A streak that resets'],
    ['47 days left', 'A countdown'],
    ['You are behind 82% of users', 'A comparison'],
];

function SmallWinsDesign({ compact, state, dispatch }) {
    const t = totals(state);
    const win = todayWin(state);
    const cols = compact ? 'grid-cols-1' : 'grid-cols-2';

    return (
        <div className={`min-h-full bg-[#F2F0F8] text-[#1D1A39] ${compact ? 'px-5 py-10' : 'px-12 py-14'}`}>
            <header className="pb-10">
                <Label>SMALL WINS — DESIGN SYSTEM · CONCEPT</Label>
                <h1 className={`sw-display font-medium leading-[1.02] tracking-[-0.025em] ${compact ? 'text-[42px]' : 'text-[68px]'}`}>
                    Measure how far
                    <br />
                    you have <Mark>come.</Mark>
                </h1>
                <p className="mt-6 max-w-[56ch] text-[15px] leading-relaxed text-[#45425F]">
                    Small Wins is a planner-diary for the feeling of &ldquo;I need a win before time runs out&rdquo;. This is an original design
                    direction, not a shipped product: a quiet lilac page in place of an urgent dashboard, a diary serif, handwriting for the
                    user&rsquo;s own notes, and one stroke of highlighter that only ever appears on something finished.
                </p>
            </header>

            <Block label="01 — PRINCIPLES" title="Six rules, and what each one rules out.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-3'}`}>
                    {PRINCIPLES.map(([h, does, never], i) => (
                        <Card key={h} className="p-5">
                            <span className="sw-mono text-[11px] text-[#4A3FCF]">0{i + 1}</span>
                            <p className="sw-display mt-2 text-[19px] font-medium leading-snug">{h}</p>
                            <p className="mt-2 text-[13px] leading-relaxed text-[#45425F]">{does}</p>
                            <p className="mt-3 border-t border-[#DFDBEE] pt-3 text-[12px] leading-relaxed text-[#6C6988]">
                                <span className="sw-mono mr-1.5 text-[10px] tracking-[.12em]">NEVER</span>
                                {never}
                            </p>
                        </Card>
                    ))}
                </div>
            </Block>

            <Block label="02 — TYPE" title="Typography.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-1' : 'grid-cols-4'}`}>
                    <Card>
                        <p className="sw-display text-[40px] font-medium leading-none tracking-[-0.02em]">One win.</p>
                        <Spec>Newsreader · 500<br />titles, goals, the win itself</Spec>
                    </Card>
                    <Card>
                        <p className="text-[22px] font-semibold leading-tight">Pick this week</p>
                        <p className="mt-1 text-[14px] text-[#6C6988]">Up to three per goal</p>
                        <Spec>Figtree · 400–700<br />everything you read and tap</Spec>
                    </Card>
                    <Card>
                        <p className="sw-hand text-[30px] leading-none text-[#4A3FCF]">It was one missing await.</p>
                        <Spec>Caveat · 500<br />only the user&rsquo;s own words</Spec>
                    </Card>
                    <Card>
                        <p className="sw-mono text-[30px] font-semibold leading-none">{t.wins} · 2/3</p>
                        <Spec>IBM Plex Mono · 400/600<br />totals, caps, dates</Spec>
                    </Card>
                </div>
            </Block>

            <Block label="03 — COLOUR" title="Colour.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {palette.map((c) => (
                        <Swatch key={c.name} c={c} />
                    ))}
                </div>
                <p className="mt-5 max-w-[70ch] text-[13px] leading-relaxed text-[#45425F]">
                    There is no red, amber or warning colour in the palette, on purpose: the app has no late, overdue or failed state to draw.
                    <Mark> Marker yellow</Mark> is spent only on finished wins, so the brightest thing on any screen is always something already done.
                </p>
            </Block>

            <Block label="04 — COMPONENTS" title="Components.">
                <div className={`grid gap-4 ${cols}`}>
                    <Card>
                        {win ? (
                            <div className="flex items-center gap-4">
                                <TickButton
                                    done={win.done}
                                    size={56}
                                    label={`${win.done ? 'Undo' : 'Tick'}: ${win.text}`}
                                    onClick={() => dispatch(win.done ? { type: 'untick', id: win.id } : { type: 'tick', id: win.id })}
                                />
                                <div>
                                    <GoalChip>today</GoalChip>
                                    <p className="sw-display mt-1.5 text-[21px] font-medium leading-snug">{win.done ? <Mark animate>{win.text}</Mark> : win.text}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-[14px] text-[#6C6988]">No win picked for this week in the demo.</p>
                        )}
                        <Spec>daily card (try the tick — it is the same state as the demo) · 56px target · marker sweeps in on done</Spec>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-6">
                            <DayDots days={t.days} size={18} />
                            <p className="text-[13px] leading-relaxed text-[#45425F]">
                                <span className="sw-mono block text-[30px] font-semibold leading-none text-[#1D1A39]">{t.daysShownUp}</span>
                                days shown up
                            </p>
                        </div>
                        <Spec>days shown up · filled = showed up, empty = just a day · ring = today · never resets</Spec>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-3">
                            <span className="sw-mono rounded-lg bg-[#F2F0F8] px-2.5 py-1.5 text-[15px] font-semibold">3/3</span>
                            <p className="flex-1 rounded-xl bg-[#F2F0F8] px-3 py-2.5 text-[12.5px] leading-snug text-[#6C6988]">Three is the cap. Swap one out to add another.</p>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                            <span className="sw-mono rounded-lg bg-[#F2F0F8] px-2.5 py-1.5 text-[15px] font-semibold">2/2</span>
                            <span className="flex h-9 items-center rounded-xl border border-[#DFDBEE] px-3 text-[12.5px] font-semibold text-[#9D9AB5]">Make active</span>
                            <span className="text-[12.5px] text-[#6C6988]">Park one to bring another back.</span>
                        </div>
                        <Spec>caps · a limit is stated calmly with the way out, never as an error</Spec>
                    </Card>
                    <Card>
                        <div className="rounded-2xl bg-[#1D1A39] px-4 py-3 text-white">
                            <p className="sw-mono text-[10.5px] text-white/60">SMALL WINS · {state.reminder}</p>
                            <p className="mt-0.5 text-[14px]">{reminderCopy}</p>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                            <span className="flex h-[46px] flex-1 items-center justify-center rounded-2xl bg-[#4A3FCF] px-4 text-[14.5px] font-semibold text-white">Finish review</span>
                            <span className="flex h-[46px] flex-1 items-center justify-center rounded-2xl border border-[#DFDBEE] px-4 text-[14.5px] font-semibold">Park</span>
                        </div>
                        <Spec>one reminder a day · copy never mentions missed days · buttons 52px in app, radius 16</Spec>
                    </Card>
                </div>
            </Block>

            <Block label="05 — LEFT OUT" title="Patterns this product will not ship.">
                <div className={`grid gap-4 ${compact ? 'grid-cols-2' : 'grid-cols-4'}`}>
                    {NEVER.map(([sample, name]) => (
                        <div key={name} className="rounded-[22px] border border-dashed border-[#DFDBEE] p-5">
                            <p className="text-[14px] font-semibold text-[#9D9AB5] line-through decoration-[#1D1A39] decoration-2">{sample}</p>
                            <p className="sw-mono mt-3 text-[10.5px] text-[#6C6988]">{name}</p>
                        </div>
                    ))}
                </div>
                <p className="mt-5 max-w-[70ch] text-[13px] leading-relaxed text-[#45425F]">
                    Most planners measure how far behind you are. Each of these is a common way of doing that, and each breaks one of the six
                    principles, so it is recorded here as a decision rather than left as an omission.
                </p>
            </Block>

            <Block label="06 — SHAPE" title="Shape & space." className="pb-2">
                <div className="flex flex-wrap items-end gap-6">
                    {[
                        ['12', 'inputs, chips'],
                        ['16', 'buttons'],
                        ['22', 'cards'],
                        ['999', 'ticks, day dots'],
                    ].map(([r, use]) => (
                        <div key={r} className="text-center">
                            <span className="block h-16 w-16 border-2 border-[#4A3FCF]/40 bg-[#FDFCFF]" style={{ borderRadius: Math.min(Number(r), 32) }} />
                            <span className="sw-mono mt-2 block text-[10.5px] text-[#6C6988]">{r}px</span>
                            <span className="block text-[11px]">{use}</span>
                        </div>
                    ))}
                    <div className="text-center">
                        <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-[#4A3FCF] text-[11px] font-semibold text-[#4A3FCF]">64</span>
                        <span className="sw-mono mt-2 block text-[10.5px] text-[#6C6988]">64px</span>
                        <span className="block text-[11px]">the daily tick</span>
                    </div>
                </div>
            </Block>
        </div>
    );
}

export default SmallWinsDesign;

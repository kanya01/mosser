import React, { useEffect, useRef, useState } from 'react';
import { BatteryFull, Bell, BookOpen, CalendarDays, Check, ChevronLeft, Flag, Lock, PenLine, Plus, Signal, Sun, Wifi, X } from 'lucide-react';
import {
    MAX_ACTIVE_GOALS,
    MAX_WINS_PER_GOAL,
    S,
    activeGoals,
    dateLabel,
    goalById,
    longToday,
    looksLikeOutcome,
    openWins,
    parkedGoals,
    reminderCopy,
    reminderTimes,
    sinceMonday,
    suggestActions,
    thisWeekLog,
    todayWin,
    totals,
    weekFor,
} from '../../data/smallwins.js';

// Working concept build of the Small Wins planner, laid out at iPhone size
// (390 × 844). State lives in SmallWinsShowcase, so a tick on the daily card
// shows up in the wins log and the weekly review. The Showcase shell draws the
// device and scales it.

/* ───────────────────────── shared pieces ───────────────────────── */

// The highlighter stroke. Marker yellow is reserved for finished wins.
export function Mark({ children, animate }) {
    return <span className={`sw-mark ${animate ? 'sw-mark-in' : ''}`}>{children}</span>;
}

export function GoalChip({ children }) {
    return <span className="inline-block rounded-full bg-[#E7E4FB] px-2.5 py-0.5 text-[11px] font-semibold text-[#4A3FCF]">{children}</span>;
}

export function TickButton({ done, onClick, size = 64, label, guide }) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={done}
            aria-label={label}
            data-guide={guide ? '' : undefined}
            className="flex shrink-0 items-center justify-center rounded-full border-2 transition-colors"
            style={{ width: size, height: size, borderColor: done ? S.marker : S.iris, background: done ? S.marker : 'transparent', color: done ? S.ink : S.iris }}
        >
            <Check size={size * 0.46} strokeWidth={done ? 3 : 2} className={done ? 'sw-pop' : 'opacity-40'} />
        </button>
    );
}

// Four weeks of days, Monday to Sunday. A day you showed up is filled; a day
// you did not is simply empty. Nothing is red and nothing resets.
export function DayDots({ days, size = 22 }) {
    const cells = [];
    for (let ago = 21 + sinceMonday; ago >= sinceMonday - 6; ago--) cells.push(ago);
    return (
        <div>
            <div className="grid grid-cols-7 gap-1.5" style={{ width: size * 7 + 6 * 6 }}>
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <span key={i} className="sw-mono text-center text-[10px] text-[#6C6988]">{d}</span>
                ))}
                {cells.map((ago) => {
                    const on = days.has(ago);
                    const future = ago < 0;
                    return (
                        <span
                            key={ago}
                            title={future ? undefined : dateLabel(ago)}
                            className="rounded-full"
                            style={{
                                width: size,
                                height: size,
                                background: on ? S.leaf : 'transparent',
                                border: on ? 'none' : `1.5px ${future ? 'dotted' : 'solid'} ${S.line}`,
                                boxShadow: ago === 0 ? `0 0 0 2px ${S.haze}, 0 0 0 3.5px ${S.iris}` : 'none',
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function StatusBar() {
    return (
        <div className="sticky top-0 z-20 flex h-[54px] shrink-0 items-end justify-between bg-[#F2F0F8] px-8 pb-1.5 text-[15px] font-semibold">
            <span>9:41</span>
            <span className="flex items-center gap-1.5">
                <Signal size={15} />
                <Wifi size={15} />
                <BatteryFull size={20} />
            </span>
        </div>
    );
}

function HomeIndicator() {
    return (
        <div className="flex justify-center pb-2 pt-2">
            <span className="h-[5px] w-[134px] rounded-full bg-[#1D1A39]" />
        </div>
    );
}

const TABS = [
    ['today', 'Today', Sun],
    ['week', 'Week', CalendarDays],
    ['log', 'Wins', BookOpen],
    ['review', 'Review', PenLine],
    ['goals', 'Goals', Flag],
];

function TabBar({ active, go }) {
    return (
        <nav className="sticky bottom-0 z-20 border-t border-[#DFDBEE] bg-[#FDFCFF]/95 backdrop-blur">
            <div className="grid grid-cols-5 pt-2">
                {TABS.map(([id, label, Icon]) => {
                    const on = id === active;
                    return (
                        <button
                            key={id}
                            type="button"
                            onClick={() => go({ name: id })}
                            aria-current={on ? 'page' : undefined}
                            className="flex flex-col items-center gap-1 text-[11px] font-medium"
                            style={{ color: on ? S.iris : S.muted }}
                        >
                            {React.createElement(Icon, { size: 22, strokeWidth: on ? 2.4 : 1.8 })}
                            {label}
                        </button>
                    );
                })}
            </div>
            <HomeIndicator />
        </nav>
    );
}

function Screen({ children, footer, tab, go }) {
    return (
        <div className="flex min-h-full flex-col bg-[#F2F0F8] text-[#1D1A39]">
            <StatusBar />
            <main className="flex-1 px-5 pb-6">{children}</main>
            {footer && (
                <div className="sticky bottom-0 z-20 border-t border-[#DFDBEE] bg-[#FDFCFF]/95 px-5 pt-3 backdrop-blur">
                    {footer}
                    <HomeIndicator />
                </div>
            )}
            {!footer && <TabBar active={tab} go={go} />}
        </div>
    );
}

function Title({ kicker, children, sub }) {
    return (
        <header className="pb-4 pt-3">
            {kicker && <p className="sw-mono text-[11px] uppercase tracking-[.16em] text-[#6C6988]">{kicker}</p>}
            <h1 className="sw-display mt-1 text-[32px] font-medium leading-[1.08] tracking-[-0.015em]">{children}</h1>
            {sub && <p className="mt-2 text-[14px] leading-snug text-[#6C6988]">{sub}</p>}
        </header>
    );
}

function Card({ children, className = '', ...rest }) {
    return (
        <div className={`rounded-[22px] border border-[#DFDBEE] bg-[#FDFCFF] p-4 ${className}`} {...rest}>
            {children}
        </div>
    );
}

function Primary({ children, className = '', ...rest }) {
    return (
        <button
            type="button"
            className={`flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl bg-[#4A3FCF] text-[16px] font-semibold text-white transition-opacity disabled:opacity-40 ${className}`}
            {...rest}
        >
            {children}
        </button>
    );
}

const inputClass =
    'w-full rounded-xl border border-[#DFDBEE] bg-[#FDFCFF] px-3.5 py-3 text-[15px] text-[#1D1A39] placeholder:text-[#9D9AB5] focus:border-[#4A3FCF] focus:outline-none';

function AddRow({ placeholder, onAdd, label = 'Add' }) {
    const [text, setText] = useState('');
    const submit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        onAdd(text);
        setText('');
    };
    return (
        <form onSubmit={submit} className="flex gap-2">
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder={placeholder} aria-label={placeholder} className={inputClass} />
            <button type="submit" disabled={!text.trim()} aria-label={label} className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-xl bg-[#1D1A39] text-white disabled:opacity-30">
                <Plus size={20} />
            </button>
        </form>
    );
}

/* ───────────────────────── 1 · reframe a goal ───────────────────────── */

const DEADLINE = /\s+\b(before|by)\b\s+.+$/i;

function Reframe({ route, go, state, dispatch, animate }) {
    const goal = route.fresh ? null : goalById(state, route.id) || activeGoals(state)[0] || null;
    const [raw, setRaw] = useState(goal?.raw || '');
    // The answer is revealed after a beat on the guided tour, so the question is read first.
    const [answer, setAnswer] = useState(goal && !animate ? goal.dependsOnYes : null);
    const [actions, setActions] = useState(() => (goal ? goal.actions.map((text) => ({ text, on: true })) : []));
    const touched = useRef(false);

    useEffect(() => {
        if (!goal || !animate) return undefined;
        const id = setTimeout(() => !touched.current && setAnswer(goal.dependsOnYes), 1600);
        return () => clearTimeout(id);
    }, [goal, animate]);

    const named = raw.trim().length > 3;
    const deadline = raw.match(DEADLINE)?.[0].trim();
    const chosen = actions.filter((a) => a.on && a.text.trim());

    const pick = (yes) => {
        touched.current = true;
        setAnswer(yes);
        // Offer suggestions the first time; keep whatever the user has already shaped.
        if (!actions.length) setActions(suggestActions(raw).map((text, i) => ({ text, on: i < 2 })));
    };

    const save = () => {
        dispatch({ type: 'saveGoal', id: goal?.id, raw: raw.trim(), dependsOnYes: !!answer, actions: chosen.map((a) => a.text.trim()) });
        go({ name: goal ? 'week' : 'goals' });
    };

    return (
        <Screen
            go={go}
            footer={
                <Primary onClick={save} disabled={!named || answer === null || !chosen.length} data-guide={answer !== null && chosen.length ? '' : undefined}>
                    {chosen.length ? `Save goal · ${chosen.length} ${chosen.length === 1 ? 'action' : 'actions'} I control` : 'Pick at least one action'}
                </Primary>
            }
        >
            <div onPointerDown={() => (touched.current = true)}>
                <button type="button" onClick={() => go({ name: 'goals' })} className="mt-1 flex items-center gap-1 text-[13px] font-medium text-[#6C6988]">
                    <ChevronLeft size={16} /> Goals
                </button>
                <Title kicker={goal ? 'Reframe' : 'New goal'} sub="Say it the way you would say it to a friend.">
                    What is the goal?
                </Title>

                <textarea
                    value={raw}
                    onChange={(e) => {
                        setRaw(e.target.value);
                        if (!goal) setActions([]);
                    }}
                    rows={2}
                    placeholder="e.g. Get a product job"
                    aria-label="Your goal, in your own words"
                    className={`${inputClass} sw-display resize-none text-[20px] leading-snug`}
                />
                {deadline && (
                    <p className="mt-2 text-[13px] leading-snug text-[#6C6988]">
                        <span className="line-through decoration-[#6C6988]/60">&ldquo;{deadline}&rdquo;</span> — set aside. Goals carry no date here; the only
                        horizons are today and this week.
                    </p>
                )}

                {named && (
                    <Card className="mt-4">
                        <p className="sw-display text-[19px] font-medium leading-snug">Does this depend on someone else saying yes?</p>
                        <div className="mt-3 grid grid-cols-2 gap-2">
                            {[
                                [true, 'Yes, it does'],
                                [false, 'No, it’s mine'],
                            ].map(([value, label]) => (
                                <button
                                    key={label}
                                    type="button"
                                    aria-pressed={answer === value}
                                    data-guide={answer === null && value === looksLikeOutcome(raw) ? '' : undefined}
                                    onClick={() => pick(value)}
                                    className={`h-11 rounded-xl border text-[14px] font-semibold ${answer === value ? 'border-[#1D1A39] bg-[#1D1A39] text-white' : 'border-[#DFDBEE] bg-[#F2F0F8]'}`}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                        {answer !== null && (
                            <p className="mt-3 text-[13.5px] leading-relaxed text-[#6C6988]">
                                {answer
                                    ? 'Then it is an outcome. Keep it as the direction. The daily measure is what you can finish alone.'
                                    : 'Good, it is already yours. Break it into pieces small enough to finish this week.'}
                            </p>
                        )}
                    </Card>
                )}

                {named && answer !== null && (
                    <div className="mt-5">
                        <p className="text-[13px] font-semibold">Actions that need nobody else&rsquo;s yes</p>
                        <p className="text-[12.5px] text-[#6C6988]">Suggestions only. Tick, edit or ignore each one.</p>
                        <ul className="mt-3 space-y-2">
                            {actions.map((a, i) => (
                                <li key={i} className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 ${a.on ? 'border-[#4A3FCF] bg-[#FDFCFF]' : 'border-[#DFDBEE] bg-transparent'}`}>
                                    <button
                                        type="button"
                                        aria-pressed={a.on}
                                        aria-label={`${a.on ? 'Remove' : 'Keep'}: ${a.text}`}
                                        onClick={() => setActions(actions.map((x, j) => (j === i ? { ...x, on: !x.on } : x)))}
                                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${a.on ? 'border-[#4A3FCF] bg-[#4A3FCF] text-white' : 'border-[#DFDBEE] text-transparent'}`}
                                    >
                                        <Check size={16} strokeWidth={3} />
                                    </button>
                                    <input
                                        value={a.text}
                                        onChange={(e) => setActions(actions.map((x, j) => (j === i ? { ...x, text: e.target.value, on: true } : x)))}
                                        aria-label={`Action ${i + 1}`}
                                        className={`min-w-0 flex-1 bg-transparent py-1.5 text-[14.5px] focus:outline-none ${a.on ? '' : 'text-[#6C6988]'}`}
                                    />
                                </li>
                            ))}
                        </ul>
                        <div className="mt-2">
                            <AddRow placeholder="Add your own action" onAdd={(text) => setActions([...actions, { text: text.trim(), on: true }])} />
                        </div>
                    </div>
                )}
            </div>
        </Screen>
    );
}

/* ───────────────────────── 2 · weekly wins ───────────────────────── */

function WeekGoal({ goal, state, dispatch, go, guide }) {
    const wins = weekFor(state, goal.id);
    const full = wins.length >= MAX_WINS_PER_GOAL;
    const unused = goal.actions.filter((a) => !wins.some((w) => w.text === a));
    return (
        <Card>
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <GoalChip>{goal.title}</GoalChip>
                    <p className="sw-display mt-1.5 text-[15px] italic leading-snug text-[#6C6988]">direction: {goal.raw.replace(DEADLINE, '')}</p>
                </div>
                <span className="sw-mono shrink-0 rounded-lg bg-[#F2F0F8] px-2 py-1 text-[13px] font-semibold" aria-label={`${wins.length} of ${MAX_WINS_PER_GOAL} wins picked`}>
                    {wins.length}/{MAX_WINS_PER_GOAL}
                </span>
            </div>

            <ul className="mt-3 divide-y divide-[#DFDBEE]">
                {wins.map((w) => (
                    <li key={w.id} className="flex items-center gap-3 py-2.5">
                        <TickButton
                            size={30}
                            done={w.done}
                            label={`${w.done ? 'Undo' : 'Tick'}: ${w.text}`}
                            onClick={() => dispatch(w.done ? { type: 'untick', id: w.id } : { type: 'tick', id: w.id })}
                        />
                        <span className="min-w-0 flex-1 text-[14.5px] leading-snug">
                            {w.done ? <Mark>{w.text}</Mark> : w.text}
                            {w.date && <span className="sw-mono ml-2 whitespace-nowrap rounded bg-[#F2F0F8] px-1.5 py-0.5 text-[10.5px] text-[#6C6988]">{w.date}</span>}
                        </span>
                        {!w.done && (
                            <button type="button" onClick={() => dispatch({ type: 'removeWin', id: w.id })} aria-label={`Remove: ${w.text}`} className="flex h-8 w-8 items-center justify-center rounded-full text-[#6C6988]">
                                <X size={16} />
                            </button>
                        )}
                    </li>
                ))}
                {!wins.length && <li className="py-3 text-[13.5px] text-[#6C6988]">No wins picked yet. One is plenty.</li>}
            </ul>

            {full ? (
                <p className="mt-2 rounded-xl bg-[#F2F0F8] px-3 py-2.5 text-[12.5px] leading-snug text-[#6C6988]">
                    Three is the cap. Swap one out to add another, so the week stays small enough to finish.
                </p>
            ) : (
                <div className="mt-2 space-y-2">
                    {unused.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {unused.slice(0, 3).map((a, i) => (
                                <button
                                    key={a}
                                    type="button"
                                    data-guide={guide && i === 0 ? '' : undefined}
                                    onClick={() => dispatch({ type: 'addWin', goalId: goal.id, text: a })}
                                    className="flex items-center gap-1 rounded-full border border-[#DFDBEE] bg-[#F2F0F8] px-3 py-1.5 text-left text-[12.5px] font-medium"
                                >
                                    <Plus size={13} className="shrink-0" /> {a}
                                </button>
                            ))}
                        </div>
                    )}
                    <AddRow placeholder="Or write your own win" onAdd={(text) => dispatch({ type: 'addWin', goalId: goal.id, text })} />
                </div>
            )}
            <button type="button" onClick={() => go({ name: 'reframe', id: goal.id })} className="mt-3 text-[12.5px] font-semibold text-[#4A3FCF]">
                Reframe this goal
            </button>
        </Card>
    );
}

function Week({ go, state, dispatch }) {
    const goals = activeGoals(state);
    return (
        <Screen tab="week" go={go}>
            <Title kicker="This week" sub="Up to three wins per goal. Each one is something you can finish alone.">
                Pick this week&rsquo;s wins.
            </Title>
            <div className="space-y-3">
                {goals.map((g, i) => (
                    <WeekGoal key={g.id} goal={g} state={state} dispatch={dispatch} go={go} guide={i === 0} />
                ))}
                {!goals.length && (
                    <Card>
                        <p className="text-[14px] text-[#6C6988]">No active goal yet.</p>
                        <button type="button" onClick={() => go({ name: 'reframe', fresh: true })} className="mt-2 text-[14px] font-semibold text-[#4A3FCF]">
                            Name one goal
                        </button>
                    </Card>
                )}

                <Card>
                    <p className="flex items-center gap-2 text-[14px] font-semibold">
                        <Bell size={16} /> One gentle reminder a day
                    </p>
                    <div className="mt-3 flex gap-2">
                        {reminderTimes.map((t) => (
                            <button
                                key={t}
                                type="button"
                                aria-pressed={state.reminder === t}
                                onClick={() => dispatch({ type: 'setReminder', time: t })}
                                className={`sw-mono h-10 flex-1 rounded-xl border text-[13px] font-semibold ${state.reminder === t ? 'border-[#4A3FCF] bg-[#4A3FCF] text-white' : 'border-[#DFDBEE]'}`}
                            >
                                {t}
                            </button>
                        ))}
                    </div>
                    <div className="mt-3 rounded-2xl bg-[#1D1A39] px-3.5 py-3 text-white">
                        <p className="sw-mono text-[10.5px] text-white/60">SMALL WINS · {state.reminder}</p>
                        <p className="mt-0.5 text-[13.5px]">{reminderCopy}</p>
                    </div>
                    <p className="mt-2 text-[12px] text-[#6C6988]">The reminder never mentions a missed day.</p>
                </Card>
            </div>
        </Screen>
    );
}

/* ───────────────────────── 3 · daily card ───────────────────────── */

function Today({ go, state, dispatch, animate }) {
    const win = todayWin(state);
    const goal = win && goalById(state, win.goalId);
    const [note, setNote] = useState('');
    const t = totals(state);
    const others = openWins(state).filter((w) => w.id !== win?.id);
    const entry = win?.done ? state.log.find((e) => e.winId === win.id) : null;

    return (
        <Screen tab="today" go={go}>
            <Title kicker={longToday()}>One win for today.</Title>

            {win ? (
                <Card className="p-5">
                    <div className="flex items-center justify-between">
                        <GoalChip>{goal?.title || 'Goal'}</GoalChip>
                        {win.date && <span className="sw-mono rounded bg-[#F2F0F8] px-1.5 py-0.5 text-[10.5px] text-[#6C6988]">{win.date}</span>}
                    </div>
                    <p className="sw-display mt-4 text-[27px] font-medium leading-[1.2] tracking-[-0.01em]">
                        {win.done ? <Mark animate={animate}>{win.text}</Mark> : win.text}
                    </p>

                    {win.done ? (
                        <>
                            {entry?.note && <p className="sw-hand mt-3 text-[22px] leading-tight text-[#4A3FCF]">{entry.note}</p>}
                            <div className="mt-5 flex items-center gap-4 border-t border-[#DFDBEE] pt-4">
                                <TickButton done size={56} label="Undo tick" onClick={() => dispatch({ type: 'untick', id: win.id })} />
                                <p className="text-[14px] leading-snug">
                                    <span className="font-semibold">Logged.</span>
                                    <br />
                                    <span className="text-[#6C6988]">
                                        That is win <span className="sw-mono font-semibold text-[#1D1A39]">{t.wins}</span> since you started.
                                    </span>
                                </p>
                            </div>
                            <Primary className="mt-4" onClick={() => go({ name: 'log' })} data-guide="">
                                See what has moved
                            </Primary>
                        </>
                    ) : (
                        <form
                            className="mt-5 border-t border-[#DFDBEE] pt-4"
                            onSubmit={(e) => {
                                e.preventDefault();
                                dispatch({ type: 'tick', id: win.id, note });
                                setNote('');
                            }}
                        >
                            <input
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                maxLength={90}
                                placeholder="One line on what moved (optional)"
                                aria-label="One line on what moved, optional"
                                className={`${inputClass} sw-hand text-[20px] placeholder:font-sans placeholder:text-[14px]`}
                            />
                            <div className="mt-4 flex items-center gap-4">
                                <button
                                    type="submit"
                                    data-guide=""
                                    aria-label={`Tick: ${win.text}`}
                                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-[#4A3FCF] text-[#4A3FCF]"
                                >
                                    <Check size={30} className="opacity-40" />
                                </button>
                                <p className="text-[14px] leading-snug text-[#6C6988]">
                                    Done it? Tick it.
                                    <br />
                                    It goes straight into your wins log.
                                </p>
                            </div>
                        </form>
                    )}
                </Card>
            ) : (
                <Card className="p-5">
                    <p className="sw-display text-[22px] font-medium leading-snug">Nothing picked for this week yet.</p>
                    <p className="mt-2 text-[14px] text-[#6C6988]">Choose one small thing you can finish alone.</p>
                    <Primary className="mt-4" onClick={() => go({ name: 'week' })}>
                        Pick this week&rsquo;s wins
                    </Primary>
                </Card>
            )}

            {others.length > 0 && (
                <div className="mt-5">
                    <p className="text-[13px] font-semibold">{win?.done ? 'Got more in you? One more is optional.' : 'Not this one today? Swap it.'}</p>
                    <ul className="mt-2 space-y-2">
                        {others.map((w) => (
                            <li key={w.id}>
                                <button
                                    type="button"
                                    onClick={() => dispatch({ type: 'setToday', id: w.id })}
                                    className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#DFDBEE] px-4 py-3 text-left text-[14px]"
                                >
                                    <span>{w.text}</span>
                                    <span className="shrink-0 text-[12.5px] font-semibold text-[#4A3FCF]">make it today&rsquo;s</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#E7E4FB] px-4 py-3">
                <span className="text-[13px]">
                    <span className="sw-mono text-[17px] font-semibold">{t.daysShownUp}</span> days shown up
                </span>
                <span className="text-[12px] text-[#6C6988]">a total, not a streak</span>
            </div>
        </Screen>
    );
}

/* ───────────────────────── 4 · wins log ───────────────────────── */

function Log({ go, state, dispatch }) {
    const t = totals(state);
    const groups = [];
    state.log
        .slice()
        .sort((a, b) => a.ago - b.ago)
        .forEach((e) => {
            const last = groups[groups.length - 1];
            if (last && last.ago === e.ago) last.items.push(e);
            else groups.push({ ago: e.ago, items: [e] });
        });

    return (
        <Screen tab="log" go={go}>
            <Title kicker="Wins log" sub="Everything you have finished since you started. It only ever grows.">
                What has already moved.
            </Title>

            <div className="grid grid-cols-3 gap-2 text-center">
                {[
                    [t.wins, 'wins'],
                    [t.daysShownUp, 'days shown up'],
                    [t.weeks, 'weeks'],
                ].map(([v, k]) => (
                    <div key={k} className="rounded-2xl border border-[#DFDBEE] bg-[#FDFCFF] py-3">
                        <p className="sw-mono text-[24px] font-semibold leading-none">{v}</p>
                        <p className="mt-1.5 text-[11.5px] text-[#6C6988]">{k}</p>
                    </div>
                ))}
            </div>

            <Card className="mt-3 flex items-center gap-4">
                <DayDots days={t.days} size={20} />
                <p className="text-[12.5px] leading-snug text-[#6C6988]">
                    <span className="mb-1 block font-semibold text-[#1D1A39]">Last four weeks</span>
                    A filled day is a day you showed up. An empty day is just a day. The total never resets.
                </p>
            </Card>

            <ol className="mt-5">
                {groups.map((g) => (
                    <li key={g.ago} className="relative border-l-2 border-[#DFDBEE] pb-5 pl-5 last:pb-1">
                        <span className="absolute -left-[7px] top-1 h-3 w-3 rounded-full border-2 border-[#F2F0F8]" style={{ background: g.ago === 0 ? S.iris : S.leaf }} />
                        <p className="sw-mono text-[11.5px] text-[#6C6988]">{dateLabel(g.ago)}</p>
                        {g.items.map((e) => (
                            <div key={e.id} className="mt-1.5">
                                <p className="text-[15.5px] font-medium leading-snug">
                                    <Mark>{e.text}</Mark>
                                </p>
                                {e.note && <p className="sw-hand mt-0.5 text-[19px] leading-tight text-[#4A3FCF]">{e.note}</p>}
                            </div>
                        ))}
                    </li>
                ))}
            </ol>

            <h2 className="sw-display mt-4 text-[20px] font-medium">Before Small Wins</h2>
            <p className="text-[12.5px] text-[#6C6988]">Things that had already moved. The log is never empty on day one.</p>
            <ul className="mt-3 space-y-2">
                {state.backfill.map((b) => (
                    <li key={b.id} className="flex items-baseline justify-between gap-3 rounded-2xl border border-dashed border-[#DFDBEE] px-4 py-3 text-[14px]">
                        <span>{b.text}</span>
                        <span className="sw-mono shrink-0 text-[11px] text-[#6C6988]">{b.when}</span>
                    </li>
                ))}
            </ul>
            <div className="mt-2">
                <AddRow placeholder="Add something that already moved" onAdd={(text) => dispatch({ type: 'addBackfill', text })} />
            </div>
        </Screen>
    );
}

/* ───────────────────────── 5 · weekly review ───────────────────────── */

const OUTSIDE_CHIPS = ['No replies yet', 'A closing date moved', 'Waiting on someone else', 'A rough few days'];

function Prompt({ n, title, children }) {
    return (
        <Card>
            <p className="flex items-baseline gap-2">
                <span className="sw-mono text-[12px] font-semibold text-[#4A3FCF]">0{n}</span>
                <span className="sw-display text-[19px] font-medium">{title}</span>
            </p>
            <div className="mt-3">{children}</div>
        </Card>
    );
}

function Review({ go, state, dispatch }) {
    const moved = thisWeekLog(state);
    const { outside, next, done } = state.review;
    const patch = (p) => dispatch({ type: 'review', patch: p });
    // Suggest actions that have not already been ticked this week.
    const nextIdeas = [...new Set(activeGoals(state).flatMap((g) => g.actions))].filter((a) => !moved.some((e) => e.text === a)).slice(0, 3);
    const append = (text) => patch({ outside: outside ? `${outside.replace(/[.\s]+$/, '')}. ${text}.` : `${text}.` });

    if (done) {
        return (
            <Screen tab="review" go={go}>
                <Title kicker="Weekly review">Review done.</Title>
                <Card className="p-5">
                    <p className="sw-mono text-[11.5px] text-[#6C6988]">WHAT MOVED</p>
                    <ul className="mt-1.5 space-y-1 text-[15px] font-medium">
                        {moved.map((e) => (
                            <li key={e.id}>
                                <Mark>{e.text}</Mark>
                            </li>
                        ))}
                        {!moved.length && <li className="font-normal text-[#6C6988]">A quiet week. It still counts as a week you looked.</li>}
                    </ul>
                    {outside && (
                        <>
                            <p className="sw-mono mt-4 text-[11.5px] text-[#6C6988]">OUTSIDE MY CONTROL</p>
                            <p className="sw-hand mt-0.5 text-[20px] leading-tight">{outside}</p>
                        </>
                    )}
                    {next && (
                        <>
                            <p className="sw-mono mt-4 text-[11.5px] text-[#6C6988]">WHAT NEXT</p>
                            <p className="sw-hand mt-0.5 text-[20px] leading-tight text-[#4A3FCF]">{next}</p>
                        </>
                    )}
                </Card>

                <Card className="mt-3 flex items-center justify-between gap-4">
                    <span className="text-[13.5px] leading-snug">
                        <span className="flex items-center gap-1.5 font-semibold">
                            <Lock size={13} /> Share this recap
                        </span>
                        <span className="text-[#6C6988]">{state.shareRecap ? 'Goes to the one person you chose.' : 'Off. Only you can see it.'}</span>
                    </span>
                    <button
                        type="button"
                        role="switch"
                        aria-checked={state.shareRecap}
                        aria-label="Share this recap with one trusted person"
                        onClick={() => dispatch({ type: 'toggleShare' })}
                        className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${state.shareRecap ? 'bg-[#4A3FCF]' : 'bg-[#DFDBEE]'}`}
                    >
                        <span className={`h-6 w-6 rounded-full bg-white transition-transform ${state.shareRecap ? 'translate-x-5' : ''}`} />
                    </button>
                </Card>

                <Primary className="mt-4" onClick={() => go({ name: 'week' })} data-guide="">
                    Plan next week
                </Primary>
                <button type="button" onClick={() => patch({ done: false })} className="mt-3 w-full text-center text-[13px] font-semibold text-[#6C6988]">
                    Edit the review
                </button>
            </Screen>
        );
    }

    return (
        <Screen
            go={go}
            footer={
                <Primary onClick={() => patch({ done: true })} data-guide="">
                    Finish review
                </Primary>
            }
        >
            <button type="button" onClick={() => go({ name: 'today' })} className="mt-1 flex items-center gap-1 text-[13px] font-medium text-[#6C6988]">
                <ChevronLeft size={16} /> Today
            </button>
            <Title kicker="Weekly review" sub="Three prompts, about three minutes.">
                Look back, then plan.
            </Title>
            <div className="space-y-3">
                <Prompt n={1} title="What moved?">
                    {moved.length ? (
                        <ul className="space-y-1.5 text-[15px] font-medium">
                            {moved.map((e) => (
                                <li key={e.id}>
                                    <Mark>{e.text}</Mark>
                                    <span className="sw-mono ml-2 whitespace-nowrap text-[11px] font-normal text-[#6C6988]">{dateLabel(e.ago)}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-[14px] text-[#6C6988]">Nothing logged this week. That is information, not a verdict.</p>
                    )}
                    <p className="mt-2 text-[12px] text-[#6C6988]">Filled in from your wins log.</p>
                </Prompt>

                <Prompt n={2} title="What was outside my control?">
                    <textarea
                        value={outside}
                        onChange={(e) => patch({ outside: e.target.value })}
                        rows={2}
                        placeholder="Name it, then put it down."
                        aria-label="What was outside my control"
                        className={`${inputClass} resize-none`}
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {OUTSIDE_CHIPS.map((c) => (
                            <button key={c} type="button" onClick={() => append(c)} className="rounded-full border border-[#DFDBEE] bg-[#F2F0F8] px-3 py-1.5 text-[12.5px] font-medium">
                                {c}
                            </button>
                        ))}
                    </div>
                </Prompt>

                <Prompt n={3} title="What next?">
                    <textarea
                        value={next}
                        onChange={(e) => patch({ next: e.target.value })}
                        rows={2}
                        placeholder="One thing you can finish alone next week."
                        aria-label="What next"
                        className={`${inputClass} resize-none`}
                    />
                    <div className="mt-2 flex flex-wrap gap-1.5">
                        {nextIdeas.map((c) => (
                            <button key={c} type="button" onClick={() => patch({ next: c })} className="rounded-full border border-[#DFDBEE] bg-[#F2F0F8] px-3 py-1.5 text-left text-[12.5px] font-medium">
                                {c}
                            </button>
                        ))}
                    </div>
                </Prompt>
            </div>
        </Screen>
    );
}

/* ───────────────────────── 6 · goals and the two-goal cap ───────────────────────── */

function Goals({ go, state, dispatch }) {
    const active = activeGoals(state);
    const parked = parkedGoals(state);
    const full = active.length >= MAX_ACTIVE_GOALS;
    return (
        <Screen tab="goals" go={go}>
            <Title kicker="Goals" sub="Urgency spreads effort thin. Two active goals is the cap; the rest wait, safely parked.">
                One or two things, not ten.
            </Title>

            <p className="flex items-center justify-between text-[13px] font-semibold">
                Active
                <span className="sw-mono rounded-lg bg-[#FDFCFF] px-2 py-1" aria-label={`${active.length} of ${MAX_ACTIVE_GOALS} active goals`}>
                    {active.length}/{MAX_ACTIVE_GOALS}
                </span>
            </p>
            <ul className="mt-2 space-y-2">
                {active.map((g) => (
                    <li key={g.id}>
                        <Card>
                            <GoalChip>{g.title}</GoalChip>
                            <p className="sw-display mt-2 text-[19px] font-medium leading-snug">{g.raw.replace(DEADLINE, '')}</p>
                            <p className="mt-1 text-[12.5px] text-[#6C6988]">
                                {g.actions.length} {g.actions.length === 1 ? 'action' : 'actions'} you control · no due date
                            </p>
                            <div className="mt-3 flex gap-2">
                                <button type="button" onClick={() => go({ name: 'reframe', id: g.id })} className="h-10 flex-1 rounded-xl bg-[#1D1A39] text-[13.5px] font-semibold text-white">
                                    Reframe
                                </button>
                                <button type="button" onClick={() => dispatch({ type: 'park', id: g.id })} className="h-10 flex-1 rounded-xl border border-[#DFDBEE] text-[13.5px] font-semibold">
                                    Park
                                </button>
                            </div>
                        </Card>
                    </li>
                ))}
                {!active.length && <li className="rounded-2xl border border-dashed border-[#DFDBEE] px-4 py-4 text-[13.5px] text-[#6C6988]">No active goal. Bring one back, or name a new one.</li>}
            </ul>

            <p className="mt-6 text-[13px] font-semibold">Parked</p>
            <p className="text-[12.5px] text-[#6C6988]">Saved with everything intact. No daily prompts.</p>
            <ul className="mt-2 space-y-2">
                {parked.map((g, i) => (
                    <li key={g.id} className="flex items-center justify-between gap-3 rounded-2xl border border-dashed border-[#DFDBEE] px-4 py-3">
                        <span className="min-w-0 text-[14.5px]">{g.raw.replace(DEADLINE, '')}</span>
                        <button
                            type="button"
                            disabled={full}
                            data-guide={!full && i === 0 ? '' : undefined}
                            onClick={() => dispatch({ type: 'activate', id: g.id })}
                            className="h-9 shrink-0 rounded-xl border border-[#4A3FCF] px-3 text-[12.5px] font-semibold text-[#4A3FCF] disabled:border-[#DFDBEE] disabled:text-[#9D9AB5]"
                        >
                            Make active
                        </button>
                    </li>
                ))}
                {!parked.length && <li className="text-[13.5px] text-[#6C6988]">Nothing parked.</li>}
            </ul>
            {full && parked.length > 0 && <p className="mt-2 text-[12.5px] text-[#6C6988]">Two are active. Park one to bring another back.</p>}

            <button
                type="button"
                onClick={() => go({ name: 'reframe', fresh: true })}
                className="mt-5 flex h-[52px] w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-[#4A3FCF] text-[15px] font-semibold text-[#4A3FCF]"
            >
                <Plus size={18} /> Name a new goal
            </button>
            {full && <p className="mt-2 text-center text-[12.5px] text-[#6C6988]">It will be parked until there is room.</p>}

            <p className="mt-6 flex items-center justify-center gap-1.5 text-[12px] text-[#6C6988]">
                <Lock size={12} /> Private by default. No feed, no leaderboard.
            </p>
            <button type="button" onClick={() => dispatch({ type: 'reset' })} className="mt-2 w-full text-center text-[12px] font-semibold text-[#6C6988] underline underline-offset-2">
                Reset demo data
            </button>
        </Screen>
    );
}

/* ───────────────────────── router ───────────────────────── */

function SmallWinsReplica({ route, go, state, dispatch, animate }) {
    const p = { route, go, state, dispatch, animate };
    switch (route.name) {
        case 'reframe':
            return <Reframe key={route.fresh ? 'new' : route.id || 'first'} {...p} />;
        case 'week':
            return <Week {...p} />;
        case 'log':
            return <Log {...p} />;
        case 'review':
            return <Review {...p} />;
        case 'goals':
            return <Goals {...p} />;
        default:
            return <Today {...p} />;
    }
}

export default SmallWinsReplica;
